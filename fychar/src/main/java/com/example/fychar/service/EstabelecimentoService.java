package com.example.fychar.service;

import com.example.fychar.dto.EstabelecimentoProximoResponse;
import com.example.fychar.dto.PontoRecargaResponse;
import com.example.fychar.model.entity.Empresa;
import com.example.fychar.repository.EmpresaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

@Service
public class EstabelecimentoService {

    private static final double RAIO_TERRA_KM = 6371.0; // da para deixar mais preciso , mas não vejo necessidade por
                                                        // enquanto.
    private static final double RAIO_MAXIMO_KM = 50.0;// deixei um raio maximo para não deixar que busque todos os
                                                      // carregadores cadastrados ao mesmo tempo.
    private static final int LIMITE_RESULTADOS = 50;

    private final EmpresaRepository empresaRepository;

    public EstabelecimentoService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    @Transactional(readOnly = true)
    public List<EstabelecimentoProximoResponse> buscarProximos(double latitude, double longitude, double raioKm) {
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Coordenadas inválidas.");
        }
        if (raioKm <= 0 || raioKm > RAIO_MAXIMO_KM) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "O raio deve ficar entre 0 e " + (int) RAIO_MAXIMO_KM + " km.");
        }

        // 1) Filtro barato no banco: uma "caixa" ao redor do ponto. Um grau de latitude
        // vale cerca de 111 km; o de longitude encolhe conforme nos afastamos do
        // equador.
        // A caixa fica um pouco maior que o necessário, de propósito: o Haversine
        // abaixo faz o corte exato, e a caixa nunca pode deixar alguém de fora.
        double deltaLat = raioKm / 111.0;
        double deltaLon = raioKm / (111.0 * Math.cos(Math.toRadians(latitude)));

        List<Empresa> candidatas = empresaRepository
                .findByEnderecoLatitudeBetweenAndEnderecoLongitudeBetween(
                        latitude - deltaLat, latitude + deltaLat,
                        longitude - deltaLon, longitude + deltaLon);

        // 2) Haversine só nos candidatos, depois ordena pela distância e limita.
        // (TODO: quando existir aprovação de empresas, filtrar por status.) ... não sei
        // porque esta dando problema nesse comentario

        return candidatas.stream()
                .map(e -> paraResposta(e, haversine(latitude, longitude,
                        e.getEndereco().getLatitude(), e.getEndereco().getLongitude())))
                .filter(r -> r.distanciaKm() <= raioKm)
                .sorted(Comparator.comparingDouble(EstabelecimentoProximoResponse::distanciaKm))
                .limit(LIMITE_RESULTADOS)
                .toList();
    }

    private EstabelecimentoProximoResponse paraResposta(Empresa e, double distanciaKm) {
        List<PontoRecargaResponse> pontos = e.getPontosRecarga().stream()
                .map(p -> new PontoRecargaResponse(p.getQuantidade(), p.getPotencia(),
                        p.getTipoConector(), p.getVelocidade(), p.isGratuito(),
                        p.getPrecoPorKwh(), p.getTaxaOciosidade()))
                .toList();

        return new EstabelecimentoProximoResponse(e.getId(), e.getNome(), e.getCategoria(),
                e.getEndereco().getLatitude(), e.getEndereco().getLongitude(),
                distanciaKm, e.getHorarioFuncionamento(), pontos);
    }

    /**
     * Mesma fórmula do protótipo, só que em java , distância em km entre dois
     * pontos na superfície
     * da Terra.
     */
    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double distancia = RAIO_TERRA_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(distancia * 100.0) / 100.0;
    }
}