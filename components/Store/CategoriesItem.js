import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5"
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function CategoriesItem () {
   const [categories, setCategories]=useState([])
   
   useEffect(() => {
      const subscriber = firestore()
        .collection('store')
        .doc('categories')
        .collection('bilgisayar')
        .orderBy('id', 'asc')
        .onSnapshot((querySnapshot) => {
          const categories = [];
          querySnapshot.forEach((documentSnapshot) => {
            categories.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setCategories(categories);
          console.log(categories)
        });
      return () => subscriber();
    }, []);


   return (
  
      <FlatList
            data={categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{flexDirection: 'row', paddingVertical:10, width:SIZES.width}}
            keyExtractor={(item) => item.key}
            renderItem={({item,index}) => (
               <View>
                  <TouchableOpacity style={[styles.headerList, {backgroundColor:item.color}]} >
                    <Icon name={item.icon} size={22} color={'#fff'}/>
                  </TouchableOpacity>
                  <Text style={styles.itemTitle}> {item.title} </Text>
               </View>
            )}
         />
  
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

   headerList: {
      justifyContent:'center',
      alignItems:'center',
      width:65,
      height:65,
      marginVertical:10,
      marginHorizontal:12,
      borderRadius:50,
   },
   itemTitle:{
      textAlign:'center',
      fontSize:12,
      fontFamily:'GoogleSans-Regular',
   }
})