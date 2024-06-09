"use client";
import React, {Component} from 'react';

import { 
    APIProvider, 
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

const MyMap = () => {
    const position = {lat: 1.3521, lng: 103.8198};
    
    
    return (
        <div style={{ width: '100vh', height: '100vh' }}>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }>
                <Map
                    defaultZoom={15}
                    defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    disableDefaultUI={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </APIProvider>
        </div>
    );
};

export default MyMap;