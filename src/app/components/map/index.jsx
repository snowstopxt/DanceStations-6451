"use client";
import React, { useState, useEffect }from 'react';

import { 
    APIProvider, 
    Map,
    useMap,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

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
                    onChildClick={''}
                />
        </div>
    );
};

export default MyMap;