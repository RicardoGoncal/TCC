package com.fatec.tcc.controller;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.service.VantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("vants")
public class VantController {

    @Autowired
    private VantService vantService;

    @GetMapping()
    public ResponseEntity<List<Vant>> listar(){
        List<Vant> categorias = vantService.listar();
        return ResponseEntity.ok().body(categorias);
    }
}
