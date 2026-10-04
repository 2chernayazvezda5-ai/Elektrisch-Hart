package com.example.fychar.dto;

import com.example.fychar.model.entity.Carregador;
import com.example.fychar.model.entity.TipoConector;

/**
 * DTO (Data Transfer Object) usado especificamente na resposta do endpoint
 * de busca de carregadores próximos.
 *
 * Por que não reaproveitar a classe Carregador direto?
 * Porque essa busca precisa devolver um campo extra que não faz parte do
 * carregador em si: a distância calculada até o ponto informado pelo usuário.
 * Separar em um DTO evita "poluir" o modelo de domínio com um campo que só
 * existe no contexto de uma consulta específica.
 */
public class CarregadorProximoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private Double latitude;
    private Double longitude;
    private Double potenciaKw;
    private TipoConector tipoConector;
    private Double distanciaKm;

    public CarregadorProximoDTO(Carregador carregador, Double distanciaKm) {
        this.id = carregador.getId();
        this.nome = carregador.getNome();
        this.descricao = carregador.getDescricao();
        this.latitude = carregador.getLatitude();
        this.longitude = carregador.getLongitude();
        this.potenciaKw = carregador.getPotenciaKw();
        this.tipoConector = carregador.getTipoConector();
        this.distanciaKm = distanciaKm;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Double getPotenciaKw() {
        return potenciaKw;
    }

    public TipoConector getTipoConector() {
        return tipoConector;
    }

    public Double getDistanciaKm() {
        return distanciaKm;
    }
}
