package com.aviationparts.admin.controller;

import com.aviationparts.admin.model.Avaliacao;
import com.aviationparts.admin.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.PUT, RequestMethod.DELETE})
public class AvaliacaoController {
    @Autowired
    private AvaliacaoRepository repository;

    @GetMapping
    public List<Avaliacao> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Avaliacao salvar(@RequestBody Avaliacao avaliacao) {
        return repository.save(avaliacao);
    }
}
