package com.fatec.tcc.service;

import com.fatec.tcc.model.Usuario;
import com.fatec.tcc.model.dto.UsuarioDTO;
import com.fatec.tcc.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;


import lombok.RequiredArgsConstructor;

import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String nome) throws UsernameNotFoundException {
        return Optional.ofNullable(usuarioRepository.findByNome(nome))
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    public Usuario create(UsuarioDTO user) {
        Usuario usuario = new Usuario();
        usuario.setNome(user.getNome());
        usuario.setSenha(user.getSenha());
        if (user.getAutoridades()) {
            usuario.setAutoridades("ROLE_USER,ROLE_ADMIN");
        }else{
            usuario.setAutoridades("ROLE_USER");
        }
        usuarioRepository.save(usuario);
        return usuario;
    }
}
