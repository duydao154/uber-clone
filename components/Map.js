import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAP_API_KEY} from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    useEffect(() => {
        if(!origin || !destination) return;
         console.log("ORIGIN",origin);
         console.log("DES",destination);
        //Zoom and fit the markers
        if(origin && destination){
             mapRef.current.fitToSuppliedMarkers(['origin','destination'], {
            edgePadding: {top: 80, right: 80, bottom: 80, left: 80}
        });
        console.log("WORKING");
        }
       
        
    }, [origin,destination]); 



  return (
      <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        region={{
            latitude: origin.location.lat ? origin.location.lat : 40.665364,
            longitude:  origin.location.lng ?  origin.location.lng : -74.213377,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
    }}
        destination = {destination.description}
  >

    { origin && destination && (
        <MapViewDirections
        origin={origin.description}
        destination = {destination.description}
        apikey = {GOOGLE_MAP_API_KEY}
        strokeWidth={3}
        strokeColor="black"
        />
    )}

     {origin?.location && (
     <Marker
     coordinate={{
         latitude: origin.location.lat ,
        longitude:  origin.location.lng 
     }}
     title='Origin'
     description={origin.description}
     identifier="origin"
     />
     )}
          {destination?.location && (
     <Marker
     coordinate={{
         latitude: destination.location.lat ,
        longitude:  destination.location.lng 
     }}
     title='Destination'
     description={destination.description}
     identifier="destination"
     />
     )}
  </MapView>
    
  )
}

export default Map

const styles = StyleSheet.create({})