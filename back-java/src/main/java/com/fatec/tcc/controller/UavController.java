package com.fatec.tcc.controller;

import com.fatec.tcc.model.Uav;
import com.fatec.tcc.model.dto.UavDTO;
import com.fatec.tcc.service.UavService;
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
@RequestMapping("uavs")
public class UavController {

    @Autowired
    private UavService uavService;

    @Cacheable("listaDeUavs")
    @ApiOperation(value = "Listagem de todos os Uavs")
    @GetMapping()
    public ResponseEntity<List<Uav>> listar() {
        List<Uav> categorias = uavService.listar();
        return ResponseEntity.ok().body(categorias);
    }

    @CacheEvict(value="listaDeUavs", allEntries = true)
    @ApiOperation(value = "Criação de novo Uav")
    @PostMapping
    public ResponseEntity<Uav> criar(@RequestBody @Valid UavDTO vant) {
        return uavService.salvar(vant);
    }

    @CacheEvict(value="listaDeUavs", allEntries = true)
    @ApiOperation(value = "Deleção de Uav por id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Uav> deletar(@PathVariable Long id) {
            return uavService.deletar(id);
    }
}
