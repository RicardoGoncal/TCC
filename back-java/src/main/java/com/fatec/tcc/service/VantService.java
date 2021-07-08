package com.fatec.tcc.service;

import com.fatec.tcc.model.Vant;
import com.fatec.tcc.model.dto.VantDTO;
import com.fatec.tcc.repository.VantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VantService {
    @Autowired
    private VantRepository vantRepository;

    public List<Vant> listar() {
        return vantRepository.findAll();
    }

    public ResponseEntity salvar(VantDTO vantDTO) {
        try {
            Vant vant = new Vant();
            Integer portToVant = vantRepository.findMaxPort();
            portToVant++;
            vant.setPort(portToVant);
            vant.setNome(vantDTO.getNome());
            Vant vantCriado = vantRepository.save(vant);
            return ResponseEntity.status(HttpStatus.CREATED).body(vantCriado);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity deletar(Long id) {
        try {
            vantRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
