"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })
      if (res.ok) {
        localStorage.setItem("adminLogged", "true")
        router.push("/admin")
      } else {
        setErro("E-mail ou senha inválidos")
      }
    } catch (err) {
      setErro("Erro ao conectar com o servidor")
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#f5faff",
        backgroundImage: "url('/aviation-icon-login.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      {/* Seta e link no topo */}
      <div className="absolute top-6 left-6 flex items-center">
        <Link href="/" className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar à página inicial
        </Link>
      </div>
      <div className="relative w-full max-w-sm">
        <form
          onSubmit={handleLogin}
          className="relative bg-white p-8 rounded shadow-md w-full"
          style={{ zIndex: 1 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Aviation Parts Inc.</h2>
          {erro && <div className="text-red-600 mb-4 text-center">{erro}</div>}
          <Input
            placeholder="E-mail"
            type="email"
            className="mb-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Senha"
            type="password"
            className="mb-6"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <Button type="submit" className="w-full mb-2">Entrar</Button>
        </form>
      </div>
    </div>
  )
}