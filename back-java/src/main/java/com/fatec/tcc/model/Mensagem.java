package com.fatec.tcc.model;

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
    private Categoria categoria;

    @NotNull
    private String mensagem;
}
