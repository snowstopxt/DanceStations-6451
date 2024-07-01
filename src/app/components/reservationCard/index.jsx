import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, Stack, Text } from '@chakra-ui/react';
import { fetchStudioById } from "../../firebase/clientApp";

//for testing
// import Image from 'next/image';



const ReservationCard = ({ reservation }) => {

    const [studio, setStudio] = useState();

    try {
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

  return (
    <Card>
        <CardBody>
            <Stack spacing = {0}>
                <Text className="text-h2-s font-bold ">{studio.name}</Text>
                <Text className="text-body-l ">{reservation.date}</Text>
                <Text className="text-body-l ">{reservation.startTime}-{reservation.endTime}</Text>
            </Stack>
        </CardBody>
    </Card>
  );
}
} catch (error) {
    console.error('Error fetching reservations', error);
  }
}

export default ReservationCard;