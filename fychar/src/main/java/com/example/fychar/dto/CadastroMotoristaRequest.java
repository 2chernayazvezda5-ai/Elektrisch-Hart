package com.example.fychar.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

/**
 * Representa o JSON final enviado pelo Angular, depois de juntar
 * dadosPessoais + veiculo do CadastroMotoristaStore num POST só para deixar
 * mais simples as tables.
 */
public class CadastroMotoristaRequest {

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String telefone;

    @NotBlank
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos, sem pontuação")
    private String cpf;

    // Recebido como String porque o form manda "dd/mm/aaaa" como texto
    // (é um <input type="text">, não um date picker nativo). O Service
    // converte para LocalDate.
    @NotBlank
    private String dataNascimento;

    @NotBlank
    @Size(min = 8, message = "Senha deve ter no mínimo 8 caracteres")
    private String senha;

    // Pode vir nulo: no form, a etapa de veículo é toda opcional, então
    // o Angular pode nem mandar esse objeto se o usuário pulou a etapa.
    @Valid
    private DadosVeiculoDTO veiculo;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public DadosVeiculoDTO getVeiculo() {
        return veiculo;
    }

    public void setVeiculo(DadosVeiculoDTO veiculo) {
        this.veiculo = veiculo;
    }
}