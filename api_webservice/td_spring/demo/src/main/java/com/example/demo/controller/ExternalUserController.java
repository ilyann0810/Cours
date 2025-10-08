package com.example.demo.controller;
import org.springframework.web.bind.annotation .*;
import org.springframework.web.client.RestTemplate ;
import org.springframework.http.ResponseEntity ;


@RestController

public class ExternalUserController {

    @GetMapping("/external-users")
    public String getExternalUsers() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://jsonplaceholder.typicode.com/users";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}

