package com.studenthelpdesk.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.studenthelpdesk.exception.DuplicateResourceException;
import com.studenthelpdesk.exception.ResourceNotFoundException;
import com.studenthelpdesk.model.User;
import com.studenthelpdesk.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {

        String email = normalizeEmail(
                user.getEmail()
        );

        user.setEmail(email);

        if (userRepository.existsByEmailIgnoreCase(email)) {

            throw new DuplicateResourceException(
                    "A student with this email already exists"
            );
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);
    }

    public User updateUser(
            Long id,
            User updatedUser) {

        User existingUser =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found with id: " + id
                                )
                        );

        String email = normalizeEmail(
                updatedUser.getEmail()
        );

        Optional<User> userWithSameEmail =
                userRepository.findByEmailIgnoreCase(
                        email
                );

        if (userWithSameEmail.isPresent()
                && !userWithSameEmail.get()
                        .getId()
                        .equals(id)) {

            throw new DuplicateResourceException(
                    "A student with this email already exists"
            );
        }

        existingUser.setName(
                updatedUser.getName()
        );

        existingUser.setEmail(email);

        return userRepository.save(
                existingUser
        );
    }

    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {

            throw new ResourceNotFoundException(
                    "User not found with id: " + id
            );
        }

        userRepository.deleteById(id);
    }

    private String normalizeEmail(String email) {

        if (email == null) {
            return null;
        }

        return email.trim().toLowerCase();
    }
}