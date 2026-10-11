package com.example.fychar.controller;

import com.example.fychar.dto.CadastroEmpresaRequest;
import com.example.fychar.dto.EmpresaResponse;
import com.example.fychar.model.entity.Empresa;
import com.example.fychar.service.EmpresaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService service;

    public EmpresaController(EmpresaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EmpresaResponse> cadastrar(@Valid @RequestBody CadastroEmpresaRequest request) {
        Empresa empresa = service.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(EmpresaResponse.de(empresa));
    }
}