package ru.isu.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.isu.taskmanager.model.SuggestTopic;
import ru.isu.taskmanager.model.TopicFree;
import ru.isu.taskmanager.model.TopicLock;
import ru.isu.taskmanager.model.TopicSelectionRequest;
import ru.isu.taskmanager.repository.SuggestTopicRepository;
import ru.isu.taskmanager.security.services.SuggestTopicService;
import ru.isu.taskmanager.security.services.TopicFreeService;
import ru.isu.taskmanager.security.services.TopicLockService;
import ru.isu.taskmanager.security.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api") // Базовый путь для запросов
@CrossOrigin(origins = "*", maxAge = 3600)
public class SuggestTopicController {

    @Autowired
    private SuggestTopicRepository SuggesttopicRepository;

    @Autowired
    private TopicLockService topicLockService;

    @Autowired
    private TopicFreeService topicFreeService;

    @Autowired
    private SuggestTopicService suggestTopicService;

    @Autowired
    private UserService userService;

    //Получение всех предложенных тем
    @GetMapping("/suggested-topics")
    public List<SuggestTopic> getSuggestedTopics() {
        return SuggesttopicRepository.findAll();
    }

    // Предложение новой темы
    @PostMapping("/suggest-topic")
    public ResponseEntity<SuggestTopic> suggestTopic(@RequestBody SuggestTopic suggestTopic) {
        suggestTopic.setComment("Нет комментария.");
        suggestTopic.setUsername(userService.getUsernameById(suggestTopic.getUserId()));
        System.out.println("SASUN");
        SuggestTopic savedTopic = SuggesttopicRepository.save(suggestTopic);
        return ResponseEntity.ok(savedTopic);
    }


    @GetMapping("/selected-topic/{userId}")
    public ResponseEntity<TopicLock> getSelectedTopic(@PathVariable Integer userId) {
        TopicLock selectedTopic = topicLockService.getSelectedTopicByUserId(userId);
        if (selectedTopic != null) {
            return ResponseEntity.ok(selectedTopic);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Выбор темы
    @PostMapping("/reject-topic")
    public ResponseEntity<String> rejectTopic(@RequestBody Integer topicId) {
        TopicLock selectedTopic = topicLockService.getTopicById(topicId);


        TopicFree newTopicFree = new TopicFree();
        newTopicFree.setName(selectedTopic.getName());
        newTopicFree.setTeacher(selectedTopic.getTeacher());
        newTopicFree.setDescription(selectedTopic.getDescription());

        topicFreeService.addTopic(newTopicFree);

        topicLockService.deleteTopic(topicId);


        return new ResponseEntity<>("Тема успешно выбрана", HttpStatus.OK);
    }

    @PostMapping("/submit-comment/{topicId}")
    public ResponseEntity<String> submitComment(@PathVariable Integer topicId, @RequestBody String comment) {
        try {
            SuggestTopic updatedTopic = suggestTopicService.updateComment(topicId, comment);
            return ResponseEntity.ok("Комментарий успешно сохранен для темы: " + updatedTopic.getName());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Ошибка: " + e.getMessage());
        }

    }
        // Одобрение темы
    @PostMapping("/approve-topic/{topicId}")
    public ResponseEntity<Void> approveTopic(@PathVariable Integer topicId) {
        try {
           suggestTopicService.approveAndCopyTopic(topicId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}