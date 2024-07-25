import React from 'react';
import Header from "../components/header/index";
import { ChakraProvider, Box, Flex, Input, Button, VStack, Text } from '@chakra-ui/react';

export default function ChatPage () {

      return (
          <div>
             <Header />
            {/* Sidebar */}
            <Box className="w-1/4 bg-gray-800 text-white p-4">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Chat Rooms
              </Text>
              <VStack align="start" spacing={3}>
                <Button variant="link" colorScheme="whiteAlpha">
                  General
                </Button>
                <Button variant="link" colorScheme="whiteAlpha">
                  Tech Talk
                </Button>
                <Button variant="link" colorScheme="whiteAlpha">
                  Random
                </Button>
              </VStack>
            </Box>
    
            {/* Chat Area */}
            <Flex className="flex-1 flex flex-col">
              <Box className="flex-1 p-4 bg-gray-100 overflow-y-auto">
                {/* Chat messages */}
                <VStack spacing={4} align="start">
                  <Box className="bg-white p-4 rounded shadow-sm w-full">
                    <Text fontWeight="bold">User1:</Text>
                    <Text>Hello, how are you?</Text>
                  </Box>
                  <Box className="bg-white p-4 rounded shadow-sm w-full">
                    <Text fontWeight="bold">User2:</Text>
                    <Text>I'm good, thank you!</Text>
                  </Box>
                  {/* More messages */}
                </VStack>
              </Box>
    
              {/* Message Input */}
              <Box className="p-4 bg-white border-t border-gray-200">
                <Flex>
                  <Input placeholder="Type a message..." />
                  <Button colorScheme="teal" ml={2}>
                    Send
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </div>
    
    
     );
}