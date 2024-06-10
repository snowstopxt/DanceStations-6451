'use client';

import React from 'react';
import { Center, Button, InputLeftElement, Input, Stack, InputGroup, } from '@chakra-ui/react';
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import Link from 'next/link';


const NavSearch = () => {
    return (
        <Stack direction='row' spacing = {3} fle>
        <Input type="name" placeholder="Studio Name" size="lg" maxW={250} />

        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='mrt' placeholder='MRT Station' width={44}/>
        </InputGroup>  
    
        <Link href="/map" passHref legacyBehavior>
            <Button width={160} leftIcon={<BsSearch/>} size="lg" variant='brand-lg'>Find Studio</Button>
        </Link>
        </Stack>
    );
};

export default NavSearch;