package com.example.fychar.model.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "ponto_recarga")
public class PontoRecarga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantidade;
    private String potencia;
    private String tipoConector;
    private String velocidade;
    private boolean gratuito;

    /*
     * O BigDecimal (da classe java.math.BigDecimal) é usado em Java para realizar
     * cálculos numéricos com precisão arbitrária,
     * sendo ideal para aplicações financeiras e monetárias onde erros de
     * arredondamento de double ou float são inaceitáveis.
     * obs: se for gratuito o valor vai ficar como nulo
     */
    @Column(precision = 10, scale = 2)
    private BigDecimal precoPorKwh;

    // Por enquanto vai ficar como String por conta da falta de restrições no
    // formulário.
    // Possivelmente sera modificado no futuro.
    private String taxaOciosidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    public PontoRecarga() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getPotencia() {
        return potencia;
    }

    public void setPotencia(String potencia) {
        this.potencia = potencia;
    }

    public String getTipoConector() {
        return tipoConector;
    }

    public void setTipoConector(String tipoConector) {
        this.tipoConector = tipoConector;
    }

    public String getVelocidade() {
        return velocidade;
    }

    public void setVelocidade(String velocidade) {
        this.velocidade = velocidade;
    }

    public boolean isGratuito() {
        return gratuito;
    }

    public void setGratuito(boolean gratuito) {
        this.gratuito = gratuito;
    }

    public BigDecimal getPrecoPorKwh() {
        return precoPorKwh;
    }

    public void setPrecoPorKwh(BigDecimal precoPorKwh) {
        this.precoPorKwh = precoPorKwh;
    }

    public String getTaxaOciosidade() {
        return taxaOciosidade;
    }

    public void setTaxaOciosidade(String taxaOciosidade) {
        this.taxaOciosidade = taxaOciosidade;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

}