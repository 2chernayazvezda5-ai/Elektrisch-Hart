package com.example.fychar.dto;

import java.util.List;

public record EstabelecimentoProximoResponse(
        Long id, String nome, String categoria,
        double latitude, double longitude, double distanciaKm,
        String horarioFuncionamento, List<PontoRecargaResponse> pontosRecarga) {
}