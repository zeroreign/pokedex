import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import PokemonAPIProvider from "@/components/PokemonAPIProvider";
import Image from "next/image";

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
        <body>
          <div className="absolute inset-0 z-0">
          <Image
            src="/background1.jpg"
            alt="Background Scene"
            quality={100}
            fill
            sizes="100vw"
            className={"object-cover"}
            priority={true}
          />
          {children}
          </div>
        </body>
      </PokemonAPIProvider>
    </html>
  );
}
