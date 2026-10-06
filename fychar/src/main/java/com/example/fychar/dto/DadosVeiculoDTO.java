package com.example.fychar.dto;

/** Todos os campos opcionais, espelhando o form de veículo do Angular. */
public class DadosVeiculoDTO {
    private String marca;
    private String modelo;
    private String ano;
    private String tipoConector;
    private String capacidadeBateria;
    private String autonomia;
    private String cor;
    private String placa;

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getTipoConector() {
        return tipoConector;
    }

    public void setTipoConector(String tipoConector) {
        this.tipoConector = tipoConector;
    }

    public String getCapacidadeBateria() {
        return capacidadeBateria;
    }

    public void setCapacidadeBateria(String capacidadeBateria) {
        this.capacidadeBateria = capacidadeBateria;
    }

    public String getAutonomia() {
        return autonomia;
    }

    public void setAutonomia(String autonomia) {
        this.autonomia = autonomia;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }
}