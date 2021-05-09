package com.fatec.tcc.service;

import com.fatec.tcc.repository.TorreRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;


import lombok.RequiredArgsConstructor;

import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class TorreDetailsService implements UserDetailsService {

    private final TorreRepository torreRepository;

    @Override
    public UserDetails loadUserByUsername(String nome) throws UsernameNotFoundException {
        return Optional.ofNullable(torreRepository.findByNome(nome))
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado") );
    }

}
