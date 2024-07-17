import Register from "../../components/auth/register"
import React, { ReactElement } from 'react'


export default function Page ({params} : {params: {userType: string}}) {
    return (
        <div className="flex-grow bg-brand-purple flex items-center justify-center ">
        <Register userType={params.userType} />
      </div>
    );
}
