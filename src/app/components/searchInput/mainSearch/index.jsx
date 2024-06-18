'use client';

import React, { useState } from 'react';
import { Card, CardBody, Center, Button, InputLeftElement, Input, Stack, InputGroup } from '@chakra-ui/react';
import { BsGeoAlt, BsCurrencyDollar, BsSearch } from "react-icons/bs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const MainSearch = () => {
    const [studioName, setStudioName] = useState('');
    const [mrtStation, setMrtStation] = useState('');
    const router = useRouter();

    const handleKeyDown = (event) => {
        if(isNaN(event.key) && event.key !== 'Backspace' && event.key !== '.') {
            event.preventDefault();
        }
    };


    return (
    <Card overflow='hidden' bg='white' w={1000} h ={200} >
        <CardBody h ={200}>
        <Center h={150}> 
        <Stack direction='row' spacing = {3} >
        <Input type="name" placeholder="Studio Name" size="lg" maxW={400} onChange={(e) => setStudioName(e.target.value)} value={studioName}/>
          <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='mrt' placeholder='MRT Station' onChange={(e) => setMrtStation(e.target.value)} value={mrtStation}/>
        </InputGroup>  
        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsCurrencyDollar className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='price' placeholder='Price per hour' onKeyDown={handleKeyDown} />
        </InputGroup> 
        <Link href={{ pathname: "/map", query: {studioName: studioName, mrt: mrtStation}}} passHref legacyBehavior> 
            <Button leftIcon={<BsSearch/>} size="lg" variant='brand-lg' >Find Studio</Button>
        </Link>
        </Stack>
        </Center>
        </CardBody>
        </Card>
    );
};

export default MainSearch;