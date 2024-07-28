import React, { useEffect, useState } from "react";
import { VStack, Text } from "@chakra-ui/react";
import ChatMessage from "../chatMessage/index";
import { retrieveMessages } from "../../firebase/clientApp";
import { fetchUserById } from "../../firebase/clientApp";

const ChatMessages = ({receiverId}) => {
    console.log('chatMessages -- receiverId:', receiverId);
    //const [messages, setMessages] = useState([]);

  const messages = retrieveMessages(receiverId);
  console.log('chatMessages -- messages:', messages);

  const [receiverUsername, setReceiverUsername] = useState(null);

  useEffect(() => {
    const getReceiver = async () => {
      try {
        const receiver = await fetchUserById(receiverId);
        setReceiverUsername(receiver.username);
      } catch (error) {
        console.error('Error fetching receiver username:', error);
      }
    };getReceiver();
} , [receiverId]);

  try {
    return (
      <div>
    <Text fontSize="xl" fontWeight="bold" mb={4}>Chat with {receiverUsername}</Text>
    <VStack spacing={4} align="start">
    {messages.length > 0 && messages.map((msg) => 
    <ChatMessage key={msg.id} msg={msg} />)}
    </VStack>
    </div>)
  } catch (error) {
    console.error('Error displaying messages:', error);
  }
}

export default ChatMessages;