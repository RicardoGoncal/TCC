package com.fatec.tcc.controller;

import com.fatec.tcc.model.User;
import com.fatec.tcc.service.TorreDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TorreController {

    @Autowired
    TorreDetailsService torreDetailsService;


    @GetMapping(value = "login", produces = "application/json")
    public User validateLogin() {
        return new User("User successfully authenticated");
    }

}
