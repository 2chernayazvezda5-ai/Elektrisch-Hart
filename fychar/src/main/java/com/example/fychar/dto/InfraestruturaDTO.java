package com.example.fychar.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record InfraestruturaDTO(
        @NotNull @Min(1) Integer quantidadeCarregadores,
        @NotBlank String potencia,
        @NotBlank String tipoConector,
        @NotBlank String velocidade,
        @NotBlank String horarioFuncionamento,
        boolean gratuito,
        String precoPorKwh, // chega como texto por causa da forma de como esta o formulario, talvez seja
                            // modificado no futuro.
        String taxaOciosidade,
        boolean wifi,
        boolean cafeteria,
        boolean banheiro,
        boolean areaEspera,
        @Size(max = 300) String informacoesAdicionais) {
}