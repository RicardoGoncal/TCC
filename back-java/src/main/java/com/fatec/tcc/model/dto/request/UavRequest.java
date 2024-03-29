package com.fatec.tcc.model.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UavRequest {

    @NotNull(message = "Nome não pode ser nulo")
    @NotEmpty(message = "Nome não pode ser vazio")
    @ApiModelProperty( example = "Horus")
    private String nome;
}
