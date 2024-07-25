'use client'
import React from 'react';
import MainSearch from '../searchInput/mainSearch/index';
import { Box, Text, Image } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box position="relative" overflow="hidden" maxH="60vh" >
         <Image
        src="/main-page.jpg"
        alt="Main Page"
        w="100%"
        h="100vh"
        quality={100}
        />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        p="4"
        color="white"
        zIndex="1"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Find Your Nearest Dance Station
        </Text>
        <Box mt="4">
          <MainSearch />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;