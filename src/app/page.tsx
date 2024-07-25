import React from 'react';
import Header from './components/header/index';
import Home from './components/home/index';
import { Box } from '@chakra-ui/react';

export default function Page() {
    return (
        <Box alignContent='center'>
          <Header />
          <Box minH={{ base: "60vh", md: "80vh", lg: "100vh" }} alignItems='center'>
            <Home />
          </Box>
        </Box>
      );
}



