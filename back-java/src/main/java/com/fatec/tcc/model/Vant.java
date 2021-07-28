package com.fatec.tcc.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import springfox.documentation.annotations.ApiIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Data
@Entity
@Table(name = "vant")
public class Vant {

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
