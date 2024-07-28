"use client"
import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const ViewListings = ({ listings }) => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>My Listings</Text>
      {listings.length > 0 ? (
        <Flex overflowX="auto">
          {listings.map((listing, index) => (
            <Box
              key={index}
              minW="200px"
              h="150px"
              bg="gray.200"
              m={2}
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Text>{listing.title}</Text>
            </Box>
          ))}
        </Flex>
      ) : (
        <Text>You have no listings</Text>
      )}
    </Box>
  );
};

export default ViewListings;