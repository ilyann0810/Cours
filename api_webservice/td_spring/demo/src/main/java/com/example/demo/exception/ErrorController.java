


package com.example.demo.exception;

import org.springframework.http.HttpStatus ;
import org.springframework.web.bind.annotation .*;
import org.springframework.web.server.ResponseStatusException ;


@RestController
@RequestMapping("/error-demo")
public class ErrorController {
    @GetMapping("/{code}")
    public String simulateError(@PathVariable int code) {
        switch (code) {
            case 400:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Requête invalide");
            case 404:
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ressource non trouvée");
            case 500:
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur interne du serveur");
            default:
                return "Aucune erreur";
        }
    }

    @ExceptionHandler(ResponseStatusException.class)
    public String handle(ResponseStatusException ex) {
        return "Erreur " + ex.getStatusCode().value() + " : " + ex.getReason();
    }
}