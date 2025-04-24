package ru.isu.taskmanager.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopicSelectionRequest {
    private Integer topicId;
    private Integer userId;
}
