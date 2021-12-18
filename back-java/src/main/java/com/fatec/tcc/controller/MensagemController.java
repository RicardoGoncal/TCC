package com.fatec.tcc.controller;

import com.fatec.tcc.model.Mensagem;
import com.fatec.tcc.service.MensagemService;
import io.swagger.annotations.ApiOperation;
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

    @ApiOperation(value = "Listagem de todas as mensagens")
    @GetMapping()
    public ResponseEntity<List<Mensagem>> listar(){
        return mensagemService.listar();
    }

    @ApiOperation(value = "Listagem de todas as mensagens de subida")
    @GetMapping("/climb")
    public ResponseEntity<List<Mensagem>> listarClimb(){
        return mensagemService.findMessage(1L);
    }

    @ApiOperation(value = "Listagem de todas as mensagens de rota")
    @GetMapping("/route")
    public ResponseEntity<List<Mensagem>> listarRoute(){
        return mensagemService.findMessage(2L);
    }


    @ApiOperation(value = "Listagem de todas as mensagens de descida")
    @GetMapping("/descend")
    public ResponseEntity<List<Mensagem>> listarDescend(){
        return mensagemService.findMessage(3L);
    }

    @ApiOperation(value = "Listagem de todas as mensagens de comms")
    @GetMapping("/comms")
    public ResponseEntity<List<Mensagem>> listarComms(){
        return mensagemService.findMessage(4L);
    }

    @ApiOperation(value = "Listagem de todas as mensagens de velocidade")
    @GetMapping("/speed")
    public ResponseEntity<List<Mensagem>> listarSpeed(){
        return mensagemService.findMessage(5L);

    }

    @ApiOperation(value = "Listagem de todas as mensagens de reporte")
    @GetMapping("/report")
    public ResponseEntity<List<Mensagem>> listarReport(){
        return mensagemService.findMessage(6L);
    }

    @ApiOperation(value = "Listagem de todas as mensagens de emergencia")
    @GetMapping("/emergency")
    public ResponseEntity<List<Mensagem>> listarEmergency(){
        return mensagemService.findMessage(7L);
    }

    @ApiOperation(value = "Listagem de todas as mensagens de cruzamento")
    @GetMapping("/crossing")
    public ResponseEntity<List<Mensagem>> listarCrossing(){
        return mensagemService.findMessage(8L);
    }

}
