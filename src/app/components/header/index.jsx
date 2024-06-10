'use client';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';
import NavSearch from '../searchInput/navSearch/index';

const Header = () => {
  const pathname = usePathname();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDisplayName(user.displayName);
    } else {
      setDisplayName(null);
    }
  });

  return (
    <nav className="bg-white border"> 
    <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex basis-1/6 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
            <Image className="absolute left-8 top-5" src="/logo-transparent.png" alt="DanceStations Logo" width={200} height={200}/> 
            </Link>
          </div>
        </div>
      {pathname !== '/login' && pathname !== '/register'&& pathname != '/' && <div className=""><NavSearch /></div>}
      {pathname !== '/login' && pathname !== '/register' && (
      <div className="hidden md:block">
        <div className="ml-4 flex items-center space-x-4">
            
            <Link href="/" className="text-slate-500 hover:text-black text-h3-l" >Home</Link>
            <Link href="/" className="text-slate-500 hover:text-black text-h3-l" >My Chats</Link>
            <Link href="/" className="text-slate-500 hover:text-black text-h3-l" >My Bookings</Link>
            {!user && <Link href="/login" className="text-slate-500 hover:text-black text-h3-l" > Login</Link>}
            {user && <Link href="/" className="text-slate-500 hover:text-black text-h3-l" >{user.displayName}</Link>}
        </div>
      </div>
    )}
    </div>
    </div>
    </nav>
  );
};

export default Header;