package com.aviationparts.admin.controller;

import com.aviationparts.admin.model.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String ADMIN_EMAIL = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@aviationpartsinc.com.br");
    private static final String ADMIN_SENHA = System.getenv().getOrDefault("ADMIN_SENHA", "123456");

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        if (ADMIN_EMAIL.equals(login.getEmail()) && ADMIN_SENHA.equals(login.getSenha())) {
            return ResponseEntity.ok().body("{\"success\":true}");
        } else {
            return ResponseEntity.status(401).body("{\"success\":false,\"message\":\"E-mail ou senha inválidos\"}");
        }
    }
}