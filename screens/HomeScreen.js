import React from "react";
import { StyleSheet, Text, View, SafeAreaView,Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import { useRoute } from "@react-navigation/native";


const HomeScreen = () => {
    const dispatch = useDispatch(); 
    const route = useRoute();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
        <View style= {tw`p-5`}>
            <Image
            style = {{
                width:100, height:100, resizeMode: 'contain'
            }}
            source={{
                uri: "https://links.papareact.com/gzs"
            }}
            />
            <GooglePlacesAutocomplete
            styles={{
                container:{
                    flex:0,
                },
                textInput:{
                    fontSize: 15,
                }
            }}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data,details= null) => {
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))

                dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            query={{
                key: GOOGLE_MAP_API_KEY,
                language: 'en'
            }}
            placeholder="Where from?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400} /> 
        </View>
        <NavOptions/>
        <NavFavorites route={route.name}/>
        </SafeAreaView>
    )
}


export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue',
    },

    
})