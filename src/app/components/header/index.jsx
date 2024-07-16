'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, fetchUserData, doSignOut } from '../../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';
import NavSearch from '../searchInput/navSearch/index';
import { Menu, MenuButton, MenuDivider, MenuList, MenuItem } from '@chakra-ui/react';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);


const fetchName = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setUser(auth.currentUser)
      setDisplayName(auth.currentUser.displayName);
    } else {
      console.log('no user')
    }
  });
}

useEffect(() => {
  fetchName();
},[]);



const handleLogOut = async () => {
  doSignOut();
  setUser(null);
  setDisplayName(null);
  router.push('/login');
  console.log('logged out');

}

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
            
            <Link href="/" className="text-slate-500 hover:text-black text-1.125rem" >Home</Link>
            <Link href="/" className="text-slate-500 hover:text-black text-1.125rem" >My Chats</Link>
            <Link href="/viewBookings" className="text-slate-500 hover:text-black text-h3-l" >My Bookings</Link>
            {!user && <Link href="/login" className="text-slate-500 hover:text-black text-h3-l" > Login</Link>}
            {user && 
                <Menu>
                <MenuButton textColor='gray.500' hover='black' fontSize="lg">{displayName}</MenuButton>
                <MenuList >
                  <MenuItem  as='a' href='/viewBookings' textColor='gray.500' fontSize="lg" hover="black">
                    My Bookings
                  </MenuItem>
                  <MenuItem as='a' href='/' textColor='gray.500' fontSize="lg" hover="black">
                    My Chats
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as='button' onClick={handleLogOut} textColor='gray.500' fontSize="lg" hover="black">
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>}
        </div>
      </div>
    )}
    </div>
    </div>
    </nav>
  );
};

export default Header;