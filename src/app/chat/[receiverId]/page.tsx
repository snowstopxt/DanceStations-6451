"use client"
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/index";
import { ChakraProvider, Box, Flex, Input, Button, VStack, Text } from '@chakra-ui/react';
import { retrieveMessages, sendMessage, fetchUserById } from '../../firebase/clientApp';
import ChatMessage from '../../components/chatMessage/index';
import ChatMessages from '../../components/chatMessages/index';

export default function ChatPage ({params} : {params: {receiverId: string}}) {

  const [formValue, setFormValue] = useState('');
  
  //const messages = retrieveMessages(params.receiverId);
  //const receiver = fetchUserById(params.receiverId);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formValue==='') return;

    try {
      console.log('formValue:', formValue);
      console.log('chat page --- receiverId:', params.receiverId);
    await sendMessage(formValue, params.receiverId);
    setFormValue('');
    } catch (error) {
    console.error('Error sending message:', error);
    }
  }

  

      return (
          <div>
             <Header />
            {/* Sidebar */}
            <Box className="w-1/4 bg-gray-800 text-white p-4">
              {/*<VStack align="start" spacing={3}>
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
              */}
            </Box>
                
            {/* Chat Area */}
            <Flex className="flex-1 flex flex-col" margin={6} flexDirection="column">
              <Box className="flex-1 p-4 bg-gray-100 overflow-y-auto">
                {/* Chat messages */}
                
                <ChatMessages receiverId={params.receiverId} />

                {/*<VStack spacing={4} align="start">

                {messages.length > 0 && messages.map((msg: any) => 
                <ChatMessage msg={msg} />)}
                </VStack>*/}
              </Box>
    
              {/* Message Input */}
              <Box className="p-4 bg-white border-t border-gray-200" margin={6}>
                <Flex>
                  <Input placeholder="Type a message..." type='text' value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                  <Button colorScheme="teal" ml={2} onClick={onClick}>
                    Send
                  </Button>
                </Flex>
              </Box>
            </Flex>

          </div>
    
    
     );
}