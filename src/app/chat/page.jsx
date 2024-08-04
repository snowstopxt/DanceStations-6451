"use client"
import {React, useState, useEffect} from 'react';
import Header from "../components/header/index";
import { ChakraProvider, Box, Flex, Input, Button, VStack, Text } from '@chakra-ui/react';
import { retrieveMessages, sendMessage } from '../firebase/clientApp';
import ChatMessage from '../components/chatMessage/index';

export default function ChatPage () {

  const [formValue, setFormValue] = useState('');
  const [messages, setMessages] = useState([]);
  

  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await retrieveMessages(params.receiverId);
        setMessages(fetchedMessages);
        } catch (err) {
        console.error('Error fetching messages:', err);
      };
    };
    fetchMessages();
  }, []);


  const onClick = async (e) => {
    e.preventDefault();

    if (formValue==='') return;

    try {
      console.log('formValue:', formValue);
    await sendMessage(formValue);
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
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Chat Rooms
              </Text>
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
                <VStack spacing={4} align="start">
                {console.log('chat page -- messages:', messages)}
                {messages.length > 0 && messages.map((msg, i) => 
                <ChatMessage msg={msg} key={i} />)}
                </VStack>
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