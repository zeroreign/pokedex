import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import PokemonAPIProvider from "@/components/PokemonAPIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex App",
  description: "Example Pokedex App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PokemonAPIProvider>
        <body>{children}</body>
      </PokemonAPIProvider>
    </html>
  );
}
