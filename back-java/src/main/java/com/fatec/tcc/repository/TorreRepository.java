package com.fatec.tcc.repository;

import com.fatec.tcc.model.Torre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TorreRepository extends JpaRepository<Torre, Long> {
    Torre findByNome(String nome);
}
