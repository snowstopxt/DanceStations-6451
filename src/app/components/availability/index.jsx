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
    // const [showSlots, setShowSlots] = useState(false); 
    const router = useRouter();
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
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
        }, [date, newBooking]);

    useEffect(() => {
        console.log('useEffect!!!!!!!');
        console.log('startTime: ', startTime);
        console.log('endTime: ', endTime);
        if (startTime && endTime) {
            const tempArray = [];
            for (let hour = parseInt(startTime.split(':')[0]); hour < parseInt(endTime.split(':')[0]); hour++) {
                tempArray.push(hour.toString().padStart(2, '0') + ':00');
            }
            setSelectedTimeSlots(tempArray);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        if (selectedTimeSlots.length > 0) {
            console.log('useEffect selectedTimeSlots: ', selectedTimeSlots);
            setStartTime(selectedTimeSlots[0]);
            setEndTime((parseInt(selectedTimeSlots[selectedTimeSlots.length - 1].split(':')[0]) + 1).toString().padStart(2, '0') + ':00');
        } else {
            setStartTime('');
            setEndTime('');
        }
    }, [selectedTimeSlots]);

    // right now, selectedTimeSlots not updated
    const handleReserveClick = async () => {

        
        const promise = createBooking(studioId, userId, date, startTime, endTime);
        const result = await promise;

        console.log('startTime: ', startTime);
        console.log('endTime: ', endTime);
        console.log('startTimeParseInt: ', parseInt(startTime.split(':')[0], 10));
        //console.log('startTimeParseInt: ', parseInt(startTime.split(':')[0], 10));
        console.log('endTimeParseInt: ', parseInt(endTime.split(':')[0], 10));

        if (result === false && parseInt(startTime.split(':')[0], 10) >= 9 && parseInt(endTime.split(':')[0], 10) <= 24) {
            setNewBooking(newBooking + 1);
            alert('Reservation successful, please make payment through chat to confirm your booking');
        } else {
            alert('Slot is unavailable, please choose other timings or dates');
        }
        setSelectedTimeSlots([]);
/*
        console.log('selectedTimeSlots: ', selectedTimeSlots);
        const promises = selectedTimeSlots.map(slot => createBooking(studioId, userId, date, slot, (parseInt(slot.split(':')[0]) + 1).toString().padStart(2, '0') + ':00'));
        const results = await Promise.all(promises);
        const allSuccessful = results.every(result => result === false);
        if (allSuccessful) {
            setNewBooking(newBooking + 1);
            alert('Booking successful');
        } else {
            alert('Some slots are unavailable, please choose other timings or dates');
        }
        //setNewBooking(newBooking + 1);
        setSelectedTimeSlots([]);
        */
    };

    const handleDateChange = (date) => {
        if(date === null) return;   
        const dateWithoutTime = date.toISOString().split('T')[0];
        setDate(dateWithoutTime);
    };

    const handleSlotClick = (time) => {
        console.log('time: ', time);
        setSelectedTimeSlots(prevState => {
            if (prevState.includes(time)) {
                // Deselecting a slot should clear the selection if it's not the first or last slot
                if (time === prevState[0] || time === prevState[prevState.length - 1]) {
                    const newState = prevState.filter(slot => slot !== time).sort();
                    setStartTime(newState[0]);
                    setEndTime((parseInt(newState[newState.length - 1]?.split(':')[0]) + 1).toString().padStart(2, '0') + ':00');
                    return newState;
                }
            } else {
                // Ensuring continuity
                const lastSelectedSlot = prevState[prevState.length - 1];
                const nextSlot = (parseInt(lastSelectedSlot?.split(':')[0]) + 1).toString().padStart(2, '0') + ':00';
                if (prevState.length === 0 || time === nextSlot) {
                    return [...prevState, time].sort();
                }
            }
            return prevState;
        });
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
                                    const isBooked = bookedSlots.some(slot => slot.time === hour);
                                    const userBooked = bookedSlots.some(slot => slot.userId === userId && slot.time === hour);
                                    const isSelected = selectedTimeSlots.includes(time);
                                    console.log('bookedSlots:', bookedSlots);
                                    console.log('time:', time);
                                    console.log('isBooked:', isBooked);
                                    timeSlots.push(
                                        <Tr key={time}>
                                            <Th
                                            textAlign='center'
                                            textColor={isBooked || isSelected ? 'white' : userBooked ? 'red' : 'brand.600'}
                                            bgColor={isBooked ? 'brand.500' : isSelected ? 'brand.300' : 'white'}
                                            cursor='pointer'
                                            onClick ={() => handleSlotClick(time)}
                                            >
                                            {time}</Th>
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
                            selected={date ? new Date(date) : null}
                            minDate={new Date()}
                            onChange={(e) => { handleDateChange(e) }}
                        />
                        <Text mb='-15px' paddingInlineEnd='140px'>Start Time:</Text>
                        <input
                            type="time"
                            min="09:00:00"
                            max={endTime}
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value.split(':')[0] + ':00')}
                            className={styles.input}
                            step={3600} // Set the step to 1 hour (3600 seconds)
                        />
                        <Text mb='-15px' paddingInlineEnd='140px'>End Time:</Text>
                        <input
                            type="time"
                            value={endTime}
                            min={startTime}
                            max='24:00:00'
                            onChange={(e) => { setEndTime(e.target.value.split(':')[0] + ':00') }}
                            className={styles.input}
                            step={3600} // Set the step to 1 hour (3600 seconds)
                        />
                        {date && renderTimeSlots(date)}
                        <Button variant="brand-lg" size='md' onClick={handleReserveClick}>Reserve Now</Button>
                    </VStack>
                </FormControl>
            </CardBody>
        </Card>
    );
};

export default Availability;