package com.example.fychar.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record CadastroEmpresaRequest(
        @NotBlank String nome,
        @NotBlank @Pattern(regexp = "\\d{14}", message = "CNPJ deve ter 14 dígitos, sem pontuação") String cnpj,
        @NotBlank @Email String email,
        @NotBlank String telefone,
        @NotBlank @Size(min = 8, message = "Senha deve ter no mínimo 8 caracteres") String senha,
        @NotBlank String categoria,
        String descricao,
        @NotNull @Valid EnderecoDTO endereco,
        @NotNull @Valid InfraestruturaDTO infraestrutura) {
}