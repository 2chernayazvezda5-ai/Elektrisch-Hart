package com.example.fychar.model.entity;

/**
 * Enum representando os tipos de conector mais comuns de carregadores
 * de veículos elétricos.
 *
 * Usar um enum (em vez de uma String qualquer) garante que só sejam
 * aceitos valores válidos, tanto no backend quanto na hora de gerar
 * a documentação/serialização JSON.
 */
public enum TipoConector {
    TIPO_2,
    CCS,
    CHADEMO
}
