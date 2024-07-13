import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_API_KEY} from "@env";
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation, useRoute } from '@react-navigation/native'
import NavFavorites from './NavFavorites'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
  return (
      <SafeAreaView style={tw`bg-white flex-1`}>
          <Text style= {tw`text-center py-5 text-xl`}>Morning, Duy</Text>
          <View style={tw`border-t border-gray-200 flex-shrink`}>
              <View>
                  <GooglePlacesAutocomplete
                  styles={toInputBoxStyles}
                  placeholder='Where to..?'
                  fetchDetails={true}
                  returnKeyType= {"search"}
                  enablePoweredByContainer={false}
                  minLength = {2}
                  query={{
                    key: GOOGLE_MAP_API_KEY,
                    language: 'en'
                }}
                  nearbyPlacesAPI='GooglePlacesSearch'
                  debounce={400}
                  onPress={(data,details = null) => {
                      dispatch(setDestination({
                          location: details.geometry.location,
                          description: data.description
                      })
                      );
                      
                      navigation.navigate("RideOptionsCard")
                  }}/>

                 
              </View>
              <NavFavorites route={route.name}/>
          </View>
      </SafeAreaView>
    
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        paddingTop: 20,
        flex:0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal:20,
        paddingBottom: 0,
    },
});