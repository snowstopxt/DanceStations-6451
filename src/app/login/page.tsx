import Login from "../components/auth/login"
import React, { ReactElement } from 'react'


export default function Page () {
    return (
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
        <Login />
      </div>
    );
}
