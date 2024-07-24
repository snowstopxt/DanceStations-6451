import React from 'react';
import Image from 'next/image';
import MainSearch from '../searchInput/mainSearch/index';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[700px] relative w-full" style={{ position: 'relative' }}>
        <Image 
            src="/main-page.jpg"
            alt="Main Page"
            fill={true}
            quality={100}
            priority
            object-fit='cover'
        />
      <div className="inline-flex flex-col">
        <div className="relative float-left text-h1-l text-white">Find Your Nearest Dance Station</div>
        <div><MainSearch /></div>
      </div>  
    </div>
  );
};

export default Home;