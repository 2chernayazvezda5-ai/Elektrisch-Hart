package com.example.fychar.service;

import com.example.fychar.dto.CadastroMotoristaRequest;
import com.example.fychar.dto.DadosVeiculoDTO;
import com.example.fychar.model.entity.Motorista;
import com.example.fychar.model.entity.Veiculo;
import com.example.fychar.repository.MotoristaRepository;
import com.example.fychar.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/*  service é a parte meis legal para fazer.
    nela vai ficar toda a regra de negocio e a tentativa de hash de senha
 */

@Service
public class MotoristaService {

    private final MotoristaRepository motoristaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    private static final DateTimeFormatter FORMATO_DATA = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public MotoristaService(MotoristaRepository motoristaRepository,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.motoristaRepository = motoristaRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Motorista cadastrar(CadastroMotoristaRequest request) {
        // Verificações de duplicidade ANTES de tentar salvar: dá uma
        // mensagem de erro clara, em vez de deixar o banco estourar uma
        // exceção genérica de "constraint violation" lá na frente.
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado.");
        }
        if (motoristaRepository.findByCpf(request.getCpf()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado.");
        }

        LocalDate dataNascimento = converterData(request.getDataNascimento());

        // passwordEncoder.encode() transforma a senha em texto puro num
        // hash BCrypt (algo como "$2a$10$N9qo8uLOickgx2ZMRZoMy...").
        // O hash é unidirecional: dá pra verificar se uma senha bate com
        // ele, mas não dá pra "descriptografar" de volta pro texto original.
        String senhaCriptografada = passwordEncoder.encode(request.getSenha());

        Motorista motorista = new Motorista(
                request.getNome(),
                request.getEmail(),
                senhaCriptografada,
                request.getTelefone(),
                request.getCpf(),
                dataNascimento);

        // Etapa de veículo é opcional — só cria se o Angular mandou o objeto
        if (request.getVeiculo() != null) {
            motorista.adicionarVeiculo(converterVeiculo(request.getVeiculo()));
        }

        // Um único save: o Hibernate insere em "usuario", depois em
        // "motorista", e depois em "veiculo" (se houver), tudo na mesma
        // transação, por causa do cascade = ALL lá na entidade Motorista.
        return motoristaRepository.save(motorista);
    }

    private LocalDate converterData(String dataTexto) {
        try {
            return LocalDate.parse(dataTexto, FORMATO_DATA);
        } catch (DateTimeParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Data de nascimento inválida. Use o formato dd/mm/aaaa.");
        }
    }

    private Veiculo converterVeiculo(DadosVeiculoDTO dto) {
        Veiculo veiculo = new Veiculo();
        veiculo.setMarca(dto.getMarca());
        veiculo.setModelo(dto.getModelo());
        veiculo.setAno(dto.getAno());
        veiculo.setTipoConector(dto.getTipoConector());
        veiculo.setCapacidadeBateria(dto.getCapacidadeBateria());
        veiculo.setAutonomia(dto.getAutonomia());
        veiculo.setCor(dto.getCor());
        veiculo.setPlaca(dto.getPlaca());
        return veiculo;
    }
}