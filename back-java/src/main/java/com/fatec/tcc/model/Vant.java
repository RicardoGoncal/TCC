package com.fatec.tcc.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
@Data
@Entity
@Table(name = "vant")
public class Vant {

    @Id
    private Long id;

    @NotNull
    private String nome;
}
