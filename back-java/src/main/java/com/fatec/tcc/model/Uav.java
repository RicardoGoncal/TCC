package com.fatec.tcc.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Data
@Entity
@Table(name = "uav")
public class Uav {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty( example = "1")
    private Long id;

    @NotNull(message = "Nome não pode ser nulo")
    @NotEmpty(message = "Nome não pode ser vazio")
    @ApiModelProperty(dataType = "String", example = "Horus")
    private String nome;

    @ApiModelProperty(name = "Porta", dataType = "String", example = "5000")
    private Integer port;
}
