"use client"
import React, {useEffect, useState}from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { fetchStudioById } from '../../firebase/clientApp';
import { useOwner } from '../../../contexts/ownerStudios';
import StudioCard from '../card/index';
import { auth } from '../../firebase/clientApp';

const ViewListings = () => {
  const studioArr = useOwner();
  const [listings, setListings] = useState([]);
  const user = auth.currentUser;
  const userId = user?.uid || null; 
  
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

  return (
    <Box p={4}>
      {listings ? (
        <Flex
        flexWrap="wrap"
        justifyContent="flex-start"
        gap={4}
        width="100%"
      >
        {listings.map((studio, i) => (
          <Box key={i} flexBasis={{ base: "100%", sm: "48%", md: "31%", lg: "23%" }} mb={4}>
            <StudioCard studio={studio} />
          </Box>
        ))}
      </Flex>
      ) : (
        
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default ViewListings;