package com.example.fychar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fychar.model.entity.Motorista;

import java.util.Optional;

public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
    Optional<Motorista> findByCpf(String cpf);
}