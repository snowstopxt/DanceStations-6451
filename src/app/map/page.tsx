"use client";

import React, { useState, useEffect } from 'react';
import List from '../components/list/index';
import MyMap from '../components/map/index';
import { 
    APIProvider,
} from '@vis.gl/react-google-maps';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/index';
import { StudiosProvider } from '../../contexts/studiosContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface Studio {
    geohash: string;
    location: [number, number];
    mrt: string;
    name: string;
    price: number;
    size: number;
  }

export default function Page () {
    const searchParams = useSearchParams()
    const name = searchParams.get('studioName');
    const mrt = searchParams.get('mrt');
    const defaultCoordinates = { lat: 1.3521, lng: 103.8198 }; // Singapore coordinates
    const [coords, setCoords] = useState([1.3521, 103.8198]);
    const [north, setNorth ] = useState([1.3900692049787553, (103.78181992034912+103.85778007965088)/2]);
    const [studioName, setStudioName] = useState(name || '');
    const [mrtStation, setMrtStation] = useState(mrt || ''); 
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100)
    
    useEffect(() => {
        setStudioName(name || '');
        setMrtStation(mrt || '');
    }, [name, mrt]);
    

    const queries = {
        name: studioName,
        mrt: mrtStation,
        coords: coords,
        north: north,
        min: minPrice,
        max: maxPrice
    }

    return (
        <div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }>
            <StudiosProvider queries = {queries}>
            <Header/>
            <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                <GridItem bg='white'>
                    <List setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
                </GridItem>
                <GridItem>
                    <MyMap setCoords={setCoords} setNorth={setNorth}/>
                </GridItem>
            </Grid>
            </StudiosProvider>
            </APIProvider>
        </div>
    );
};