'use client'
import React, { useState } from 'react';
import Header from '../components/header/index';
import {
    Button, 
    Box, 
    Flex,
    HStack
} 
from '@chakra-ui/react';
import ViewListings from '../components/viewListings/index';
import Link from 'next/link'


export default function Page () {
        const listings = []; // Placeholder for listings data. Replace with actual data.
      
    return (
        <Box bg="brand.100" minH="100vh">
        <Header userType="owner" />
        <Box p={10}>
        <Flex mb={4} justifyContent="flex-start"  alignItems="center">
        <HStack gap={8}>
          <Button as={Link} href="/rent" variant="brand-blue">
            Add a Studio
          </Button>
          <Button as={Link} href="/chat" variant="brand-blue">
            My Chats
          </Button>
        </HStack >
        </Flex>
        <ViewListings listings={listings} />
      </Box>
        </Box>
    );
    };