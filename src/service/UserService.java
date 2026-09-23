package service;

import model.User;

import java.util.HashMap;
import java.util.Map;

public class UserService {

    private final Map<String, User> users;

    public UserService() {
        users = new HashMap<>();
    }

    public boolean addUser(User user) {

        if (user == null) {
            return false;
        }

        if (users.containsKey(user.getUserId())) {
            return false;
        }

        users.put(user.getUserId(), user);

        return true;
    }

    public User findUserById(String userId) {
        return users.get(userId);
    }

    public boolean userExists(String userId) {
        return users.containsKey(userId);
    }

    public int getUserCount() {
        return users.size();
    }
}