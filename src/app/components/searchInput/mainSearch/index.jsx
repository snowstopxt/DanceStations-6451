'use client';

import React from 'react';
import { Card, Center, Button, InputLeftElement, Input, Stack, InputGroup, } from '@chakra-ui/react';
import { BsGeoAlt, BsCurrencyDollar, BsSearch } from "react-icons/bs";


const MainSearch = () => {
    return (
    <Card overflow='hidden' bg='white' w={[300, 400, 970]} h ={200} >
        <Center w={[300, 400, 970]} h ={200}>
        <Stack direction='row' spacing = {3}>
        <Input type="name" placeholder="Studio Name" size="lg" maxW={400}/>
          <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='mrt' placeholder='MRT station'/>
        </InputGroup>  
        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsCurrencyDollar className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='price' placeholder='Price per hour'  />
        </InputGroup> 
        <Button leftIcon={<BsSearch/>} size="lg" bg='brand.100' color='white'>Find Studio</Button>           
        </Stack>
        </Center>
        </Card>
    );
};

export default MainSearch;