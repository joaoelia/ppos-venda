"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Avaliacao {
  cliente: string;
  email: string;
  pedido: string;
  categoria: string;
  notaGeral: number;
  comentario: string;
  recomenda: boolean;
  data: string;
  status: string;
}

export default function AvaliacaoPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nomeCliente: "",
    email: "",
    numeroPedido: "",
    categoria: "",
    notaGeral: 0,
    notaAtendimento: 0,
    notaProduto: 0,
    notaEntrega: 0,
    comentarios: "",
    recomendaria: false,
  });

  const StarRating = ({
    rating,
    onRatingChange,
    label,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    label: string;
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className="transition-colors"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Monta o payload com os nomes em snake_case, igual ao modelo Java e à tabela
    const avaliacao = {
      nome_cliente: formData.nomeCliente,
      email: formData.email,
      nota_geral: formData.notaGeral,
      nota_atendimento: formData.notaAtendimento,
      nota_produto: formData.notaProduto,
      nota_entrega: formData.notaEntrega,
      comentarios: formData.comentarios,
      recomendaria: formData.recomendaria,
      data_avaliacao: new Date().toISOString().slice(0, 10),
      status: formData.notaGeral >= 4 ? "POSITIVA" : formData.notaGeral <= 2 ? "NEGATIVA" : "NEUTRA"
    };

  fetch("https://ppos-venda-back.onrender.com/api/avaliacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avaliacao),
    }).then(() => {
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Avaliação Enviada!
            </CardTitle>
            <CardDescription>
              Obrigado pelo seu feedback. Sua opinião é muito importante para
              nós.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Voltar ao Início</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Avaliação de Pós-Venda Aviation Parts Inc.
            </CardTitle>
            <CardDescription>
              Sua opinião nos ajuda a melhorar nossos produtos e serviços
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    required
                    value={formData.nomeCliente}
                    onChange={(e) =>
                      setFormData({ ...formData, nomeCliente: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* Removido Número do Pedido e Categoria do Produto */}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Avalie sua experiência
                </h3>

                <StarRating
                  rating={formData.notaGeral}
                  onRatingChange={(rating) =>
                    setFormData({ ...formData, notaGeral: rating })
                  }
                  label="Avaliação Geral"
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <StarRating
                    rating={formData.notaAtendimento}
                    onRatingChange={(rating) =>
                      setFormData({ ...formData, notaAtendimento: rating })
                    }
                    label="Atendimento"
                  />
                  <StarRating
                    rating={formData.notaProduto}
                    onRatingChange={(rating) =>
                      setFormData({ ...formData, notaProduto: rating })
                    }
                    label="Qualidade do Produto"
                  />
                  <StarRating
                    rating={formData.notaEntrega}
                    onRatingChange={(rating) =>
                      setFormData({ ...formData, notaEntrega: rating })
                    }
                    label="Entrega"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentários Adicionais</Label>
                <Textarea
                  id="comentarios"
                  placeholder="Conte-nos mais sobre sua experiência..."
                  value={formData.comentarios}
                  onChange={(e) =>
                    setFormData({ ...formData, comentarios: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="recomendaria"
                  checked={formData.recomendaria}
                  onChange={(e) =>
                    setFormData({ ...formData, recomendaria: e.target.checked })
                  }
                  className="rounded"
                />
                <Label htmlFor="recomendaria">
                  Recomendaria nossa empresa para outros?
                </Label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Enviar Avaliação
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
