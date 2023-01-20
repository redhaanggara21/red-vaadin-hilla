package com.example.application;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotBlank;

import com.vaadin.flow.component.template.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
public class Todo {
    
    @Id
    @Getter
    @Setter
    @GeneratedValue
    private Integer id;

    @Getter
    @Setter
    @NotBlank 
    private String task;

    @Getter
    @Setter
    @NotBlank 
    private String deskripsi;

    @Setter
    @Getter
    private boolean done = false;

    public Todo() {
    }

    public Todo(String task, String deskripsi) {
        this.task = task;
        this.deskripsi = deskripsi;
    }
}
