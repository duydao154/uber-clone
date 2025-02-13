import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';


const data = [
  {
      id: '123',
      title: 'Get a ride',
      image:'https://links.papareact.com/3pn',
      screen: 'MapScreen'
  },
  {
    id: '456',
    title: 'Order Food',
    image:'https://links.papareact.com/28w',
    screen: 'EatsScreen',
},
];


const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
   <FlatList
   data={data}
   horizontal
   keyExtractor={(item) => item.id }
   renderItem= { ({ item }) => (
       <TouchableOpacity
       onPress={() => navigation.navigate(item.screen)}
       style={[tw`p-4 pl-4 pb-4 pt-4 bg-gray-200 m-2 w-40 h-56`]}
       disabled={!origin}
       >
             <View style= {[{height: 100}, tw`${!origin && "opacity-20"}`]}>
                 <Image 
                 style = {[{width:100, height:100, resizeMode: 'contain'}]}
                 source= {{uri: item.image}}
                 />
                 <Text style= {tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                 <Icon 
                 type='antdesign'
                 name='arrowright'
                 color='white'
                 style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                 />
             </View>
       </TouchableOpacity>
  )}
   />
  )
}

export default NavOptions

const styles = StyleSheet.create({})