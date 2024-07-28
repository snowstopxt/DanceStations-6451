import React from 'react';
import Header from './components/header/index';
import Home from './components/home/index';
import { Box } from '@chakra-ui/react';

export default function Page() {
  return (
    <Box position="relative">
      <Box position="relative" zIndex="10">
        <Header userType='dancer' />
      </Box>
      <Box position="relative" zIndex="1">
        <Home />
      </Box>
    </Box>
  );
}



