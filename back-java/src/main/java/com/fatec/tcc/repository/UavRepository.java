package com.fatec.tcc.repository;

import com.fatec.tcc.model.Uav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UavRepository extends JpaRepository<Uav, Long> {

    @Query("SELECT MAX(v.port) FROM Uav v")
    Integer findMaxPort();
}
