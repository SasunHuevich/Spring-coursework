package ru.isu.taskmanager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "topiclock") // Название таблицы
public class TopicLock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Первичный ключ
    private Integer id;

    @Column(name = "name", length = 200, nullable = false) // Название темы
    private String name;

    @Column(name = "teacher", nullable = false) // Преподаватель (teacher)
    private String teacher;

    @Column(name = "description", length = 2000) // Описание темы
    private String description;

    @Column(name = "user_id", nullable = false) // Связанный идентификатор пользователя
    private Integer userId;

    private String username;
}