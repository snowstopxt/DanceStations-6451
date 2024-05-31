import Register from "@/app/components/auth/register"
import React, { ReactElement } from 'react'
import { AuthProvider } from "@/contexts/authContext";


const RegisterPage = () => {
    return (
        <div className="flex-grow bg-brand-purple flex items-center justify-center ">
        <Register />
      </div>
    );
}

export default RegisterPage