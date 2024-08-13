import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, Stack, Text, Button, Link } from '@chakra-ui/react';
import { fetchStudioById } from "../../firebase/clientApp";

//for testing
// import Image from 'next/image';

const ReservationCard = ({ reservation, receiverId }) => {
  const [studio, setStudio] = useState();

  useEffect(() => {
  const fetchStudio = async () => {
      const fetchedStudio = await fetchStudioById(reservation.studioId);
      setStudio(fetchedStudio);
  };
  if (reservation.studioId) {
      fetchStudio();
    }
  }, [reservation.studioId]);

        
        
    console.log('studio: ', studio);
    console.log('reservation: ', reservation);


    if (!studio) {
        return <div>Loading...</div>;
      } else {

    if (!receiverId) {
      receiverId = studio.ownerId;
    }

  return (
    <Card>
        <CardBody>
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing = {0}>
                <Text className="text-h2-s font-bold ">{studio.name}</Text>
                <Text className="text-body-l ">{reservation.date}</Text>
                <Text className="text-body-l ">{reservation.startTime}:00-{reservation.endTime}:00</Text>
            </Stack>
            <Link href={`/chat/${receiverId}`}>
            <Button variant="brand-blue" marginRight={5}>Chat</Button>
            </Link>
            </Stack>
        </CardBody>
    </Card>
  );
}
}

export default ReservationCard;