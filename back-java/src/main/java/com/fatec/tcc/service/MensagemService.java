package com.fatec.tcc.service;

import com.fatec.tcc.model.Mensagem;
import com.fatec.tcc.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemService {

    @Autowired
    private MensagemRepository mensagemRepository;

    public ResponseEntity listar() {
        List<Mensagem> mensagens = mensagemRepository.findAll();
        return ResponseEntity.ok().body(mensagens);
    }

    public ResponseEntity findMessage(Long id) {
        List<Mensagem> mensagens = mensagemRepository.findAllByCategoria_Id(id);
        return ResponseEntity.ok().body(mensagens);
    }
}
