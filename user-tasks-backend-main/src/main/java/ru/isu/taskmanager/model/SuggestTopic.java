package ru.isu.taskmanager.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "suggesttopic")
public class SuggestTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;


    private String teacher;

    private String description;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(columnDefinition = "varchar(1000) default 'Нет комментария.'")
    private String comment;

    private String username;
}
