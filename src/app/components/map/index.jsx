"use client";
import React, { useState, useEffect , useRef } from 'react';

import { 
    APIProvider, 
    Map,
    useMap,
    Marker,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

import { getData } from '../../firebase/clientApp';

const MyMap = () => {
    const defaultCoordinates = { lat: 1.3521, lng: 103.8198 }; // Singapore coordinates

    return (
        <div style={{ width: '100vh', height: '100vh' }}>
                <Map
                    defaultZoom={14}
                    defaultCenter={defaultCoordinates}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    disableDefaultUI={true}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Markers/>


                </Map>
        </div>
    );
};

export default MyMap;


const Markers = () => {
    const [studios, setStudios] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setStudios(data);
        };

        fetchData();
    }, []);

    return (
        <div>
        {studios.map((studio, index) => (
            <Marker key={index} position={{ lat: studio.lat, lng: studio.lng }} />
        ))}
        </div>
    );
}