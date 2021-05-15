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

    @GetMapping("/climb")
    public ResponseEntity<List<Mensagem>> listarClimb(){
        List<Mensagem> mensagens = mensagemService.findMessage(1L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/route")
    public ResponseEntity<List<Mensagem>> listarRoute(){
        List<Mensagem> mensagens = mensagemService.findMessage(2L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/emergency")
    public ResponseEntity<List<Mensagem>> listarEmergency(){
        List<Mensagem> mensagens = mensagemService.findMessage(7L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/descend")
    public ResponseEntity<List<Mensagem>> listarDescend(){
        List<Mensagem> mensagens = mensagemService.findMessage(3L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/comms")
    public ResponseEntity<List<Mensagem>> listarComms(){
        List<Mensagem> mensagens = mensagemService.findMessage(4L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/speed")
    public ResponseEntity<List<Mensagem>> listarSpeed(){
        List<Mensagem> mensagens = mensagemService.findMessage(5L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/report")
    public ResponseEntity<List<Mensagem>> listarReport(){
        List<Mensagem> mensagens = mensagemService.findMessage(6L);
        return ResponseEntity.ok().body(mensagens);
    }

    @GetMapping("/crossing")
    public ResponseEntity<List<Mensagem>> listarCrossing(){
        List<Mensagem> mensagens = mensagemService.findMessage(8L);
        return ResponseEntity.ok().body(mensagens);
    }

}
