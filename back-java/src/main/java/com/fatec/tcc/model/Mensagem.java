package com.fatec.tcc.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "mensagem")
public class Mensagem {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    @ApiModelProperty(dataType = "Categoria", example = "1")
    private Categoria categoria;

    @NotNull
    @ApiModelProperty(dataType = "String", example = "CLIMB FL")
    private String mensagem;
}
