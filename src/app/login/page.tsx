/*
import Login from "../components/auth/login"
import React, { ReactElement } from 'react'


export default function Page () {
    return (
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
        <Login />
      </div>
    );
}
*/

import SelectLogin from "../components/selectLogin"

export default function Page () {
    return (
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
          <div>
          <h3 className="text-white text-h2-l font-semibold sm:text-2xl">Login to DanceStations</h3></div>
          <div className="flex-col">
        <SelectLogin userType='dancer'/>
        <SelectLogin userType='studio owner'/>
        </div>
      </div>
    );
}