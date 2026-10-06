package com.example.fychar.service;

import com.example.fychar.dto.CarregadorProximoDTO;
import com.example.fychar.model.entity.Carregador;
import com.example.fychar.repository.CarregadorRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Camada de serviço: concentra as regras de negócio da aplicação.
 *
 * O Controller (camada web) não deveria conter lógica de cálculo ou de
 * filtragem — apenas receber a requisição HTTP, delegar para o Service,
 * e devolver a resposta. Essa separação (Controller -> Service ->
 * Repository) é o mesmo padrão em camadas que você já usou no projeto
 * de contas a pagar com JavaFX.
 */
@Service
public class CarregadorService {

    // Raio médio da Terra em quilômetros, usado na fórmula de Haversine
    private static final double RAIO_TERRA_KM = 6371.0;

    private final CarregadorRepository repository;

    public CarregadorService(CarregadorRepository repository) {
        this.repository = repository;
    }

    public List<Carregador> listarTodos() {
        return repository.listarTodos();
    }

    public Carregador cadastrar(Carregador carregador) {
        return repository.salvar(carregador);
    }

    /**
     * Retorna os carregadores dentro de um raio (em km) a partir de um ponto,
     * já ordenados do mais próximo para o mais distante.
     */
    public List<CarregadorProximoDTO> buscarProximos(double latitude, double longitude, double raioKm) {
        return repository.listarTodos().stream()
                .map(c -> new CarregadorProximoDTO(c, calcularDistanciaHaversine(
                        latitude, longitude, c.getLatitude(), c.getLongitude())))
                .filter(dto -> dto.getDistanciaKm() <= raioKm)
                .sorted(Comparator.comparingDouble(CarregadorProximoDTO::getDistanciaKm))
                .collect(Collectors.toList());
    }

    /**
     * Fórmula de Haversine: calcula a distância em linha reta (grande círculo)
     * entre dois pontos na superfície de uma esfera, a partir de suas
     * coordenadas de latitude/longitude em graus.
     *
     * Como funciona, resumidamente:
     * 1. Convertemos as coordenadas de graus para radianos (as funções
     * trigonométricas do Java trabalham em radianos).
     * 2. Calculamos a diferença entre as latitudes e entre as longitudes.
     * 3. Aplicamos a fórmula do "haversine" (seno ao quadrado da metade do
     * ângulo), que lida bem com a curvatura da Terra — diferente de uma
     * simples distância euclidiana (linha reta em um plano), que
     * distorceria bastante os resultados em distâncias maiores.
     * 4. Multiplicamos pelo raio da Terra para converter o ângulo resultante
     * em uma distância real, em quilômetros.
     */
    private double calcularDistanciaHaversine(double lat1, double lon1, double lat2, double lon2) {
        double lat1Rad = Math.toRadians(lat1);
        double lat2Rad = Math.toRadians(lat2);
        double deltaLatRad = Math.toRadians(lat2 - lat1);
        double deltaLonRad = Math.toRadians(lon2 - lon1);

        double a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad)
                        * Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        double distanciaKm = RAIO_TERRA_KM * c;

        // Arredonda para 2 casas decimais só para exibição mais limpa
        return Math.round(distanciaKm * 100.0) / 100.0;
    }
}
