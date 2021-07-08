package com.fatec.tcc.controller;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.model.dto.VantDTO;
import com.fatec.tcc.service.VantService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("vants")
public class VantController {

    @Autowired
    private VantService vantService;

    @ApiOperation(value = "Listagem de todos os vants")
    @GetMapping()
    public ResponseEntity<List<Vant>> listar() {
        List<Vant> categorias = vantService.listar();
        return ResponseEntity.ok().body(categorias);
    }

    @ApiOperation(value = "Criação de novo vant")
    @PostMapping
    public ResponseEntity<Vant> criar(@RequestBody @Valid VantDTO vant) {
        return vantService.salvar(vant);
    }

    @ApiOperation(value = "Deleção de vant por id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Vant> deletar(@PathVariable Long id) {
            return vantService.deletar(id);
    }
}
