"use client";
import React, { useState, useEffect , useRef } from 'react';

import { 
    APIProvider, 
    Map,
    useMap,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useCallback
} from '@vis.gl/react-google-maps';

import { getData } from '../../firebase/clientApp';
import { useStudios } from '../../../contexts/studiosContext';

const MyMap = (x) => {
    // const defaultCoordinates = { lat: 1.3521, lng: 103.8198 }; // Singapore coordinates
    // const [coords, setCoords] = useState([1.3521, 103.8198]);
    // const [ north, setNorth ] = useState([1.3900692049787553, (103.78181992034912+103.85778007965088)/2]);

    const handleCameraChange = (ev) => {
        const details = ev.detail
        // const Northeast = new firebase.firestore.Geopoint(bounds.north, bounds.east);
        // const Southwest = new firebase.firestore.Geopoint(bounds.south, bounds.west);
        console.log('camera changed: ', details);
        x.setCoords([details.center.lat, details.center.lng]);
        x.setNorth([details.bounds.north, (details.bounds.east+details.bounds.west)/2]);
    };

    return (
        <div style={{ width: '100vh', height: '100vh' }}>
                <Map
                    defaultZoom={14}
                    defaultCenter={ {lat: 1.3521, lng: 103.8198} }
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    clickableIcons = {false}
                    disableDefaultUI={true}
                    style={{ width: '100%', height: '100%' }}
                    onCameraChanged={handleCameraChange}
                >
                    <Markers/>

                </Map>
        </div>
    );
};

export default MyMap;



const Markers = () => {
 
    const studios = useStudios();
    console.log('markers studios: ', studios)

    if (!Array.isArray(studios)) {
        return;
    }

    return (
        <div>
        {studios?.map((studio, index) => (
            <AdvancedMarker key={index} position={{ lat: studio.location.latitude, lng: studio.location.longitude }} />
        ))}
        </div>
    );
}