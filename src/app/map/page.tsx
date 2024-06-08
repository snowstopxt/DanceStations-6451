"use client";
import React, {Component} from 'react';

import { 
    APIProvider, 
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

import NavSearch from '../components/searchInput/mainSearch/navSearch/index';
import MainSearch from '../components/searchInput/mainSearch/index';
/*
const Map = GoogleApiWrapper({
    apiKey: 'AIzaSyCfyy-Icn8NV2nmaxvxyxzT0LXJSdg5ICU'
})(props => (
    <div>
        <h1>Map</h1>
        <GoogleMap
            google={props.google}
            zoom={8}
            initialCenter={{ lat: 47.444, lng: -122.176}}
        >
            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: 37.778519, lng: -122.405640}} />
            <Marker
                name={'Dolores park'}
                position={{lat: 37.759703, lng: -122.428093}} />
            <Marker />
        </GoogleMap>
    </div>
))
*/

/*
//test
const Page = () => {
    return (
        <div className="flex-col w-full">
            <h1>Map Page</h1>
            <NavSearch />
            <MainSearch />
            <MapPage />
        </div>
    );
}
*/

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