package com.fatec.tcc.controller;

import com.fatec.tcc.model.Categoria;
import com.fatec.tcc.model.Mensagem;
import com.fatec.tcc.service.CategoriaService;
import com.fatec.tcc.service.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("mensagens")
public class MensagemController {

    @Autowired
    private MensagemService mensagemService;

    @GetMapping()
    public ResponseEntity<List<Mensagem>> listar(){
        List<Mensagem> mensagens = mensagemService.listar();
        return ResponseEntity.ok().body(mensagens);
    }
}
