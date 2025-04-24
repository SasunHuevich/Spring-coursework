package ru.isu.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.isu.taskmanager.model.Message;
import ru.isu.taskmanager.security.services.MessageService;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{senderId}/{receiverId}")
    public List<Message> getMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        return messageService.getMessagesBetweenUsers(senderId, receiverId);
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message savedMessage = messageService.sendMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
}
