
import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// referred to https://www.npmjs.com/package/google-maps-react

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

const MapPage = () => {
    return (
        <div>
            <h1>Map Page</h1>
        </div>
    );
};

export default MapPage;