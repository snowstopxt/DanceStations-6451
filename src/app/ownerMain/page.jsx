'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/header/index';
import {
    Button, 
    Box, 
    Flex,
    HStack,
    Text
} 
from '@chakra-ui/react';
import Link from 'next/link'
import { fetchOwnerStudio, fetchStudioById, fetchUserById } from '../firebase/clientApp';
import { OwnerProvider, useOwner } from '../../contexts/ownerStudios';
import ViewListings from '../components/viewListings/index';
import { auth } from '../firebase/clientApp';


export default function Page () {
  const studioArr = useOwner();
  const [listings, setListings] = useState([]);
  const user = auth.currentUser;
  const userId = user?.uid || null;

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const fetchingUser = await fetchUserById(userId);
  //     console.log('fetchedUser:', fetchingUser);
      
  //     if (fetchingUser[0].studioId) {
  //       const studioIds = fetchingUser[0].studioId;
  //       console.log('studioIds:', studioIds);
  //       setStudioArr(studioIds);
  //     } 
  //   };
   
  //   fetchUserData();
  // }, [userId]);

  useEffect(() => {
    console.log('ownerMain studioArr:', studioArr);
  }, [studioArr]);

  useEffect(() => {
    const getStudios = async () => {
      if (studioArr) {
        console.log('getting listings')
        const studios = [];
        for (let i = 0; i < studioArr.length; i++) {
          const studio = await fetchStudioById(studioArr[i]);
          studios.push(studio);
        }
        setListings(studios);
      }
    };
  
    getStudios();
  }, [studioArr]);

  useEffect(() => {
    console.log('listings:', listings);
  }, [listings]);

        // const [studioId, setStudioId] = useState(null);
        // const [listings, setListings] = useState([]);

        // fetch studio id
        // const getStudioId = async () => {
        //     const id = await fetchOwnerStudio();
        //     console.log('studioId:', id);
        //     setStudioId(id);
        // }

        // useEffect(() => {
        //     getStudioId();
        // }
        // , []);

        // // fetch studio data
        // const getStudio = async () => {
        //    console.log('studioId:', studioId);
        //     const studio = await fetchStudioById(studioId);
        //     console.log('studio:', studio);
        //     setListings([...listings, studio]);
        //     console.log('listings:', listings);
        // }

        // useEffect(() => {
        //     if (studioId) {
        //         getStudio();
                
        //     }
        // }
        // , [studioId]);

    
    return (
        <OwnerProvider>
        <Box bg="brand.100" minH="100vh">
        <Header userType="owner" />
        <Box p={10}>
        <Flex mb={4} justifyContent="flex-start" flexDirection='column'>
        <HStack gap={8}>
          <Button as={Link} href="/rent" variant="brand-blue">
            Add a Studio
          </Button>
        </HStack >
        <Text fontSize="3xl" fontWeight="bold" color='white' m={5}>View your studios</Text>
        <ViewListings/>
        {/* <Flex flexWrap="wrap" justifyContent="space-between" width="400px">
          {listings.map((studio, i) => (
          <StudioCard key={i} studio={studio} />
        ))}
        </Flex> */}
        </Flex>
      </Box>
      </Box>
      </OwnerProvider>
    );

  
    };