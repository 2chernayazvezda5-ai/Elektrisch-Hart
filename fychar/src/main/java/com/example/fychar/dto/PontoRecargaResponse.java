package com.example.fychar.dto;

import java.math.BigDecimal;

public record PontoRecargaResponse(
        Integer quantidade, String potencia, String tipoConector, String velocidade,
        boolean gratuito, BigDecimal precoPorKwh, String taxaOciosidade) {
}