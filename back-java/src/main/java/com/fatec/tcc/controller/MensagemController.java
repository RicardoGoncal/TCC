package com.fatec.tcc.controller;

import com.fatec.tcc.model.Mensagem;
import com.fatec.tcc.service.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

//    @GetMapping()
//    public ResponseEntity<List<Mensagem>> buscarMensagem(@RequestBody String mensagem){
//        List<Mensagem> mensagens = mensagemService.findMessage(mensagem);
//        return ResponseEntity.ok().body(mensagens);
//    }
}
