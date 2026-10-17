package com.example.fychar.repository;

import com.example.fychar.model.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    boolean existsByCnpj(String cnpj);

    @EntityGraph(attributePaths = "pontosRecarga")
    List<Empresa> findByEnderecoLatitudeBetweenAndEnderecoLongitudeBetween(
            double latitudeMin, double latitudeMax, double longitudeMin, double longitudeMax);
}