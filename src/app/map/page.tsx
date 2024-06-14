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

interface Studio {
    geohash: string;
    location: [number, number];
    mrt: string;
    name: string;
    price: number;
    size: number;
  }

const MapPage = () => {
    const defaultCoordinates = { lat: 1.3521, lng: 103.8198 }; // Singapore coordinates
    const [coords, setCoords] = useState([1.3521, 103.8198]);
    const [ north, setNorth ] = useState([1.3900692049787553, (103.78181992034912+103.85778007965088)/2]);

    return (
        <div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }>
            <StudiosProvider coords={coords} north={north}>
            <Header />
            <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                <GridItem bg='white'>
                    <List/>
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

export default MapPage;