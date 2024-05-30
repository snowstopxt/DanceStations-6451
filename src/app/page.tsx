"use client";

import React from 'react';
import Header from '@/app/components/header/index';
import ReactDOM from 'react-dom/client';
/*
import { BrowserRouter } from 'react-router-dom';
import App from '@/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
*/

export default function Home() {
  return (
  <div className="w-full h-screen flex flex-col">
      <Header />
      <div>
        <div>Welcome to the Home Page</div>
        
      </div>
    </div>
  );
};


