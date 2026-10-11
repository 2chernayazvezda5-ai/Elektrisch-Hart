package com.example.fychar.service;

import com.example.fychar.controller.CarregadorController;
import com.example.fychar.dto.CadastroEmpresaRequest;
import com.example.fychar.dto.EnderecoDTO;
import com.example.fychar.dto.InfraestruturaDTO;
import com.example.fychar.model.entity.Empresa;
import com.example.fychar.model.entity.Endereco;
import com.example.fychar.model.entity.PontoRecarga;
import com.example.fychar.repository.EmpresaRepository;
import com.example.fychar.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

@Service
public class EmpresaService {

    private final CarregadorController carregadorController;// talvez seja usado então ja vai ficar aqui
    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public EmpresaService(EmpresaRepository empresaRepository,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder, CarregadorController carregadorController) {
        this.empresaRepository = empresaRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.carregadorController = carregadorController;
    }

    public Empresa cadastrar(CadastroEmpresaRequest req) {
        // E-mail é checado no UsuarioRepository porque é único em TODOS os tipos de
        // usuário , então nem mesmo um email de motorista vai poder ser reutilizado
        // para um novo cadastro de empresa.
        if (usuarioRepository.findByEmail(req.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado.");
        }
        if (empresaRepository.existsByCnpj(req.cnpj())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CNPJ já cadastrado.");
        }

        Empresa empresa = new Empresa(
                req.nome(),
                req.email(),
                passwordEncoder.encode(req.senha()),
                req.telefone(),
                req.cnpj());
        empresa.setCategoria(req.categoria());
        empresa.setDescricao(req.descricao());

        EnderecoDTO e = req.endereco();
        empresa.setEndereco(new Endereco(e.cep(), e.rua(), e.numero(),
                e.complemento(), e.bairro(), e.cidade(), e.estado()));

        InfraestruturaDTO i = req.infraestrutura();
        empresa.setHorarioFuncionamento(i.horarioFuncionamento());
        empresa.setWifi(i.wifi());
        empresa.setCafeteria(i.cafeteria());
        empresa.setBanheiro(i.banheiro());
        empresa.setAreaEspera(i.areaEspera());
        empresa.setInformacoesAdicionais(i.informacoesAdicionais());

        PontoRecarga ponto = new PontoRecarga();
        ponto.setQuantidade(i.quantidadeCarregadores());
        ponto.setPotencia(i.potencia());
        ponto.setTipoConector(i.tipoConector());
        ponto.setVelocidade(i.velocidade());
        ponto.setGratuito(i.gratuito());
        ponto.setPrecoPorKwh(i.gratuito() ? null : converterPreco(i.precoPorKwh()));
        ponto.setTaxaOciosidade(i.taxaOciosidade());
        empresa.adicionarPontoRecarga(ponto);

        // Um save() insere em usuario, empresa e ponto_recarga na mesma ação.
        // Seria ,uito util saber da existencia disso no semestre passado.
        return empresaRepository.save(empresa);
    }

    /**
     * O formulário usa vírgula decimal ("1,99"), o BigDecimal espera ponto então
     * tive que colocar uma forma de converter a virgula para ponto.
     * tambem ja deixei algumas respostas para possiveis erros que pensei.
     */
    private BigDecimal converterPreco(String texto) {
        if (texto == null || texto.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Informe o preço por kWh ou marque como gratuito.");
        }
        try {
            return new BigDecimal(texto.trim().replace(",", "."));
        } catch (NumberFormatException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Preço por kWh inválido. Use o formato 1,99.");
        }
    }
}