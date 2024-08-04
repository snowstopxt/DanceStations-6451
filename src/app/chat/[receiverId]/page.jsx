"use client"
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/index";
import { ChakraProvider, Box, Flex, Input, Button, VStack, Text } from '@chakra-ui/react';
import { retrieveMessages, sendMessage, fetchUserById } from '../../firebase/clientApp';
import ChatMessage from '../../components/chatMessage/index';
import ChatMessages from '../../components/chatMessages/index';

export default function ChatPage ({params}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValue, setFormValue] = useState('');
  const [receiver, setReceiver] = useState(null);
  const [sentMsgs, setSentMsgs] = useState(0);
  
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const fetchedMessages = await retrieveMessages(params.receiverId);
        setMessages(fetchedMessages);
      } catch (err) {
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReceiver = async () => {
      try {
        const fetchedReceiver = await fetchUserById(params.receiverId);
        setReceiver(fetchedReceiver);
      } catch (err) {
        console.error('Error fetching receiver:', err);
      }
    };

    fetchMessages();
    fetchReceiver();
  }, [params.receiverId, sentMsgs]);
  

  const onClick = async (e) => {
    console.log('clicked');
    e.preventDefault();
    
    if (formValue==='') return;

    try {
      console.log('formValue:', formValue);
      console.log('chat page --- receiverId:', params.receiverId);
    await sendMessage(formValue, params.receiverId);
    setFormValue('');
    setSentMsgs(sentMsgs + 1);
    } catch (error) {
    console.error('Error sending message:', error);
    }
  }

  useEffect(() => {
    console.log('updated formValue:', formValue);
  } , [formValue]);


      return (
          <div>
             <Header />
            
            <Flex flex="1" flexDirection="column" m={6}>
              <Box flex="1" p={4} bg="gray.100" overflowY="auto" borderRadius={8}>
                <ChatMessages receiverId={params.receiverId} />

                <VStack spacing={4} align="start">

                {messages.length > 0 && messages.map((msg, i) => 
                <ChatMessage msg={msg} key={i} />)}
                </VStack>
              </Box>
    
              {/* Message Input */}
              <Box p={4} bg="white" borderTop="1px" borderColor="gray.200" m={6}>
                <Flex>
                  <Input placeholder="Type a message..." type='text' value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                  <Button variant="brand-blue" ml={2} onClick={onClick}>
                    Send
                  </Button>
                </Flex>
              </Box>
            </Flex>

          </div>
    
    
     );
}