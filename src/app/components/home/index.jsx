import React from 'react';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[700px] relative w-full">
        <Image 
            src="/main-page.jpg"
            alt="Main Page"
            fill={true}
            quality={100}
            priority
        />
      <div className="absolute text-h1-l text-white">Find Your Nearest Dance Station</div>
    </div>
  );
};

export default Home;