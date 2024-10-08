'use client'

import { useEffect, useState } from 'react';
import { fetchReservations } from '../firebase/clientApp';
import Header from '../components/header/index';
import React from 'react';
import { Box, Stack, Grid, Text } from '@chakra-ui/react';
import ReservationCard from '../components/reservationCard';

export default function Page () {
  //const user = auth.currentUser;
  //const userId = user?.uid || null;
const [reservations, setReservations] = useState<any[]>([]);


try {
useEffect(() => {
    const fetchData = async () => {
        const fetchedReservations = await fetchReservations();
        setReservations(fetchedReservations);
    };
    fetchData();
}, []);


    if (!reservations) {
        return <div>Loading...</div>;
    } else {
        console.log(reservations);
        return (
            <div><Header />
            <Text fontSize="3xl" fontWeight="bold" color='white' m={5}>My Bookings</Text>
            <div> 
            <Box overflowX='hidden' overflowY='auto'>
            <Stack spacing={6} direction='column' m={5} >
                {reservations?.map((reservation, i) => (
                    console.log(reservation),
                    
                        <ReservationCard reservation ={reservation} receiverId={""}></ReservationCard>
                ))}
                </Stack>
            </Box>
            </div>
            </div>
        );
    }
} catch (error) {
  console.error('Error fetching reservations', error);
}
}
