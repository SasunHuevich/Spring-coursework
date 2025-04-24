package ru.isu.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.isu.taskmanager.model.TopicFree;
import ru.isu.taskmanager.model.TopicLock;
import ru.isu.taskmanager.model.TopicSelectionRequest;
import ru.isu.taskmanager.model.User;
import ru.isu.taskmanager.repository.TopicFreeRepository;
import ru.isu.taskmanager.repository.UserRepository;
import ru.isu.taskmanager.security.services.TopicFreeService;
import ru.isu.taskmanager.security.services.TopicLockService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TopicLockController {

    @Autowired
    private TopicFreeRepository topicFreeRepository;

    @Autowired
    private TopicFreeService topicFreeService;

    @Autowired
    private TopicLockService topicLockService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/approved-topics")
    public ResponseEntity<List<TopicLock>> getApprovedTopics() {
        List<TopicLock> approvedTopics = topicLockService.getAllApprovedTopics();
        return ResponseEntity.ok(approvedTopics);
    }

    @DeleteMapping("/delete-topic/{id}")
    public ResponseEntity<String> deleteTopic(@PathVariable Integer id) {

        boolean isDeleted = topicLockService.deleteTopicById(id);

        if (isDeleted) {
            return ResponseEntity.ok("Тема успешно удалена.");
        } else {
            return ResponseEntity.status(404).body("Тема не найдена.");
        }
    }


    @PostMapping("/make-free/{topicId}")
    public ResponseEntity<String> makeTopicFree(@PathVariable Integer topicId) {
        // Получаем тему из topiclock
        TopicLock topicLock = topicLockService.getTopicById(topicId);
        if (topicLock == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Тема не найдена.");
        }

        // Создаем новую тему для topicfree
        TopicFree topicFree = new TopicFree();
        topicFree.setName(topicLock.getName());
        topicFree.setTeacher(topicLock.getTeacher());
        topicFree.setDescription(topicLock.getDescription());

        topicFreeService.saveTopic(topicFree);


        topicLockService.deleteTopic(topicId);

        return ResponseEntity.ok("Тема успешно сделана свободной.");
    }


    @GetMapping("/username")
    public ResponseEntity<String> getUsernameById(@PathVariable Integer id) {
        Optional<User> userOpt = userRepository.findById(id);
        System.out.println("KKAL");
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get().getUsername());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользователь не найден");
        }

    }
}
