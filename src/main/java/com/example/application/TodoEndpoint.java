package com.example.application;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class TodoEndpoint {
    
    private TodoRepository repository;

    TodoEndpoint(TodoRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Todo> findAll() {
        return repository.findAll();
    }

    public Todo save(Todo todo) {
        return repository.save(todo);
    }

    public Integer delete(Todo todo) {
        repository.delete(todo);
        return todo.getId();
    }
    
}
