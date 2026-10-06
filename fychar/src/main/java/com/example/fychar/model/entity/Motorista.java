package com.example.fychar.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * @DiscriminatorValue("MOTORISTA") é o valor que vai aparecer na coluna
 * "tipo" (lá na tabela usuario) para identificar as linhas que são,
 * na verdade, um motorista.
 *
 * @PrimaryKeyJoinColumn (implícito aqui, é o padrão do JOINED): a tabela
 *                       "motorista" vai ter uma coluna "id" que é, ao mesmo
 *                       tempo, chave
 *                       primária dela e chave estrangeira apontando pra
 *                       "usuario.id".
 */
@Entity
@Table(name = "motorista")
@DiscriminatorValue("MOTORISTA")
public class Motorista extends Usuario {

    @NotBlank
    @Column(unique = true, nullable = false, length = 11)
    private String cpf;

    @NotNull
    private LocalDate dataNascimento;

    /**
     * mappedBy = "motorista" aponta pro nome do campo lá na classe Veiculo
     * que guarda essa relação (é o "dono" do relacionamento, quem tem a
     * coluna motorista_id). cascade = ALL faz com que salvar um Motorista
     * salve automaticamente os veículos novos dentro da lista também —
     * é o que permite 1 único save() criar motorista + veículo juntos.
     */
    @OneToMany(mappedBy = "motorista", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Veiculo> veiculos = new ArrayList<>();

    public Motorista() {
        super();
    }

    public Motorista(String nome, String email, String senha, String telefone,
            String cpf, LocalDate dataNascimento) {
        super(nome, email, senha, telefone);
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    /** Adiciona um veículo já cuidando dos dois lados da relação */
    public void adicionarVeiculo(Veiculo veiculo) {
        veiculo.setMotorista(this);
        this.veiculos.add(veiculo);
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public List<Veiculo> getVeiculos() {
        return veiculos;
    }
}