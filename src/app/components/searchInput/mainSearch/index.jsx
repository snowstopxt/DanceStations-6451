'use client';

import React from 'react';
import { Card, CardBody, Center, Button, InputLeftElement, Input, Stack, InputGroup, } from '@chakra-ui/react';
import { BsGeoAlt, BsCurrencyDollar, BsSearch } from "react-icons/bs";
import Link from 'next/link';


const MainSearch = () => {
    return (
    <Card overflow='hidden' bg='white' w={1000} h ={200} >
        <CardBody h ={200}>
        <Center h={150}> 
        <Stack direction='row' spacing = {3} >
        <Input type="name" placeholder="Studio Name" size="lg" maxW={400}/>
          <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='mrt' placeholder='MRT Station'/>
        </InputGroup>  
        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsCurrencyDollar className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='price' placeholder='Price per hour'  />
        </InputGroup> 
        <Link href="/map" passHref legacyBehavior>
            <Button leftIcon={<BsSearch/>} size="lg" variant='brand-lg'>Find Studio</Button>
        </Link>
        </Stack>
        </Center>
        </CardBody>
        </Card>
    );
};

export default MainSearch;