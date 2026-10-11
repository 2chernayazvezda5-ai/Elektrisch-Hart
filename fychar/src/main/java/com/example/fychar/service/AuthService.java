package com.example.fychar.service;

import com.example.fychar.dto.LoginRequest;
import com.example.fychar.dto.LoginResponse;
import com.example.fychar.model.entity.Empresa;
import com.example.fychar.model.entity.Usuario;
import com.example.fychar.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        // E-mail inexistente e senha errada caem na MESMA mensagem de propósito:
        // dizer qual dos dois errou ajudaria quem tenta descobrir e-mails cadastrados.
        // matches() compara a senha digitada com o hash BCrypt guardado no banco.
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .filter(u -> passwordEncoder.matches(request.senha(), u.getSenha()))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos."));

        // A busca em Usuario devolve a subclasse certa,
        // por isso o instanceof funciona.
        String tipo = (usuario instanceof Empresa) ? "EMPRESA" : "MOTORISTA";

        return new LoginResponse(usuario.getId(), usuario.getNome(), usuario.getEmail(), tipo);
    }
}