'use client';

import React, { useState } from 'react';
import { Center, Button, InputLeftElement, Input, Stack, InputGroup, } from '@chakra-ui/react';
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


const NavSearch = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('studioName')
    const mrt = searchParams.get('mrt')
    const [studioName, setStudioName] = useState(name || '');
    const [mrtStation, setMrtStation] = useState(mrt || '');
    
    
    return (
        <Center h={90}>
        <Stack direction='row' spacing = {3} >
        <Input type="name" placeholder="Studio Name" size="lg" maxW={400} value={studioName} onChange={(e) => setStudioName(e.target.value)}/>

        <InputGroup width='auto'>
            <InputLeftElement pointerEvents='none' pt='1.5'>
            <BsGeoAlt className='size-5' />
            </InputLeftElement>
            <Input size="lg" type='mrt' placeholder='MRT Station' width={44} value={mrtStation} onChange={(e) => setMrtStation(e.target.value)}/>
        </InputGroup>  
    
        <Link href={{ pathname: "/map", query: {studioName: studioName, mrt: mrtStation}}} passHref legacyBehavior>
            <Button width={300} leftIcon={<BsSearch/>} size="lg" variant='brand-lg'>Find Studio</Button>
        </Link>
        </Stack>
        </Center>
    );
};

export default NavSearch;