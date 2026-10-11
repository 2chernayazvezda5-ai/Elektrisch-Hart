package com.example.fychar.dto;

import com.example.fychar.model.entity.Empresa;
import com.example.fychar.model.enums.StatusEmpresa;

/**
 * Resposta do cadastro. Não inclui o hash da senha , talvez seja modificado ,
 * mas não vejo necessidade no momento.
 */
public record EmpresaResponse(
        Long id,
        String nome,
        String email,
        String cnpj,
        String categoria,
        StatusEmpresa status) {
    public static EmpresaResponse de(Empresa e) {
        return new EmpresaResponse(e.getId(), e.getNome(), e.getEmail(),
                e.getCnpj(), e.getCategoria(), e.getStatus());
    }
}