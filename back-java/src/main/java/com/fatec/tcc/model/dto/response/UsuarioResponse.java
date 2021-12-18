package com.fatec.tcc.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponse {

    @NotNull
    private String nome;

    @NotNull
    private String senha;

    private Boolean autoridades;
}
