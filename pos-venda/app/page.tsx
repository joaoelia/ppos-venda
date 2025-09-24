"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Star, Users, BarChart3, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistema de Pós-Venda Aviation Parts Inc.</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie avaliações de clientes e monitore a satisfação do seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Área do Cliente</CardTitle>
              <CardDescription>Avalie sua experiência de compra e nos ajude a melhorar</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/avaliacao">
                <Button size="lg" className="w-full">
                  Fazer Avaliação
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Área Administrativa</CardTitle>
              <CardDescription>Visualize avaliações e gere relatórios detalhados</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/admin/login">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  Acessar Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fácil para Clientes</h3>
            <p className="text-gray-600">Interface intuitiva para avaliações rápidas</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Analytics Completo</h3>
            <p className="text-gray-600">Visualize tendências e métricas importantes</p>
          </div>
          <div className="text-center">
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Relatórios Detalhados</h3>
            <p className="text-gray-600">Exporte dados para análise aprofundada</p>
          </div>
        </div>
      </div>
    </div>
  )
}
