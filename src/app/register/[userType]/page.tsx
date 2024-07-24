import Register from "../../components/auth/register";
import React, { ReactElement } from 'react'

export default function Page ({params} : {params: {userType: string}}) {
    return (
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
        <Register userType = {params.userType} />
      </div>
    );
}