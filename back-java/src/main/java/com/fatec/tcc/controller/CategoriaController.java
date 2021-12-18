package com.fatec.tcc.controller;

import com.fatec.tcc.model.Categoria;
import com.fatec.tcc.service.CategoriaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api(value = "Categoria")
@RestController
@RequestMapping("categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @Cacheable(value = "listaDeCategorias")
    @ApiOperation(value = "Listagem de todas as categorias")
    @GetMapping()
    public ResponseEntity<List<Categoria>> listar(){
        List<Categoria> categorias = categoriaService.listar();
        return ResponseEntity.ok().body(categorias);
    }
}
