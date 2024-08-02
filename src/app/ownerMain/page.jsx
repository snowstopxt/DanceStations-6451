'use client'
import React, { useState, useEffect } from 'react';
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
import { fetchOwnerStudio, fetchStudioById } from '../firebase/clientApp';


export default function Page () {
        const [studioId, setStudioId] = useState(null);
        const [listings, setListings] = useState([]);
        let retrieved = false;

        // fetch studio id
        const getStudioId = async () => {
            const id = await fetchOwnerStudio();
            console.log('studioId:', id);
            setStudioId(id);
        }

        useEffect(() => {
            getStudioId();
        }
        , []);

        // fetch studio data
        const getStudio = async () => {
           console.log('studioId:', studioId);
            const studio = await fetchStudioById(studioId);
            console.log('studio:', studio);
            setListings([...listings, studio]);
            console.log('listings:', listings);
        }

        useEffect(() => {
            if (studioId) {
                getStudio();
                
            }
        }
        , [studioId]);



    
    return (
        <Box bg="brand.100" minH="100vh">
        <Header userType="owner" />
        <Box p={10}>
        <Flex mb={4} justifyContent="flex-start"  alignItems="center">
        <HStack gap={8}>
          <Button as={Link} href="/rent" variant="brand-blue">
            Add a Studio
          </Button>
          <Button as={Link} href="/viewOwnerBookings" variant="brand-blue">
            My Studio Bookings
          </Button>
        </HStack >
        </Flex>
        <ViewListings listings={listings} />
      </Box>
        </Box>
    );

  
    };