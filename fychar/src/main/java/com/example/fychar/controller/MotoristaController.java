package com.example.fychar.controller;

import com.example.fychar.dto.CadastroMotoristaRequest;
import com.example.fychar.dto.MotoristaResponse;
import com.example.fychar.model.entity.Motorista;
import com.example.fychar.service.MotoristaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/motoristas")
public class MotoristaController {

    private final MotoristaService service;

    public MotoristaController(MotoristaService service) {
        this.service = service;
    }

    /**
     * POST /api/motoristas
     * Recebe o JSON combinado (dados pessoais + veículo opcional) que o
     * CadastroMotoristaStore do Angular monta no final do wizard.
     */
    @PostMapping
    public ResponseEntity<MotoristaResponse> cadastrar(@Valid @RequestBody CadastroMotoristaRequest request) {
        Motorista motorista = service.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MotoristaResponse(motorista));
    }
}