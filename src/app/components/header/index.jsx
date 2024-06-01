'use client';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="relative bg-white w-screen h-20 border">
      <Image className="absolute left-8 top-5" src="/dancestations-high-resolution-logo-transparent.png" alt="DanceStations Logo" width={200} height={200} />
    </div>
  );
};

export default Header;