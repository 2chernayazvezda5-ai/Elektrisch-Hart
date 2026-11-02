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
import java.util.Optional;

@Service
public class EstabelecimentoService {

        private static final double RAIO_TERRA_KM = 6371.0;
        private static final double RAIO_MAXIMO_KM = 100.0;
        private static final int LIMITE_RESULTADOS = 50;

        private final EmpresaRepository empresaRepository;

        public EstabelecimentoService(EmpresaRepository empresaRepository) {
                this.empresaRepository = empresaRepository;
        }

        @Transactional(readOnly = true)
        public List<EstabelecimentoProximoResponse> buscarProximos(double latitude, double longitude,
                        double raioKm, String conector) {
                if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Coordenadas inválidas.");
                }
                if (raioKm <= 0 || raioKm > RAIO_MAXIMO_KM) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                        "O raio deve ficar entre 0 e " + (int) RAIO_MAXIMO_KM + " km.");
                }

                // Conector vazio ou ausente = sem filtro (todos os tipos)
                String filtroConector = (conector == null || conector.isBlank()) ? null : conector.trim();

                // 1) Filtro barato no banco: uma "caixa" ao redor do ponto (um pouco maior que
                // o
                // necessário, de propósito: o Haversine abaixo faz o corte exato)
                double deltaLat = raioKm / 111.0;
                double deltaLon = raioKm / (111.0 * Math.cos(Math.toRadians(latitude)));

                List<Empresa> candidatas = empresaRepository
                                .findByEnderecoLatitudeBetweenAndEnderecoLongitudeBetween(
                                                latitude - deltaLat, latitude + deltaLat,
                                                longitude - deltaLon, longitude + deltaLon);

                // 2) Haversine só nos candidatos; quem não tem carregador do tipo pedido fica
                // de fora.
                // A ordenação por distância é o que faz o primeiro da lista ser o mais próximo.
                return candidatas.stream()
                                .map(e -> paraResposta(e, filtroConector, haversine(latitude, longitude,
                                                e.getEndereco().getLatitude(), e.getEndereco().getLongitude())))
                                .flatMap(Optional::stream)
                                .filter(r -> r.distanciaKm() <= raioKm)
                                .sorted(Comparator.comparingDouble(EstabelecimentoProximoResponse::distanciaKm))
                                .limit(LIMITE_RESULTADOS)
                                .toList();
        }

        private Optional<EstabelecimentoProximoResponse> paraResposta(Empresa e, String conector,
                        double distanciaKm) {
                List<PontoRecargaResponse> pontos = e.getPontosRecarga().stream()
                                .filter(p -> conector == null || conector.equalsIgnoreCase(p.getTipoConector()))
                                .map(p -> new PontoRecargaResponse(p.getQuantidade(), p.getPotencia(),
                                                p.getTipoConector(), p.getVelocidade(), p.isGratuito(),
                                                p.getPrecoPorKwh(), p.getTaxaOciosidade()))
                                .toList();

                // Com filtro ativo, estabelecimento sem nenhum carregador compatível não entra
                if (conector != null && pontos.isEmpty()) {
                        return Optional.empty();
                }

                return Optional.of(new EstabelecimentoProximoResponse(e.getId(), e.getNome(), e.getCategoria(),
                                e.getEndereco().getLatitude(), e.getEndereco().getLongitude(),
                                distanciaKm, e.getHorarioFuncionamento(), pontos));
        }

        /**
         * Mesma fórmula do protótipo: distância em km entre dois pontos na superfície
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