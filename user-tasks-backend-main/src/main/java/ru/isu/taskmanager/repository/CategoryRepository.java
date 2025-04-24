package ru.isu.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.isu.taskmanager.model.TopicFree;

@Repository
public interface CategoryRepository 
        extends JpaRepository<TopicFree, Integer>{
    
}
