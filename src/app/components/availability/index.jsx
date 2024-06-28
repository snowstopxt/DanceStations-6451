'use client'
import React, { useState, useEffect } from 'react';

import { Button,
    Card, 
    CardBody,
    Center,
    FormControl,
    Text,
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Divider,
    CardHeader,
    VStack
} from '@chakra-ui/react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './styles.css'
import { createBooking, fetchBookingsForDay } from '../../firebase/clientApp';
import { useRouter } from 'next/navigation';


const Availability = (props) => {
    const { userId, studioId } = props;
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const [showSlots, setShowSlots] = useState(false); 
    const router = useRouter();
    const [newBooking, setNewBooking] = useState(0);

    useEffect(() => {
        async function fetchData() {
            if (date) {
                const bookings = await fetchBookingsForDay(studioId, date);
                console.log('bookings: ', bookings);    
                setBookedSlots(bookings);
            }
        }
        fetchData();
        console.log('bookedSlots: ', bookedSlots);
        }, [date, newBooking]);


    const handleViewAvailabilityClick = () => {
        // Call createBooking with the current startTime and endTime
        if (userId == null) {
            alert('Please login to book a studio');
            router.push('/login')
        }
        if (date && startTime && endTime) {
            setShowSlots(true);
        } else {
            alert('Invalid input. Please select a date, start time, and end time.');
        }
    };

    const handleReserveClick = async () => {
        const isBooked = await createBooking(studioId, userId, date, startTime, endTime);
        if(isBooked === false) {
            alert('Booking successful');
        } else {
            alert('Slot is unavailable, please choose another timing or date');
        }
        setNewBooking(newBooking + 1);

    };

    const handleDateChange = (date) => {
        if(date === null) return;   
        const dateWithoutTime = date.toISOString().split('T')[0];
        setDate(dateWithoutTime);
    };


    
    const renderTimeSlots = (date) => { 

        const displayDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        return (
            <TableContainer height='300px' overflowY = 'scroll'>
                <Table width='200px'>
                    <Thead position='static'>
                        <Tr>
                            <Th>{displayDate}</Th>
                        </Tr>
                    </Thead>
                    <Tbody> 
                        {(() => {   
                            const timeSlots = [];
                            for (let hour = 9; hour < 24; hour++) {
                                for (let minute = 0; minute < 60; minute += 60) { 
                                    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                                    const isBooked = bookedSlots.some(slot => slot.time == hour);
                                    timeSlots.push(
                                        <Tr key={time}>
                                            <Th textAlign='center' textColor={isBooked ? 'white' : 'brand.600'} bg={isBooked ? 'brand.500' : 'white'}>{time}</Th>
                                        </Tr>
                                    );
                                }
                            }
                            return timeSlots;
                        })()}
                    </Tbody>
                </Table>
            </TableContainer>
        );
    }
    
    
    return (
        <Card>
            <CardHeader mb='-15px' fontSize='lg' alignSelf='center'>Book this station</CardHeader>
            <CardBody>
                <FormControl>
                <VStack justifyContent='center' alignItems='center' spacing={5}>
                <Text mb='-15px' paddingInlineEnd='140px'>Select Date:</Text>
                <DatePicker 
                        placeholderText="Date"
                        className={styles.input}
                        selected ={date}
                        // onSelect={''}
                        onChange={(e) => {handleDateChange(e)}} />
                <Text mb='-15px' paddingInlineEnd='140px'>Start Time:</Text>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value.split(':')[0] + ':00')}
                    className={styles.input}
                    step={3600} // Set the step to 1 hour (3600 seconds)
                />
                <Text mb='-15px' paddingInlineEnd='140px'>End Time:</Text>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => { setEndTime(e.target.value.split(':')[0] + ':00')}}
                    className={styles.input}
                    step={3600} // Set the step to 1 hour (3600 seconds)
                />
                <Button size="md" variant="brand-lg" onClick={handleViewAvailabilityClick}>View Availability</Button>
                
                {showSlots && <Divider/>}
                    {showSlots && renderTimeSlots(date)}
                    {showSlots && <Button variant='brand-lg' size='md' onClick={handleReserveClick}>Reserve Now</Button>} 
                </VStack> 
                </FormControl>
            </CardBody>
            
        </Card>
    );
};

export default Availability;