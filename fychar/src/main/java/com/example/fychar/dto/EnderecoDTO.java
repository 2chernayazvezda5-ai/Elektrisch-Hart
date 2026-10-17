package com.example.fychar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record EnderecoDTO(
                @NotBlank @Pattern(regexp = "\\d{8}", message = "CEP deve ter 8 dígitos, sem hífen") String cep,
                @NotBlank String rua,
                @NotBlank String numero,
                String complemento,
                @NotBlank String bairro,
                @NotBlank String cidade,
                @NotBlank String estado,
                Double latitude, // opcional: se vier junto com a longitude, o Nominatim não é chamado
                Double longitude) {
}