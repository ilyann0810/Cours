package com.example.demo.controller;
import org.springframework.web.bind.annotation .*;

@RestController

public class LoginController {
    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password) {
        if (username.equals("admin") && password.equals("password123")) {
            return "Authentification réussie (200)";
        } else {
            return "Erreur 401 : Identifiants incorrects";
        }
    }
}

