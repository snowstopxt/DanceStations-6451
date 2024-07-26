import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import ChatMessage from "../chatMessage/index";
import { retrieveMessages } from "../../firebase/clientApp";

const ChatMessages = ({receiverId}) => {
    console.log('chatMessages -- receiverId:', receiverId);
    //const [messages, setMessages] = useState([]);

  const messages = retrieveMessages(receiverId);
  console.log('chatMessages -- messages:', messages);

  try {
    return (<VStack spacing={4} align="start">
    {messages.length > 0 && messages.map((msg) => 
    <ChatMessage key={msg.id} msg={msg} />)}
    </VStack>)
  } catch (error) {
    console.error('Error displaying messages:', error);
  }
}

export default ChatMessages;