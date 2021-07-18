package com.fatec.tcc.controller;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.model.dto.VantDTO;
import com.fatec.tcc.service.VantService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("vants")
public class VantController {

    @Autowired
    private VantService vantService;

    @Cacheable("listaDeVants")
    @ApiOperation(value = "Listagem de todos os vants")
    @GetMapping()
    public ResponseEntity<List<Vant>> listar() {
        List<Vant> categorias = vantService.listar();
        return ResponseEntity.ok().body(categorias);
    }

    @CacheEvict(value="listaDeVants", allEntries = true)
    @ApiOperation(value = "Criação de novo vant")
    @PostMapping
    public ResponseEntity<Vant> criar(@RequestBody @Valid VantDTO vant) {
        return vantService.salvar(vant);
    }

    @CacheEvict(value="listaDeVants", allEntries = true)
    @ApiOperation(value = "Deleção de vant por id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Vant> deletar(@PathVariable Long id) {
            return vantService.deletar(id);
    }
}
