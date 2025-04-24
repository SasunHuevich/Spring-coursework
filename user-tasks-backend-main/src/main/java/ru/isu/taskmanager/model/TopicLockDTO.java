package ru.isu.taskmanager.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopicLockDTO {
    private Integer id;
    private String name;
    private String teacher;
    private String description;
    private String username;

}