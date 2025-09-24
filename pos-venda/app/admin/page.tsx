"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Download, Search, ArrowLeft, TrendingUp, Users, MessageSquare } from "lucide-react"
import Link from "next/link"
// Adicione a importação do jsPDF
import jsPDF from "jspdf"

interface Avaliacao {
  id: number
  nome_cliente: string
  email: string
  nota_geral: number
  nota_atendimento: number
  nota_produto: number
  nota_entrega: number
  comentarios: string
  recomendaria: number
  data_avaliacao: string
  status: string
}

export default function AdminPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [filteredAvaliacoes, setFilteredAvaliacoes] = useState<Avaliacao[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  // Removido o filtro de categoria
  const [filterNota, setFilterNota] = useState("todas")

  useEffect(() => {
  fetch("http://localhost:8080/api/avaliacoes")
      .then(res => res.json())
      .then(data => {
        // Mapeia os campos do backend para o formato esperado pelo frontend
        const mapped = data.map((av: any) => ({
          id: av.id,
          nome_cliente: av.nome_cliente,
          email: av.email,
          nota_geral: av.nota_geral,
          nota_atendimento: av.nota_atendimento,
          nota_produto: av.nota_produto,
          nota_entrega: av.nota_entrega,
          comentarios: av.comentarios,
          recomendaria: av.recomendaria,
          data_avaliacao: av.data_avaliacao,
          status: av.status,
        }))
        setAvaliacoes(mapped)
        setFilteredAvaliacoes(mapped)
      })
  }, [])

  useEffect(() => {
    let filtered = avaliacoes

    if (searchTerm) {
      filtered = filtered.filter(
        (av) =>
          av.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          av.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Removido filtro de categoria

    if (filterNota !== "todas") {
      if (filterNota === "positivas") {
        filtered = filtered.filter((av) => av.nota_geral >= 4)
      } else if (filterNota === "negativas") {
        filtered = filtered.filter((av) => av.nota_geral <= 2)
      }
    }

    setFilteredAvaliacoes(filtered)
  }, [searchTerm, filterNota, avaliacoes])

  const StarDisplay = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const getStatusBadge = (nota: number) => {
  if (nota >= 4) return <Badge className="bg-green-100 text-green-800">Positiva</Badge>
  if (nota <= 2) return <Badge className="bg-red-100 text-red-800">Negativa</Badge>
  return <Badge className="bg-yellow-100 text-yellow-800">Neutra</Badge>
  }

  // Nova função para gerar PDF
  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Avaliações", 14, 16);
    doc.setFontSize(12);

    let y = 30;
    filteredAvaliacoes.forEach((a, i) => {
      doc.text(
        `Cliente: ${a.nome_cliente} | Nota: ${a.nota_geral} | Recomenda: ${a.recomendaria ? "Sim" : "Não"}`,
        14,
        y
      );
      y += 8;
      if (a.comentarios) {
        doc.text(`Comentário: ${a.comentarios}`, 14, y);
        y += 8;
      }
      y += 2;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("relatorio-avaliacoes.pdf");
  }

  const stats = {
    total: avaliacoes.length,
    mediaGeral:
      avaliacoes.length > 0
        ? (avaliacoes.reduce((acc, av) => acc + av.nota_geral, 0) / avaliacoes.length).toFixed(1)
        : "0",
    positivas: avaliacoes.filter((av) => av.nota_geral >= 4).length,
    negativas: avaliacoes.filter((av) => av.nota_geral <= 2).length,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gerencie e analise as avaliações dos clientes</p>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mediaGeral}</div>
              <div className="flex mt-1">
                <StarDisplay rating={Math.round(Number.parseFloat(stats.mediaGeral))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Positivas</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.positivas}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? ((stats.positivas / stats.total) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Negativas</CardTitle>
              <MessageSquare className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.negativas}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? ((stats.negativas / stats.total) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros e Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Removido filtro de categoria */}
              <div />

              <Select value={filterNota} onValueChange={setFilterNota}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por nota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Notas</SelectItem>
                  <SelectItem value="positivas">Positivas (4-5 estrelas)</SelectItem>
                  <SelectItem value="negativas">Negativas (1-2 estrelas)</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={generateReport} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Avaliações */}
        <Card>
          <CardHeader>
            <CardTitle>Avaliações dos Clientes</CardTitle>
            <CardDescription>
              {filteredAvaliacoes.length} de {avaliacoes.length} avaliações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Nota Geral</TableHead>
                    <TableHead>Atendimento</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Entrega</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recomenda</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Comentários</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAvaliacoes.map((avaliacao) => (
                    <TableRow key={avaliacao.id}>
                      <TableCell>
                        <div className="font-medium">{avaliacao.nome_cliente}</div>
                      </TableCell>
                      <TableCell>{avaliacao.email}</TableCell>
                      <TableCell>
                        <StarDisplay rating={avaliacao.nota_geral} />
                      </TableCell>
                      <TableCell>
                        <StarDisplay rating={avaliacao.nota_atendimento} />
                      </TableCell>
                      <TableCell>
                        <StarDisplay rating={avaliacao.nota_produto} />
                      </TableCell>
                      <TableCell>
                        <StarDisplay rating={avaliacao.nota_entrega} />
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          avaliacao.status === "POSITIVA" ? "bg-green-100 text-green-800" :
                          avaliacao.status === "NEGATIVA" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>{avaliacao.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {avaliacao.recomendaria ? (
                          <Badge className="bg-green-100 text-green-800">Sim</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Não</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(avaliacao.data_avaliacao).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate text-sm" title={avaliacao.comentarios}>
                          {avaliacao.comentarios || "Sem comentários"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAvaliacoes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma avaliação encontrada com os filtros aplicados.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}