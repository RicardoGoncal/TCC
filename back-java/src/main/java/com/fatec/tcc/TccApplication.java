package com.fatec.tcc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class TccApplication {

    public static void main(String[] args) {
        SpringApplication.run(TccApplication.class, args);
    }

}
