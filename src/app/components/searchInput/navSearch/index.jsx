'use client';

import React from 'react';
import { Center, Button, InputLeftElement, Input, Stack, InputGroup, } from '@chakra-ui/react';
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import Link from 'next/link';


const NavSearch = () => {
    return (
        <Center h={90}>
        <Stack direction='row' spacing = {3} >
        <Input type="name" placeholder="Studio Name" size="lg" maxW={400} />

        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='mrt' placeholder='MRT Station' width={44}/>
        </InputGroup>  
    
        <Link href="/map" passHref legacyBehavior>
            <Button width={300} leftIcon={<BsSearch/>} size="lg" variant='brand-lg'>Find Studio</Button>
        </Link>
        </Stack>
        </Center>
    );
};

export default NavSearch;