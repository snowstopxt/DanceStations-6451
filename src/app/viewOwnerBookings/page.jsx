'use client'

import { useEffect, useState } from 'react';
import { fetchAllBookings, fetchUserById } from '../firebase/clientApp';
import Header from '../components/header/index';
import React from 'react';
import { Box, Stack, Grid, Text } from '@chakra-ui/react';
import ReservationCard from '../components/reservationCard';
import { auth } from '../firebase/clientApp';

export default function Page () {
  //const user = auth.currentUser;
  //const userId = user?.uid || null;
const [reservations, setReservations] = useState([]);
const [studioArr, setStudioArr] = useState([]);
const user = auth.currentUser;
const userId = user?.uid || null;

useEffect(() => {
  const fetchUserData = async () => {
    const fetchingUser = await fetchUserById(userId);
    console.log('fetchedUser:', fetchingUser);
    
    if (fetchingUser[0].studioId) {
      const studioIds = fetchingUser[0].studioId;
      console.log('studioIds:', studioIds);
      setStudioArr(studioIds);
    } 
  };

  fetchUserData();
}, [userId]);

useEffect(() => {
  console.log('studioArr updated:', studioArr);
}, [studioArr]);


useEffect(() => {
  const fetchReservations = async () => {
    let results = [];
   
    for (let i = 0; i < studioArr.length; i++) {
      console.log('studioArr[i]:', studioArr[i]);
      const fetchedReservations = await fetchAllBookings(studioArr[i]);
      if (fetchedReservations && fetchedReservations.length > 0) {
        results = [...results, ...fetchedReservations];
      }
    }

    // Update state once after the loop
    setReservations(results);
  };

  if (studioArr.length > 0) {
    fetchReservations();
  }
}, [studioArr]);

    if (!reservations) {
        return <div>Loading...</div>;
    } else {
        console.log('viewBookingsPage reservations', reservations);
        
        return (
            <Box bgColor='white' minH="100vh">
            <Header />
            <Text fontSize="3xl" fontWeight="bold" color='black' m={5}>Studio Bookings</Text>
            <Box> 
            <Box overflowX='hidden' overflowY='auto'>
            <Stack spacing={6} direction='column' m={5} >
                {reservations?.map((reservation, i) => (
                    console.log("indiv reservation", reservation),
                    
                        <ReservationCard reservation={reservation} receiverId={reservation.userId}></ReservationCard>
                ))}
                </Stack>
            </Box>
            </Box>
            </Box>
        );
        
    }

}
/*
try {
useEffect(() => {
    const fetchData = async () => {
        const fetchedReservations = await fetchAllBookings();
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
            <Text className="text-h1-s font-bold m-5">My Bookings</Text>
            <div> 
            <Box overflowX='hidden' overflowY='auto'>
            <Stack spacing={6} direction='column' m={5} >
                {reservations?.map((reservation, i) => (
                    console.log(reservation),
                    
                        <ReservationCard reservation ={reservation}></ReservationCard>
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
*/
