package com.fatec.tcc.repository;

import com.fatec.tcc.model.Vant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VantRepository extends JpaRepository<Vant, Long> {

    @Query("SELECT MAX(v.port) FROM Vant v")
    Integer findMaxPort();
}
