'use client'

import { useEffect, useState } from 'react';
import { fetchAllBookings, fetchUserById } from '../firebase/clientApp';
import Header from '../components/header/index';
import React from 'react';
import { Box, Stack, Grid, Text } from '@chakra-ui/react';
import ReservationCard from '../components/reservationCard';
import { auth } from '../firebase/clientApp';
import OwnerReservationCard from '../components/ownerReservationCard';

export default function Page () {
  //const user = auth.currentUser;
  //const userId = user?.uid || null;
const [reservations, setReservations] = useState<any[]>(null);
const [user, setUser] = useState<any>(null);
const [studioId, setStudioId] = useState<string>('');

const fetchName = async () => {
    const user = auth.currentUser;
    const userId = user?.uid || null;
    if (!userId) {
        console.error('No user is currently signed in.');
        return;
    }

    try {
        const fetchedUser = await fetchUserById(userId);
        setUser(fetchedUser);

        if (fetchedUser && fetchedUser.studioId!=='') {
            setStudioId(fetchedUser.studioId);
            console.log('This user has a studioId:', fetchedUser.studioId);
        } else {
            console.log('This user does not have a studioId.');
        }
            
    } catch (error) {
        console.error('Error fetching user:', error);
    }
  }

  const fetchReservations = async () => {
    console.log('fetchReservations studioId:', studioId);
    const fetchedReservations = await fetchAllBookings(studioId);
    if (fetchedReservations) {
      setReservations(fetchedReservations);
    } else {
      setReservations([]);
    }
    console.log('fetchReservations reservations :', reservations);
};


  useEffect(() => {
    fetchName();
    
  }
    , []);

useEffect(() => {
    if (studioId) {
        fetchReservations();
    }
}
    , [studioId]);




  

    return (
            <div><Header />
            <Text className="text-h1-s font-bold m-5" margin={5}>Studio Bookings in the next 7 days</Text>
            <div> 
            <Box overflowX='hidden' overflowY='auto'>
            <Stack spacing={6} direction='column' m={5} >
                {!reservations ? <div>Loading...</div> : reservations.length === 0 ? <Text>No Bookings</Text> : reservations?.map((reservation, i) => (
                    console.log(reservation),
                    
                        <OwnerReservationCard reservation ={reservation}></OwnerReservationCard>
                ))}
                </Stack>
            </Box>
            </div>
            </div>
        );
  

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
  */
    
}
