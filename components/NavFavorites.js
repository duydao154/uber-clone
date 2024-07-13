import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setDestination,setOrigin } from '../slices/navSlice'

const NavFavorites = (props) => {
    const currentScreen = props.route
    console.log(props.route);
    const data = [
        {
            id: '123',
            icon: 'home',
            location:"Home",
            destination: 'Duisburg, Germany'
        },
        {
            id: '345',
            icon: 'briefcase',
            location:"Work",
            destination: 'Düsseldorf, Germany'
        }
    ] 
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
  return (
     
    <FlatList
    data= {data}
    keyExtractor={(item) => item.id}
    ItemSeparatorComponent= {() => (
        <View
        style= {[tw`bg-gray-200`, {height: 0.5}]}></View>
    )}
    
    renderItem = {({item: {location,destination,icon}} ) => (
        <TouchableOpacity
        style={tw`flex-row items-center p-5`}
        onPress= {(data, details = null) => {
            console.log(currentScreen)
            if(currentScreen === 'HomeScreen'){
                dispatch(setDestination({
                    description: destination
                }))
                console.log(origin);
    
                dispatch(setDestination(null))
            } 
    
            if(props.route === 'NavigateCard'){
                dispatch(setDestination({
                    location: details.geometry.location,
                    description: data.description
                }))
                console.log(destination)
                navigation.navigate("RideOptionsCard")
            } 
        }}>
            <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size= {18}/>
            <View>
                <Text style={tw`font-bold text-lg`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
        </TouchableOpacity>
  )} />
  )
}

export default NavFavorites

const styles = StyleSheet.create({})