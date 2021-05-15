package com.fatec.tcc.repository;

import com.fatec.tcc.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
    List<Mensagem> findAllByMensagemContaining(String mensagem);

    List<Mensagem> findAllByCategoria_Id(Long categoriaId);
}
