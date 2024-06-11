"use client";

import React, { useState, useEffect } from 'react';
import List from '../components/list/index';
import MyMap from '../components/map/index';
import { 
    APIProvider,
} from '@vis.gl/react-google-maps';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/index';
import { getData } from '../firebase/clientApp'

interface Studio {
    lat: number;
    lng: number;
    mrt: string;
    name: string;
    price: number;
    size: number;
  }

const MapPage = () => {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setStudios(data || []);
        };

        fetchData();
    }, []);


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