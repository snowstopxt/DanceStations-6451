import SelectLogin from '../components/selectLogin';
import Header from '../components/header';
import React from 'react'
import { Box, Text, Grid } from '@chakra-ui/react';


export default function Page() {
    return (
        <Box bg="brand.100" w="100%" minH="100vh" display="flex" flexDirection="column" alignItems="center">
            <Box w="100%"><Header /></Box>
          <Box w="100%" bg="brand.100" h="full" textAlign="center" display="flex" flexDirection="column" alignItems="center" p={4}>
            <Text margin="40px" color="white" fontSize={{ base: '2xl', sm: '2xl', lg: '3xl' }} fontWeight="semibold" mb={4}>
              Login to DanceStations
            </Text>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full" maxW="600px" marginY="60px">
              <SelectLogin userType='dancer' />
              <SelectLogin userType='owner' />
            </Grid>
          </Box>
        </Box>
      );
}