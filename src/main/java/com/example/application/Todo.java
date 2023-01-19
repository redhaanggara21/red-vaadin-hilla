package com.example.application;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import com.vaadin.flow.component.template.Id;

@Entity
public class Todo {
    
    @Id
    @GeneratedValue
    private Long id;
    private String task;
    private String deskripsi;
    private boolean done;

    public Todo() {
    }

    public Todo(Long id, String task, String deskripsi, boolean done) {
        this.id = id;
        this.task = task;
        this.deskripsi = deskripsi;
        this.done = done;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

}
