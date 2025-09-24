package com.aviationparts.admin.model;

import jakarta.persistence.*;

@Entity
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_cliente")
    private String nome_cliente;

    @Column(name = "email")
    private String email;

    @Column(name = "nota_geral")
    private int nota_geral;

    @Column(name = "nota_atendimento")
    private int nota_atendimento;

    @Column(name = "nota_produto")
    private int nota_produto;

    @Column(name = "nota_entrega")
    private int nota_entrega;

    @Column(name = "comentarios")
    private String comentarios;

    @Column(name = "recomendaria")
    private boolean recomendaria;

    @Column(name = "data_avaliacao")
    private String data_avaliacao;

    @Column(name = "status")
    private String status;

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome_cliente() { return nome_cliente; }
    public void setNome_cliente(String nome_cliente) { this.nome_cliente = nome_cliente; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getNota_geral() { return nota_geral; }
    public void setNota_geral(int nota_geral) { this.nota_geral = nota_geral; }

    public int getNota_atendimento() { return nota_atendimento; }
    public void setNota_atendimento(int nota_atendimento) { this.nota_atendimento = nota_atendimento; }

    public int getNota_produto() { return nota_produto; }
    public void setNota_produto(int nota_produto) { this.nota_produto = nota_produto; }

    public int getNota_entrega() { return nota_entrega; }
    public void setNota_entrega(int nota_entrega) { this.nota_entrega = nota_entrega; }

    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }

    public boolean isRecomendaria() { return recomendaria; }
    public void setRecomendaria(boolean recomendaria) { this.recomendaria = recomendaria; }

    public String getData_avaliacao() { return data_avaliacao; }
    public void setData_avaliacao(String data_avaliacao) { this.data_avaliacao = data_avaliacao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
