package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo ur;
	
	public String registerUser(User user) {
		
		if (ur.existsByEmail(user.getEmail())) {
            return "Email already registered!";
        }
		
		user.setRole("USER");
		
		ur.save(user);
        return "User registered successfully!";
	}
	
	public String loginUser(String email, String password) {
        User user = ur.findByEmail(email).orElse(null);

        if (user == null) {
            return "Email not found!";
        }

        if (!user.getPassword().equals(password)) {
            return "Wrong password!";
        }

        return "Login successful!";
    }
	
	public User getUserByEmail(String email) {
        return ur.findByEmail(email).orElse(null);
    }

}
