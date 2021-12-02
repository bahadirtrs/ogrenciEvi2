import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, TextInput,StatusBar, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons"
import {useNavigation} from '@react-navigation/native';
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function Store ({userInfo, placeholder}) {
   const navigation = useNavigation();
   return (
      <>
      <SafeAreaView  />
      <View style={styles.container} >
         <Icon name={'person-circle-outline'} size={35} color={'#444'}/>
         <TextInput
            placeholder={placeholder?placeholder:'Ne aramak istersiniz?'}
            style={styles.textInputStyle}
         />
         <TouchableOpacity onPress={()=> navigation.push('ProductAdd', {userInfo:userInfo})} >
           <Icon name={'add-circle-outline'} size={35} color={'#000'}/>
         </TouchableOpacity>
      </View>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection:'row',
     width: SIZES.width,
     alignItems: 'center',
     justifyContent:'space-between',
     alignItems:'center',
     padding:10,
   },
   textInputStyle:{
      width:Dimensions.get('screen').width/1.4, 
      borderWidth:0.3, 
      borderColor:'#ddd',
      borderRadius:5, 
      paddingHorizontal:8,
      paddingVertical:8,
      backgroundColor:'#ddd'
   }

})