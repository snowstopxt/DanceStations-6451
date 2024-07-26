import React from 'react';
import type { Metadata } from 'next'
import { AuthProvider } from '../contexts/authContext';
import "./global.css";
import { Nunito } from "next/font/google";
import { ChakraProviders } from './chakra/chakra';


const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DanceStations",
  description: "DanceStations is created by next app"
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
          <ChakraProviders><AuthProvider>{children}</AuthProvider></ChakraProviders>
      </body>
    </html>
    
  );
}
