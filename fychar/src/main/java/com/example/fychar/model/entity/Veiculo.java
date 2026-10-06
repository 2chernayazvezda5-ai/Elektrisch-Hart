package com.example.fychar.model.entity;

import jakarta.persistence.*;

/**
 * Entidade própria (não embutida no Motorista), justamente para
 * permitir que um motorista tenha vários veículos no futuro.
 *
 * Os campos ficam como String mesmo os que parecem numéricos (ano,
 * capacidadeBateria, autonomia) porque, no seu formulário, "capacidade
 * da bateria" e "autonomia" já são texto livre (placeholder "Ex: 60 kWh"),
 * e o "ano" vem de um <select> do HTML — que sempre entrega string,
 * mesmo com valores numéricos dentro. Tratar tudo como String evita
 * erro de conversão em campos que são opcionais e podem chegar vazios.
 */
@Entity
@Table(name = "veiculo")
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marca;
    private String modelo;
    private String ano;
    private String tipoConector;
    private String capacidadeBateria;
    private String autonomia;
    private String cor;
    private String placa;

    /**
     * Lado "dono" da relação com Motorista — é aqui que fica a coluna
     * motorista_id na tabela veiculo.
     */
    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Motorista motorista;

    public Veiculo() {
    }

    public Long getId() {
        return id;
    }

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

    public Motorista getMotorista() {
        return motorista;
    }

    public void setMotorista(Motorista motorista) {
        this.motorista = motorista;
    }
}