package com.example.fychar.model.entity;

import jakarta.persistence.*;
import com.example.fychar.model.enums.StatusEmpresa;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "empresa")
@DiscriminatorValue("EMPRESA")
public class Empresa extends Usuario {

    @Column(unique = true, nullable = false, length = 14)
    private String cnpj;

    private String categoria;

    @Column(length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusEmpresa status = StatusEmpresa.PENDENTE;

    @Embedded
    private Endereco endereco;

    // Dados do estabelecimento como um todo
    private String horarioFuncionamento;
    private boolean wifi;
    private boolean cafeteria;
    private boolean banheiro;
    private boolean areaEspera;

    @Column(length = 300)
    private String informacoesAdicionais;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PontoRecarga> pontosRecarga = new ArrayList<>();

    public Empresa() {
        super();
    }

    public Empresa(String nome, String email, String senha, String telefone, String cnpj) {
        super(nome, email, senha, telefone);
        this.cnpj = cnpj;
    }

    /**
     * Mesma ideia do Motorista.adicionarVeiculo, vai cuidar dos dois lados da
     * relação
     */
    public void adicionarPontoRecarga(PontoRecarga ponto) {
        ponto.setEmpresa(this);
        this.pontosRecarga.add(ponto);
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public StatusEmpresa getStatus() {
        return status;
    }

    public void setStatus(StatusEmpresa status) {
        this.status = status;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public String getHorarioFuncionamento() {
        return horarioFuncionamento;
    }

    public void setHorarioFuncionamento(String horarioFuncionamento) {
        this.horarioFuncionamento = horarioFuncionamento;
    }

    public boolean isWifi() {
        return wifi;
    }

    public void setWifi(boolean wifi) {
        this.wifi = wifi;
    }

    public boolean isCafeteria() {
        return cafeteria;
    }

    public void setCafeteria(boolean cafeteria) {
        this.cafeteria = cafeteria;
    }

    public boolean isBanheiro() {
        return banheiro;
    }

    public void setBanheiro(boolean banheiro) {
        this.banheiro = banheiro;
    }

    public boolean isAreaEspera() {
        return areaEspera;
    }

    public void setAreaEspera(boolean areaEspera) {
        this.areaEspera = areaEspera;
    }

    public String getInformacoesAdicionais() {
        return informacoesAdicionais;
    }

    public void setInformacoesAdicionais(String informacoesAdicionais) {
        this.informacoesAdicionais = informacoesAdicionais;
    }

    public List<PontoRecarga> getPontosRecarga() {
        return pontosRecarga;
    }

    public void setPontosRecarga(List<PontoRecarga> pontosRecarga) {
        this.pontosRecarga = pontosRecarga;
    }

}