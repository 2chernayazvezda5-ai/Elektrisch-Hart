package com.example.fychar.dto;

/** Nunca devolve a senha, nem o hash dela. */
public record LoginResponse(Long id, String nome, String email, String tipo) {
}