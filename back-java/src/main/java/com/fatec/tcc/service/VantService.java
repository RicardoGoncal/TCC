package com.fatec.tcc.service;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.repository.VantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public class VantService {
    @Autowired
    private VantRepository vantRepository;

    public List<Vant> listar() {
        return vantRepository.findAll();
    }

    public Vant salvar(Vant vant) {
        try {
            Integer portToVant = vantRepository.findMaxPort();
            portToVant++;
            vant.setPort(portToVant);
            return vantRepository.save(vant);
        }catch (Exception e){
            return null;
        }
    }

    public void deletar(Long id) {
        vantRepository.deleteById(id);
    }
}
