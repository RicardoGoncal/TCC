package com.fatec.tcc.service;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.repository.VantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VantService {
    @Autowired
    private VantRepository vantRepository;
    public List<Vant> listar() {
        return vantRepository.findAll();
    }
}
