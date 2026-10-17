package com.example.fychar.service;

import com.example.fychar.model.entity.Endereco;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.net.http.HttpClient;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Converte endereço em latitude/longitude usando o Nominatim da openstreetmap.
 * Roda só no cadastro da empresa, o resultado fica salvo no banco.
 */
@Service
public class GeocodingService {

    private static final Logger log = LoggerFactory.getLogger(GeocodingService.class);

    public record Coordenadas(double latitude, double longitude) {
    }

    // O Nominatim devolve lat/lon como texto e muitos outros campos que não usamos
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record NominatimResultado(String lat, String lon) {
    }

    private final RestClient restClient;

    public GeocodingService() {
        // Timeouts: sem eles, um Nominatim lento travaria o cadastro indefinidamente
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(3)).build());
        factory.setReadTimeout(Duration.ofSeconds(5));

        this.restClient = RestClient.builder()
                .baseUrl("https://nominatim.openstreetmap.org")
                .requestFactory(factory)
                // A política de uso exige identificar a aplicação
                .defaultHeader("User-Agent", "FyChar-UPX3/1.0 (gapereira1390@gmail.com)")
                .build();
    }

    public Optional<Coordenadas> buscar(Endereco e) {
        // Tentativa 1: endereço completo. Tentativa 2: sem o número, que muitas
        // vezes não existe no OpenStreetMap (acha a rua, e já serve para o mapa).
        List<String> consultas = List.of(
                montar(e.getRua() + " " + e.getNumero(), e.getBairro(), e.getCidade(), e.getEstado()),
                montar(e.getRua(), e.getBairro(), e.getCidade(), e.getEstado()));

        for (int i = 0; i < consultas.size(); i++) {
            if (i > 0) {
                try {
                    Thread.sleep(1100); // limite do Nominatim: 1 requisição por segundo
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                    return Optional.empty();
                }
            }
            Optional<Coordenadas> resultado = consultar(consultas.get(i));
            if (resultado.isPresent()) {
                return resultado;
            }
        }
        return Optional.empty();
    }

    private Optional<Coordenadas> consultar(String consulta) {
        try {
            NominatimResultado[] resposta = restClient.get()
                    .uri(uri -> uri.path("/search")
                            .queryParam("format", "jsonv2")
                            .queryParam("limit", 1)
                            .queryParam("countrycodes", "br")
                            .queryParam("q", "{q}") // variável: o Spring codifica espaços e acentos
                            .build(consulta))
                    .retrieve()
                    .body(NominatimResultado[].class);

            if (resposta == null || resposta.length == 0) {
                return Optional.empty();
            }
            return Optional.of(new Coordenadas(
                    Double.parseDouble(resposta[0].lat()),
                    Double.parseDouble(resposta[0].lon())));
        } catch (RestClientException | NumberFormatException ex) {
            log.warn("Falha ao consultar o Nominatim para '{}': {}", consulta, ex.getMessage());
            return Optional.empty();
        }
    }

    private String montar(String... partes) {
        return Arrays.stream(partes)
                .filter(p -> p != null && !p.isBlank())
                .collect(Collectors.joining(", ")) + ", Brasil";
    }
}