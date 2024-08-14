import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../src/contexts/authContext'; 
import { 
    APIProvider,
} from '@vis.gl/react-google-maps';

const AllProviders = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          {children}
        </APIProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default AllProviders;