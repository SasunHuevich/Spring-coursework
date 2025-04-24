package ru.isu.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.isu.taskmanager.model.TopicLock;

@Repository
public interface TopicLockRepository
        extends JpaRepository<TopicLock, Integer>{

    boolean existsByUserId(Integer userId);
    TopicLock findByUserId(Integer userId);

}