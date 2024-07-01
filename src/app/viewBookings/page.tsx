'use client'

import { useEffect, useState } from 'react';
import { fetchReservations } from '../firebase/clientApp';
import Header from '../components/header';
import React from 'react';
import { Stack, Grid, Text } from '@chakra-ui/react';
import ReservationCard from '../components/reservationCard';

const viewBookingsPage = () => {
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
});

    if (!reservations) {
        return <div>Loading...</div>;
    } else {
        console.log(reservations);
        return (
            <div><Header />
            <Text className="text-h1-s font-bold m-5">My Bookings</Text>
            <div> 
            <Stack spacing={6} direction='column' m={5}>
                {reservations?.map((reservation, i) => (
                    console.log(reservation),
                    
                        <ReservationCard reservation ={reservation}></ReservationCard>
                ))}
                </Stack>
            </div>
            </div>
        );
    }
} catch (error) {
  console.error('Error fetching reservations', error);
}
}

export default viewBookingsPage;