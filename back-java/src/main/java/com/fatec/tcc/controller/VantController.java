package com.fatec.tcc.controller;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.service.VantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("vants")
public class VantController {

    @Autowired
    private VantService vantService;

    @GetMapping()
    public ResponseEntity<List<Vant>> listar() {
        List<Vant> categorias = vantService.listar();
        return ResponseEntity.ok().body(categorias);
    }

    @PostMapping
    public ResponseEntity<Vant> criar(@RequestBody @Valid Vant vant) {
        Vant vantCriado = vantService.salvar(vant);
        if (vantCriado != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(vantCriado);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Vant> deletar(@PathVariable Long id) {
        try {
            vantService.deletar(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
