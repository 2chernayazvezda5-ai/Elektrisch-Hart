package com.example.fychar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fychar.model.entity.Usuario;

import java.util.Optional;

/**
 * repository da classe usuario
 * JpaRepository já dá save(), findById(), findAll(), delete().
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}