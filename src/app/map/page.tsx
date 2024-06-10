"use client";

import React, { useState, useEffect } from 'react';
import List from '../components/list/index';
import MyMap from '../components/map/index';
import { 
    APIProvider,
    useMap,
} from '@vis.gl/react-google-maps';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/index';

const MapPage = () => {
    const [bounds, setBounds] = useState(null);
    const [coordinates, setCoordinates] = useState({});
    // const map = useMap();

    // useEffect(() => {
    //     if (navigator.geolocation && map) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         const pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         map.setCenter(pos);
    //     });
    // } 
    // }, []);

    return (
        <div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }>
            <Header />
            <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                <GridItem bg='white'>
                    <List/>
                </GridItem>
                <GridItem>
                    <MyMap/>
                </GridItem>
            </Grid>
            </APIProvider>
        </div>
    );
};

export default MapPage;