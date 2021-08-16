package com.fatec.tcc.controller;

import com.fatec.tcc.model.User;
import com.fatec.tcc.model.Usuario;
import com.fatec.tcc.model.dto.UsuarioDTO;
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
    @GetMapping(value = "login", produces = "application/json")
    public User validateLogin() {
        return new User("User successfully authenticated");
    }

    @PostMapping("/new")
    public ResponseEntity<Usuario> create(@RequestBody UsuarioDTO user){
        System.out.println("CHAMEI");
        Usuario usuario = usuarioService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

}
