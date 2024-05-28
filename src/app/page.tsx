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

const HomePage = () => {
  return (
  <div className="w-full h-screen flex flex-col">
      <Header />
      <div>
        <h1>Welcome to the Home Page</h1>
        {/* You can add more content here if needed */}
      </div>
    </div>
  );
};

export default HomePage;
