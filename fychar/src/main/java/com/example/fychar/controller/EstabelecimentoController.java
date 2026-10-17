package com.example.fychar.controller;

import com.example.fychar.dto.EstabelecimentoProximoResponse;
import com.example.fychar.service.EstabelecimentoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/estabelecimentos")
public class EstabelecimentoController {

    private final EstabelecimentoService service;

    public EstabelecimentoController(EstabelecimentoService service) {
        this.service = service;
    }

    @GetMapping("/proximos")
    public List<EstabelecimentoProximoResponse> proximos(@RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam double raio) {
        return service.buscarProximos(latitude, longitude, raio);
    }
}