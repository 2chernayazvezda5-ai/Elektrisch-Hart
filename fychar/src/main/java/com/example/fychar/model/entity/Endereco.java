package com.example.fychar.model.entity;

import jakarta.persistence.Embeddable;

/**
 * @Embeddable: não é uma tabela própria. Os campos viram colunas
 *              dentro da tabela da entidade que a embute.
 *              por enquanto só empresa vai ultilizar , mas ja que endereço é
 *              algo que pode
 *              ser futuramente necessario em motoristas ou em um possivel novo
 *              tipo
 *              de usuario no futuro decidi fazer desta forma para reaproveitar
 *              o código no futuro.
 */
@Embeddable
public class Endereco {

    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private Double latitude;
    private Double longitude;

    protected Endereco() {
        // exigido pelo JPA
    }

    public Endereco(String cep, String rua, String numero, String complemento,
            String bairro, String cidade, String estado) {
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }

    // vai ser para o caso do nominatim não conseguir definir o local usando o
    // endereço que tiver sido passado,
    // então vou colocar um campo para colocar essas informações em caso de erro.
    public void setCoordenadas(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}