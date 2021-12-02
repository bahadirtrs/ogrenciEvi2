import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoriesItem from '../components/Store/CategoriesItem';
import ShowCase from '../components/Store/ShowCase';
import LocationProduct from '../components/Store/LocationProduct';
import TabBar from '../components/Store/TabBar';
import Icon from "react-native-vector-icons/Ionicons"
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function Store ({route, navigation}) {
   const [trigger, setTrigger] = useState(true);
   const [userInfo, setUserInfo] = useState([]);

   useEffect(() => {
      getData();
    }, [trigger]);
  
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          firestore()
            .collection('Users')
            .doc(value)
            .onSnapshot((querySnapshot) => {
              setUserInfo(querySnapshot.data());
              console.log(querySnapshot.data());
            });
        } else {
          setTrigger(false);
        }
      } catch (e) {
         alert(e)
      }
    };


   return (
      <>
      <SafeAreaView  backgroundColor={'#f8f8f8'} />
      <StatusBar backgroundColor={'#f8f8f8'} barStyle={'dark-content'} />
      <View style={{justifyContent:'flex-start', alignItems:'center'}} >
      <TabBar userInfo={userInfo} placeholder={"Mağazada ne aramak istersiniz?"} />
         <ScrollView
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
         >
         <CategoriesItem/>
         <View style={{width:Dimensions.get('screen').width, height:1, backgroundColor:'#88888830'}} />
         <ShowCase/>
         <View style={{width:Dimensions.get('screen').width, height:1, backgroundColor:'#88888830'}} />

         <LocationProduct/>
         <View style={{height:100}} />
         </ScrollView>
      </View>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
     width: SIZES.width,
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'flex-start',
     backgroundColor: COLORS.lightGreen,
   },

})