'use client'
import React from 'react';
import { Box } from '@chakra-ui/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Header from '../components/header/index';
import StudioForm from '../components/studioForm/index'; // Ensure you adjust the path if necessary

const Page = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Box bg="brand.100" w="full" h="full" paddingBottom={30}>
        <Header userType='owner'/>
        <StudioForm />
      </Box>
    </APIProvider>
  );
};

export default Page;