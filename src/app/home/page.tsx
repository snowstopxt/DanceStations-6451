import React from 'react';
import Header from '../components/header/index';
import Home from '../components/home/index';

const HomePage = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <Home />
        </div>
    );
}