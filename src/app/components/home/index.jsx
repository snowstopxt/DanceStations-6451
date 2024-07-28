'use client'
import React from 'react';
import MainSearch from '../searchInput/mainSearch/index';
import { Box, Text, Image } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box position="relative" w="100%" h="100vh">
      <Image
        src="/main-page.jpg"
        alt="Main Page"
        objectFit="cover"
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
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