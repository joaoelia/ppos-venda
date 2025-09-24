import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pós-venda Aviation Parts inc.',
  description: 'Created with vscode and Next.js',
  icons: {
    icon: '/aviation-icon.png', // Caminho relativo à pasta public
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}