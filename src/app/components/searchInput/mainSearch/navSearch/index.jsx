'use client';

import React from 'react';
import { Card, CardBody, Center, Button, InputLeftElement, Input, Stack, InputGroup, } from '@chakra-ui/react';
import { BsGeoAlt, BsCurrencyDollar, BsSearch } from "react-icons/bs";
import Link from 'next/link';


const NavSearch = () => {
    return (
    <Card overflow='hidden' bg='white' w={800} h ={90} >
        <CardBody h ={50}>
        <Center h={50}> 
        <Stack direction='row' spacing = {3} >
            
        <Input type="name" placeholder="Studio Name" size="lg" maxW={250} />

        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input width='44' size="lg" type='mrt' placeholder='MRT station'/>
        </InputGroup>  
        
        
        
        <Link href="/map" passHref legacyBehavior>
            <Button width='160px' leftIcon={<BsSearch/>} size="lg" variant='brand-lg'>Find Studio</Button>
        </Link>
        </Stack>
        </Center>
        </CardBody>
        </Card>
    );
};

export default NavSearch;