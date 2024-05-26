import React from 'react';
import Header from '@/app/components/header/index';

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
