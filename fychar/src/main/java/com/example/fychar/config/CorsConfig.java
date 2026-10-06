package com.example.fychar.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração de CORS (Cross-Origin Resource Sharing).
 *
 * Por que isso é necessário?
 * O Angular, em desenvolvimento, roda em http://localhost:4200
 * O Spring Boot roda em http://localhost:8080
 * Como as portas são diferentes, o navegador considera essas duas
 * aplicações "origens diferentes" e, por segurança, bloqueia por padrão
 * requisições JavaScript de uma origem para outra (política de mesma
 * origem / Same-Origin Policy).
 *
 * Esta classe diz explicitamente ao Spring: "confie em requisições vindas
 * de http://localhost:4200, para qualquer rota /api/**, usando os
 * métodos GET, POST, PUT e DELETE".
 *
 * Em produção, o ideal é trocar "http://localhost:4200" pelo domínio real
 * do frontend.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
