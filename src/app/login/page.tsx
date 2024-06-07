import Login from "../components/auth/login"
import React, { ReactElement } from 'react'


const LoginPage = () => {
    return (
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
        <Login />
      </div>
    );
}

export default LoginPage