package ru.isu.taskmanager.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.taskmanager.model.SuggestTopic;
import ru.isu.taskmanager.model.TopicLock;
import ru.isu.taskmanager.repository.SuggestTopicRepository;
import ru.isu.taskmanager.repository.TopicLockRepository;

import java.util.Optional;

@Service
public class SuggestTopicService {
    @Autowired
    private SuggestTopicRepository suggestTopicRepository;

    @Autowired
    private TopicLockRepository topicLockRepository;

    public SuggestTopic updateComment(Integer topicId, String comment) throws Exception {
        Optional<SuggestTopic> optionalTopic = suggestTopicRepository.findById(topicId);

        if (optionalTopic.isPresent()) {
            SuggestTopic topic = optionalTopic.get();
            topic.setComment(comment);  // Устанавливаем новый комментарий
            return suggestTopicRepository.save(topic);  // Сохраняем изменения в базе данных
        } else {
            throw new Exception("Тема с ID " + topicId + " не найдена");
        }
    }

    public boolean deleteTopicById(Integer id) {
        if (suggestTopicRepository.existsById(id)) {
            suggestTopicRepository.deleteById(id); // Удаляем тему
            return true; // Возвращаем успех
        }
        return false; // Если тема не найдена
    }

    public void approveAndCopyTopic(Integer topicId) {
        // Извлекаем тему из первой базы данных
        SuggestTopic topic = suggestTopicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Тема не найдена"));


        // Создаем новую сущность для второй базы данных
        TopicLock approvedTopic = new TopicLock();
        approvedTopic.setUsername(topic.getUsername());
        approvedTopic.setName(topic.getName());
        approvedTopic.setTeacher(topic.getTeacher());
        approvedTopic.setDescription(topic.getDescription());
        approvedTopic.setUserId(Math.toIntExact(topic.getUserId()));

        // Сохраняем одобренную тему во второй базе данных
       topicLockRepository.save(approvedTopic);

       deleteTopicById(topicId);
    }
}

