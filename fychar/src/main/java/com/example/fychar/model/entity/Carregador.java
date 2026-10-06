package com.example.fychar.model.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Representa um ponto de carregamento de veículo elétrico.
 *
 * É um POJO (Plain Old Java Object) simples, sem Lombok, para deixar
 * explícito o que o Spring/Jackson realmente usa por trás dos panos:
 * getters e setters públicos são o que o Jackson usa para converter
 * este objeto em JSON (na saída) e de JSON para objeto Java (na entrada,
 * por exemplo no cadastro via POST).
 */
public class Carregador {

    private Long id;

    @NotBlank
    private String nome;

    private String descricao;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @NotNull
    private Double potenciaKw;

    @NotNull
    private TipoConector tipoConector;

    public Carregador() {
        // Construtor vazio exigido pelo Jackson para desserializar JSON -> objeto
    }

    public Carregador(Long id, String nome, String descricao, Double latitude,
            Double longitude, Double potenciaKw, TipoConector tipoConector) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.latitude = latitude;
        this.longitude = longitude;
        this.potenciaKw = potenciaKw;
        this.tipoConector = tipoConector;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getPotenciaKw() {
        return potenciaKw;
    }

    public void setPotenciaKw(Double potenciaKw) {
        this.potenciaKw = potenciaKw;
    }

    public TipoConector getTipoConector() {
        return tipoConector;
    }

    public void setTipoConector(TipoConector tipoConector) {
        this.tipoConector = tipoConector;
    }
}
