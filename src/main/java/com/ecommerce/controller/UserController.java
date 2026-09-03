package com.ecommerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.User;
import com.ecommerce.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
    private UserService us;

    // ── Register ──────────────────────────────────
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return us.registerUser(user);
    }

    // ── Login ─────────────────────────────────────
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {
        String email    = loginData.get("email");
        String password = loginData.get("password");
        return us.loginUser(email, password);
    }
	
}
