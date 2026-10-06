package com.example.fychar.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.example.fychar.model.entity.Motorista;
import com.example.fychar.model.entity.Veiculo;

/**
 * O que devolvemos pro Angular depois do cadastro. Importante: NÃO tem
 * campo "senha" aqui — nunca devolvemos o hash da senha numa resposta
 * de API, mesmo que seja só um hash (não precisa vazar nem isso).
 */
public class MotoristaResponse {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String cpf;
    private LocalDate dataNascimento;
    private List<VeiculoResponse> veiculos;

    public MotoristaResponse(Motorista motorista) {
        this.id = motorista.getId();
        this.nome = motorista.getNome();
        this.email = motorista.getEmail();
        this.telefone = motorista.getTelefone();
        this.cpf = motorista.getCpf();
        this.dataNascimento = motorista.getDataNascimento();
        this.veiculos = motorista.getVeiculos().stream()
                .map(VeiculoResponse::new)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public List<VeiculoResponse> getVeiculos() {
        return veiculos;
    }

    /** Classe aninhada simples só para representar cada veículo na resposta */
    public static class VeiculoResponse {
        private Long id;
        private String marca;
        private String modelo;

        public VeiculoResponse(Veiculo veiculo) {
            this.id = veiculo.getId();
            this.marca = veiculo.getMarca();
            this.modelo = veiculo.getModelo();
        }

        public Long getId() {
            return id;
        }

        public String getMarca() {
            return marca;
        }

        public String getModelo() {
            return modelo;
        }
    }
}