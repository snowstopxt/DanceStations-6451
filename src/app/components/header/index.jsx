'use client';

import React from 'react';
import { useAuth } from '../../../contexts/authContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="header bg-white items-center relative w-full h-[74px]" >
      <div>My App</div>
      {user && <div> Hello, {user.username}! </div> /* Add navigation or other header elements here */}
    </div>
  );
};

export default Header;