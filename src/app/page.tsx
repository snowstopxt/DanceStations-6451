import React from 'react';
import Header from './components/header/index';
import Home from './components/home/index';


export default function Page () {
    return (
        <div className="w-full h-screen flex flex-col bg-brand-purple">
            <Header />
            <Home />
            
        </div>
    );
}



