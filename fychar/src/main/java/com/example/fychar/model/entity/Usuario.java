package com.example.fychar.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// explicação caso esqueça para o que serve o que usei
/**
 * Classe base da hierarquia de usuários.
 *
 * @Inheritance(strategy = JOINED): cada subclasse ganha sua própria
 *                       tabela, ligada à tabela "usuario" pelo mesmo id (chave
 *                       primária
 *                       E estrangeira ao mesmo tempo). O Hibernate junta as
 *                       duas automaticamente
 *                       via SQL JOIN quando você busca um Motorista, e via dois
 *                       INSERTs numa
 *                       só transação quando você salva.
 *
 * @DiscriminatorColumn: cria uma coluna "tipo" na tabela usuario, que
 *                       guarda qual subclasse aquela linha representa (ex:
 *                       "MOTORISTA").
 *                       Isso permite, no futuro, buscar todos os usuários (ex:
 *                       para um admin)
 *                       sem se importar com o tipo de cada um.
 */

@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo", discriminatorType = DiscriminatorType.STRING)
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    // Se no site diz que vai ter segurança então vou por um pouco:
    // tentar não receber um texto de verdade e sim o
    // resultado do BCrypt (um hash), nunca a senha original.
    // obs: só tentar
    @NotBlank
    private String senha;

    @NotBlank
    private String telefone;

    protected Usuario() {
        // construtor vazio porque é necessario para o JPA
    }

    protected Usuario(String nome, String email, String senha, String telefone) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

}