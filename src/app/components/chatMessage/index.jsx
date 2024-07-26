import { Box, Card, Text, VStack } from "@chakra-ui/react";
import { auth, fetchUserById } from "../../firebase/clientApp";
import { useEffect, useState } from "react";

const ChatMessage = ( {msg} ) => {

    const [receiverUsername, setReceiverUsername] = useState(null);

  useEffect(() => {
    const getReceiver = async () => {
      let receiverId;
      if (msg.sentTo) {
        receiverId = msg.sentTo;
      } else {
        receiverId = msg.sentBy;
      }

      try {
        const receiver = await fetchUserById(receiverId);
        setReceiverUsername(receiver.username);
      } catch (error) {
        console.error('Error fetching receiver username:', error);
      }
    };getReceiver();
}, [msg.sentTo, msg.sentBy]);

    if (msg) {
    //const {text, sentBy} = message;
    console.log('chatMessage -- msg:', msg);
    console.log('chatMessage -- text:', msg.text);
    const messageClass = msg.sentTo ? 'sent' : 'received';
    console.log('chatMessage -- messageClass:', messageClass);

    return (
                  <Card className="bg-white p-4 rounded shadow-sm w-full" alignSelf={messageClass==='sent'?"self-end":"self-start"}>
                    <Text fontWeight="bold" color="teal.500" marginLeft={2} marginTop={1} marginRight={4}>{messageClass==='sent'? auth.currentUser.displayName : receiverUsername}</Text>
                    <Text marginX={2} marginBottom={1}>{msg.text}</Text>
                  </Card>
    )
}
}

export default ChatMessage;