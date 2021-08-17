package com.fatec.tcc.controller;

import com.fatec.tcc.model.Usuario;
import com.fatec.tcc.model.dto.request.UsuarioRequest;
import com.fatec.tcc.model.dto.response.UsuarioResponse;
import com.fatec.tcc.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @ApiIgnore
    @PostMapping(value = "login", produces = "application/json")
    public UsuarioResponse validateLogin(@RequestBody String username) {
        return usuarioService.findUser(username);
    }

    @PostMapping("/new")
    public ResponseEntity<Usuario> create(@RequestBody UsuarioRequest user){
        Usuario usuario = usuarioService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PutMapping("edit")
    public ResponseEntity<UsuarioResponse> update(@RequestBody UsuarioRequest user){
        UsuarioResponse usuario = usuarioService.update(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

}
