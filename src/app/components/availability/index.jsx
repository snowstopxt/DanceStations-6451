'use client'
import React, {useState} from 'react';
import { Card, 
    CardBody,
    Button, 
    Text,
    Input, 
    CardHeader,
    VStack
} from '@chakra-ui/react';


const Availability = () => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    return (
        <Card>
            <CardHeader alignSelf='center'>Book this station</CardHeader>
            <CardBody>
                <VStack justifyContent='center' alignItems='center' spacing={2}>
                <input type="date" 
                        placeholder='Select Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} />
                <input type="time"
                        placeholder='Start Time'
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)} />
                <input type="time"
                        placeholder='End Time'
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)} /> 
                <Button size="md" variant="brand-lg">View Availability</Button>
                </VStack> 
            </CardBody>
            
        </Card>
    );
};

export default Availability;