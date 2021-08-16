package com.fatec.tcc.service;

import com.fatec.tcc.model.Usuario;
import com.fatec.tcc.model.dto.UsuarioDTO;
import com.fatec.tcc.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String nome) throws UsernameNotFoundException {
        return Optional.ofNullable(usuarioRepository.findUsuarioByNome(nome))
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    public Usuario create(UsuarioDTO user) {
        Usuario usuario = new Usuario();
        usuario.setNome(user.getNome());

        usuario.setSenha(passwordEncoder.encode(user.getSenha()));
        if (user.getAutoridades()) {
            usuario.setAutoridades("ROLE_USER,ROLE_ADMIN");
        } else {
            usuario.setAutoridades("ROLE_USER");
        }
        try {
            usuarioRepository.save(usuario);
        } catch (Exception e) {
            System.out.println(e.getCause());
        }
        return usuario;
    }

    public UsuarioDTO findUser(String nome) {
        Usuario usuario = usuarioRepository.findUsuarioByNome(nome.replace("\"", ""));
        UsuarioDTO dto = new UsuarioDTO();
        try {
            dto.setNome(usuario.getNome());
            dto.setSenha(usuario.getSenha());
            dto.setAutoridades(usuario.getAutoridades().equals("ROLE_USER"));
        } catch (Exception e) {
            throw new UsernameNotFoundException("Usuário não encontrado");
        }
        return dto;
    }
}
