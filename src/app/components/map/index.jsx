"use client";
import React, { useState, useCallback, useEffect , useRef } from 'react';

import { 
    APIProvider, 
    Map,
    useMap,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

import { getData } from '../../firebase/clientApp';
import { useStudios } from '../../../contexts/studiosContext';
import Minicard from '../minicard';


const MyMap = (x) => {
    // const defaultCoordinates = { lat: 1.3521, lng: 103.8198 }; // Singapore coordinates
    // const [coords, setCoords] = useState([1.3521, 103.8198]);
    // const [ north, setNorth ] = useState([1.3900692049787553, (103.78181992034912+103.85778007965088)/2]);

    const handleCameraChange = (ev) => {
        const details = ev.detail
        console.log('camera changed: ', details);
        x.setCoords([details.center.lat, details.center.lng]);
        x.setNorth([details.bounds.north, (details.bounds.east+details.bounds.west)/2]);
    };

    return (
        <div style={{ width: '100vh', height: '100vh' }}>
                <Map
                    defaultZoom={12}
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
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const studios = useStudios();
    console.log('markers studios: ', studios)


    if (!Array.isArray(studios)) {
        return;
    }

    return (
        <div>
        {studios?.map((studio, index) => (
            <MarkerWithInfoWindow studio={studio} key={index}/>
        ))}
        </div>
    );
}



const MarkerWithInfoWindow = (obj) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    
    const studio = obj.studio;
    console.log('info studio', obj.studio);
    // clicking the marker will toggle the infowindow
    const handleMarkerClick = useCallback(
      () => setInfoWindowShown(isShown => !isShown),
      []
    );
  
    // if the maps api closes the infowindow, we have to synchronize our state
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
  
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          position={{ lat: studio.location.latitude, lng: studio.location.longitude }}
          onClick={handleMarkerClick}
        />
  
        {infoWindowShown && (
          <InfoWindow anchor={marker} onClose={handleClose}>
            <Minicard studio={studio} />
          </InfoWindow>
        )}
      </>
    );
  };