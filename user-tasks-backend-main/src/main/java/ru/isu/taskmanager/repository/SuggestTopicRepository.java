package ru.isu.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.isu.taskmanager.model.SuggestTopic;


@Repository
public interface SuggestTopicRepository
        extends JpaRepository<SuggestTopic, Integer>{

}