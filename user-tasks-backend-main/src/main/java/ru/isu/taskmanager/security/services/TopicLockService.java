package ru.isu.taskmanager.security.services;

import org.springframework.stereotype.Service;
import ru.isu.taskmanager.model.TopicLock;
import ru.isu.taskmanager.repository.TopicLockRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TopicLockService {

    private final TopicLockRepository topicLockRepository;

    public TopicLockService(TopicLockRepository topicLockRepository) {
        this.topicLockRepository = topicLockRepository;
    }

    public TopicLock addTopicLock(TopicLock topicLock) {
        return topicLockRepository.save(topicLock);
    }

    // Проверка, выбрал ли студент тему
    public boolean isTopicSelectedByUser(Integer userId) {
        return topicLockRepository.existsByUserId(userId);
    }

    public TopicLock getSelectedTopicByUserId(Integer userId) {
        return topicLockRepository.findByUserId(userId); // Предполагаем, что этот метод реализован в репозитории
    }

    public TopicLock getTopicById(Integer id) {
        Optional<TopicLock> optionalTopicLock = topicLockRepository.findById(id);
        return optionalTopicLock.orElse(null); // Вернёт TopicLock или null, если не найдено
    }

    public void deleteTopic(Integer topicId) {
       topicLockRepository.deleteById(topicId);
    }

    public List<TopicLock> getAllApprovedTopics() {
        return topicLockRepository.findAll(); // Предполагается, что метод findAll() возвращает все записи
    }

    public boolean deleteTopicById(Integer id) {
        if (topicLockRepository.existsById(id)) {
            topicLockRepository.deleteById(id); // Удаляем тему
            return true; // Возвращаем успех
        }
        return false; // Если тема не найдена
    }

}