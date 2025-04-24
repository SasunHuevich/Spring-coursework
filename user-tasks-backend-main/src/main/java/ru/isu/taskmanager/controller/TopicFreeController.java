package ru.isu.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.isu.taskmanager.model.TopicFree;
import ru.isu.taskmanager.model.TopicLock;
import ru.isu.taskmanager.model.TopicSelectionRequest;
import ru.isu.taskmanager.repository.TopicFreeRepository;
import ru.isu.taskmanager.security.services.TopicFreeService;
import ru.isu.taskmanager.security.services.TopicLockService;
import ru.isu.taskmanager.security.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TopicFreeController {

    @Autowired
    private TopicFreeRepository topicFreeRepository;

    @Autowired
    private TopicFreeService topicFreeService;

    @Autowired
    private TopicLockService topicLockService;

    @Autowired
    private UserService userService;

    @GetMapping("/topicfree")
    public ResponseEntity<List<TopicFree>> getAllFreeTopics() {
        List<TopicFree> topicfree = topicFreeRepository.findAll();
        return ResponseEntity.ok(topicfree);
    }



    // Добавление новой темы
    @PostMapping("/add")
    public ResponseEntity<TopicFree> addTopic(@RequestBody TopicFree newTopic) {
        TopicFree createdTopic = topicFreeService.addTopic(newTopic);
        return ResponseEntity.ok(createdTopic);
    }


    // Удаление темы
    @DeleteMapping("/delete/{topicId}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Integer topicId) {
        topicFreeService.deleteTopic(topicId);
        return ResponseEntity.ok().build();
    }

    // Выбор темы
    @PostMapping("/select")
    public ResponseEntity<String> selectTopic(@RequestBody TopicSelectionRequest request){
        TopicFree selectedTopic = topicFreeService.getTopicById(request.getTopicId());

        if (topicLockService.isTopicSelectedByUser(request.getUserId())) {
            return new ResponseEntity<>("Вы уже выбрали тему!", HttpStatus.CONFLICT);
        }

        TopicLock topicLock = new TopicLock();
        topicLock.setName(selectedTopic.getName());
        topicLock.setTeacher(selectedTopic.getTeacher());
        topicLock.setDescription(selectedTopic.getDescription());
        topicLock.setUserId(request.getUserId());
        topicLock.setUsername(userService.getUsernameById(request.getUserId()));

        topicLockService.addTopicLock(topicLock);

        topicFreeService.deleteTopic(request.getTopicId());

        return new ResponseEntity<>("Тема успешно выбрана", HttpStatus.OK);
    }

}
