package ru.isu.taskmanager.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.taskmanager.model.User;
import ru.isu.taskmanager.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String getUsernameById(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        return (user != null) ? user.getUsername() : null; // Вернём null, если пользователь не найден
    }
}