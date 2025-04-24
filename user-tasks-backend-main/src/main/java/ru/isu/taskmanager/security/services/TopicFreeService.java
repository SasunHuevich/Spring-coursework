package ru.isu.taskmanager.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.taskmanager.model.TopicFree;
import ru.isu.taskmanager.repository.TopicFreeRepository;

import java.util.List;

@Service
public class TopicFreeService {

    @Autowired
    private TopicFreeRepository topicFreeRepository; // Репозиторий для работы с данными

    // Получение всех свободных тем
    public List<TopicFree> getAllFreeTopics() {
        return topicFreeRepository.findAll();
    }

    // Добавление новой темы
    public TopicFree addTopic(TopicFree newTopic) {
        return topicFreeRepository.save(newTopic);
    }

    // Удаление темы
    public void deleteTopic(Integer topicId) {
        topicFreeRepository.deleteById(topicId);
    }

    public TopicFree getTopicById(Integer id) {
        return topicFreeRepository.findById(id).orElse(null);
    }

    public void saveTopic(TopicFree topicFree) {
        topicFreeRepository.save(topicFree);
    }
}
