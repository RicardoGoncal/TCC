package com.fatec.tcc.service;

import com.fatec.tcc.model.Uav;
import com.fatec.tcc.model.dto.UavDTO;
import com.fatec.tcc.repository.UavRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UavService {
    @Autowired
    private UavRepository uavRepository;

    public List<Uav> listar() {
        return uavRepository.findAll();
    }

    public ResponseEntity salvar(UavDTO uavDTO) {
        try {
            Uav uav = new Uav();
            Integer portToVant = uavRepository.findMaxPort();
            portToVant++;
            uav.setPort(portToVant);
            uav.setNome(uavDTO.getNome());
            Uav uavCriado = uavRepository.save(uav);
            return ResponseEntity.status(HttpStatus.CREATED).body(uavCriado);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity deletar(Long id) {
        try {
            uavRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
