package ru.isu.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.taskmanager.model.User;
import ru.isu.taskmanager.security.services.UserDetailsServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userService; // Сервис для работы с пользователями

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        System.out.println(id);
        Optional<User> user = userService.getUserById(id); // Предполагаем, что у вас есть метод в сервисе
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK); // Return user if present
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if user is not found
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("GGAGA");
        try {
            List<User> users = userService.getAllUsers(); // Получаем всех пользователей из сервиса
            return new ResponseEntity<>(users, HttpStatus.OK); // Возвращаем список пользователей с кодом 200
        } catch (Exception e) {
            // Логируем ошибку и возвращаем ошибку 500
            System.err.println("Ошибка при получении пользователей: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}