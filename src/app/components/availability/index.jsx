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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './styles.css'

const Availability = () => {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');




    return (
        <Card>
            <CardHeader mb='-15px' fontSize='lg' alignSelf='center'>Book this station</CardHeader>
            <CardBody>
                <VStack justifyContent='center' alignItems='center' spacing={5}>
                <Text mb='-15px' paddingInlineEnd='140px'>Select Date:</Text>
                <DatePicker 
                        placeholderText="Description or label"
                        className={styles.input}
                        selected ={date}
                        // onSelect={''}
                        onChange={(e) => {setDate(e); console.log(date)}} />
                <Button size="md" variant="brand-lg">View Availability</Button>
                </VStack> 
            </CardBody>
            
        </Card>
    );
};

export default Availability;