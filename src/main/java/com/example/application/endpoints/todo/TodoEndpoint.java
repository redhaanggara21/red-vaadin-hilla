package com.example.application.endpoints.todo;

import java.util.List;

import com.example.application.Todo;
import com.example.application.TodoRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class TodoEndpoint {
    
    private TodoRepository repository;

    TodoEndpoint(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> findAll(){
        return repository.findAll();
    }

    public Todo save(Todo todo){
        return repository.save(todo);
    }

    public Todo update(Todo todo, Long id){
        Todo update = repository.findById(id);
        update = todo;
        return repository.save(update);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
    
}
