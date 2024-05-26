'use client';
import Login from "@/app/components/auth/login"
import React, { ReactElement } from 'react'
import { AuthProvider } from "@/contexts/authContext";


const LoginPage = () => {
    return (
        <div className="flex-grow flex items-center justify-center">
        <Login />
      </div>
    );
}

export default LoginPage