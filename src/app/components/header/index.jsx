'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
// import { Link } from '@chakra-ui/next-js';
import { auth, doSignOut } from '../../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';
import NavSearch from '../searchInput/navSearch/index';
import { Box, Flex, IconButton, Link, HStack, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useBreakpointValue } from '@chakra-ui/react';


const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });


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
}, []);



const handleLogOut = async () => {
  console.log('logging out')
  doSignOut();
  setUser(null);
  setDisplayName(null);
  router.push('/login');

}

return (
  <Box bg="white" borderBottom="1px solid" borderColor="gray.200">
    <Flex
      mx="auto"
      px={{ base: 4, sm: 6, lg: 8 }}
      align="center"
      justify="space-between"
      h="20"
    >
      <Flex align="center">
        <Link href="/">
          <Image
            src="/logo-transparent.png"
            alt="DanceStations Logo"
            width={200}
            height={200}
            position="absolute"
            left={8}
            top={5}
          />
        </Link>
      </Flex>

      {!isMobile && pathname !== '/login' && pathname !== '/register' && pathname !== '/' && (
        <Box>
          <NavSearch />
        </Box>
      )}

      {!isMobile && pathname !== '/login' && pathname !== '/register' && (
        <Flex ml={4} align="center" padding={10}>
          <HStack spacing={4}>
          <Link href="/" color="gray.500" _hover={{ color: "black" }}>Home</Link>
          <Link href="/" color="gray.500" _hover={{ color: "black" }}>My Chats</Link>
          <Link href="/viewBookings" color="gray.500" _hover={{ color: "black" }}>My Bookings</Link>
          {!user ? (
            <Link href="/login" color="gray.500" _hover={{ color: "black" }}>Login</Link>
          ) : (
              <Menu position='absolute'>
              <MenuButton textColor='gray.500' hover='black' fontSize="lg">{displayName}</MenuButton>
              <MenuList >
                <MenuItem  as='a' href='/viewBookings' textColor='gray.500' fontSize="lg" hover="black">
                  My Bookings
                </MenuItem>
                <MenuItem as='a' href='/chat' textColor='gray.500' fontSize="lg" hover="black">
                  My Chats
                </MenuItem>
                <MenuDivider />
                <MenuItem as='button' onClick={handleLogOut} textColor='gray.500' fontSize="lg" hover="black">
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          </HStack>
        </Flex>
      )}
    </Flex>
  </Box>
);

  // return (
  //   <nav className="bg-white border"> 
  //   <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
  //     <div className="flex items-center justify-between h-20">
  //       <div className="flex items-center">
  //         <div className="flex-shrink-0">
  //           <Link href="/">
  //           <Image className="absolute left-8 top-5" src="/logo-transparent.png" alt="DanceStations Logo" width={200} height={200}/> 
  //           </Link>
  //         </div>
  //       </div>
  //     {pathname !== '/login' && pathname !== '/register'&& pathname != '/' && <div className=""><NavSearch /></div>}
  //     {pathname !== '/login' && pathname !== '/register' && (
  //     <div className="hidden md:block">
  //       <div className="ml-4 flex items-center space-x-4">
  //         <Link href="/" color="gray.500" _hover={{color: "black"}}>Home</Link>
  //           <Link href="/" color="gray.500" _hover={{color: "black"}} >My Chats</Link>
  //           <Link href="/viewBookings" color="gray.500" _hover={{color: "black"}}>My Bookings</Link>
  //           {!user && <Link href="/login" color="gray.500" _hover={{color: "black"}}> Login</Link>}
  //           {user && 
  //               <Menu>
  //               <MenuButton textColor='gray.500' hover='black' fontSize="lg">{displayName}</MenuButton>
  //               <MenuList >
  //                 <MenuItem  as='a' href='/viewBookings' textColor='gray.500' fontSize="lg" hover="black">
  //                   My Bookings
  //                 </MenuItem>
  //                 <MenuItem as='a' href='/' textColor='gray.500' fontSize="lg" hover="black">
  //                   My Chats
  //                 </MenuItem>
  //                 <MenuDivider />
  //                 <MenuItem as='button' onClick={handleLogOut} textColor='gray.500' fontSize="lg" hover="black">
  //                   Log out
  //                 </MenuItem>
  //               </MenuList>
  //             </Menu>}
  //       </div>
  //     </div>
  //   )}
  //   </div>
  //   </div>
  //   </nav>
  // );
};

export default Header;