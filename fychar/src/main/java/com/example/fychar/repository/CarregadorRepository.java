package com.example.fychar.repository;

import com.example.fychar.model.entity.Carregador;
import com.example.fychar.model.entity.TipoConector;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

/**
 * "Banco de dados" em memória.
 *
 * Em vez de usar JPA + banco relacional (que o enunciado pediu para deixar
 * de fora neste protótipo), guardamos os carregadores em uma lista Java
 * comum, dentro de um bean gerenciado pelo Spring (@Repository).
 *
 * Como o Spring Boot cria essa classe como um Singleton (uma única
 * instância compartilhada por toda a aplicação), a lista funciona como
 * um "banco" simples que vive apenas enquanto o processo estiver rodando.
 * Ao reiniciar a aplicação, os dados voltam ao estado inicial.
 *
 * CopyOnWriteArrayList é usada em vez de ArrayList comum porque é
 * thread-safe (o Spring Boot pode atender múltiplas requisições HTTP
 * simultaneamente, cada uma em uma thread diferente).
 */
@Repository
public class CarregadorRepository {

    private final List<Carregador> carregadores = new CopyOnWriteArrayList<>();

    // Gera IDs únicos e crescentes de forma segura entre threads
    private final AtomicLong proximoId = new AtomicLong(1);

    public CarregadorRepository() {
        // Dados fictícios iniciais, para já termos algo no mapa ao subir a aplicação.
        // Coordenadas na região de Campinas/SP, apenas como exemplo.
        carregadores.add(new Carregador(proximoId.getAndIncrement(),
                "Carregador Shopping Iguatemi", "Carregador rápido no estacionamento coberto",
                -22.8746, -47.1866, 22.0, TipoConector.TIPO_2));

        carregadores.add(new Carregador(proximoId.getAndIncrement(),
                "Carregador Praça Central", "Ponto de recarga na praça central da cidade",
                -22.8219, -47.2669, 7.4, TipoConector.CCS));

        carregadores.add(new Carregador(proximoId.getAndIncrement(),
                "Carregador Terminal Rodoviário", "Carregador ultra-rápido próximo ao terminal",
                -22.9056, -47.0608, 50.0, TipoConector.CHADEMO));

        carregadores.add(new Carregador(proximoId.getAndIncrement(),
                "Carregador Universidade", "Carregador no estacionamento do campus",
                -22.8172, -47.0694, 11.0, TipoConector.TIPO_2));
    }

    public List<Carregador> listarTodos() {
        return carregadores;
    }

    public Optional<Carregador> buscarPorId(Long id) {
        return carregadores.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
    }

    public Carregador salvar(Carregador carregador) {
        carregador.setId(proximoId.getAndIncrement());
        carregadores.add(carregador);
        return carregador;
    }
}
