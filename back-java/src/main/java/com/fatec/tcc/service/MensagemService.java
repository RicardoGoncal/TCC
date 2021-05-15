package com.fatec.tcc.service;

import com.fatec.tcc.model.Mensagem;
import com.fatec.tcc.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemService {

    @Autowired
    private MensagemRepository mensagemRepository;

    public List<Mensagem> listar() {
        return mensagemRepository.findAll();
    }

    public List<Mensagem> findMessage(Long id) {
        return mensagemRepository.findAllByCategoria_Id(id);
    }
}
