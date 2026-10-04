package com.example.fychar.controller;

import com.example.fychar.dto.CarregadorProximoDTO;
import com.example.fychar.model.entity.Carregador;
import com.example.fychar.service.CarregadorService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST: é a "porta de entrada" HTTP da aplicação.
 *
 * @RestController = @Controller + @ResponseBody, ou seja, todo retorno
 *                 dos métodos abaixo é automaticamente convertido para JSON
 *                 pelo Jackson
 *                 (que já vem incluído no spring-boot-starter-web) e escrito no
 *                 corpo da
 *                 resposta HTTP.
 *
 *                 @RequestMapping("/api/carregadores") define o prefixo comum
 *                 de todas
 *                 as rotas deste controller.
 */
@RestController
@RequestMapping("/api/carregadores")
public class CarregadorController {

    private final CarregadorService service;

    public CarregadorController(CarregadorService service) {
        this.service = service;
    }

    /**
     * GET /api/carregadores
     * Retorna todos os carregadores cadastrados (fictícios + os que forem
     * cadastrados via POST durante a execução da aplicação).
     */
    @GetMapping
    public ResponseEntity<List<Carregador>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    /**
     * GET /api/carregadores/proximos?latitude=-23.5015&longitude=-47.4526&raio=5
     *
     * @RequestParam extrai os parâmetros da query string da URL.
     *               O Spring já converte automaticamente o texto da URL para
     *               double.
     */
    @GetMapping("/proximos")
    public ResponseEntity<List<CarregadorProximoDTO>> buscarProximos(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam double raio) {
        return ResponseEntity.ok(service.buscarProximos(latitude, longitude, raio));
    }

    /**
     * POST /api/carregadores
     * Recebe um JSON no corpo da requisição (@RequestBody) e o Spring
     * desserializa automaticamente para um objeto Carregador.
     *
     * @Valid dispara as validações declaradas na classe Carregador
     *        (@NotBlank, @NotNull). Se algum campo obrigatório vier em branco,
     *        o Spring já devolve automaticamente um erro 400 (Bad Request).
     */
    @PostMapping
    public ResponseEntity<Carregador> cadastrar(@Valid @RequestBody Carregador carregador) {
        Carregador salvo = service.cadastrar(carregador);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }
}
