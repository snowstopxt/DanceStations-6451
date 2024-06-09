"use client";
import React, {Component} from 'react';

import { 
    APIProvider, 
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

const MapPage = () => {
    const position = {lat: 1.3521, lng: 103.8198};
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    return (
        <div>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }>
            <div style={{width: '100vw', height: '100vh'}}>
            <h1>Map Page</h1>
            <Map
            defaultZoom={15}
            defaultCenter={{lat: 1.3521, lng: 103.8198}}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
            disableDefaultUI={true}
            />
            
        </div>
        </APIProvider>
        </div>
    );
};

export default MapPage;