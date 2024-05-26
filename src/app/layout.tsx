import React from 'react';
import { nunito } from '@/app/ui/fonts';
import { AuthProvider } from '../contexts/authContext';
import "./ui/globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
    </AuthProvider>

  );
}
