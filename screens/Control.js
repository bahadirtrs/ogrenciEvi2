import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import {SIZES, FONTS} from '../constants';
import firestore from '@react-native-firebase/firestore';


export default function Control({route, navigation}) {
const {username} = route.params;
const [shopping, setShopping] = useState([]);
const [userInfo, setUserInfo] = useState([])
const [accountUsers, setAccountUsers] = useState([])
   
useEffect(() => {
  UserInfo(username)
}, [])

const UserInfo = (usernameRes) => {
   const subscriber = firestore()
     .collection('Users')
     .doc(usernameRes)
     .onSnapshot((querySnapshot) => {
       setUserInfo(querySnapshot.data());
       AccountData(querySnapshot.data().hesapID)
     });
   return () => subscriber();
 };

 const AccountData = (hesapID) =>{
   const subscriber = firestore()
      .collection('accounts')
      .doc(hesapID)
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const shops = [];
        querySnapshot.forEach((documentSnapshot) => {
          shops.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setAccountUsers(shops);
        Then(shops)
      });
    return () => subscriber();

 }

 const Then = (data) =>{
    console.log("data", data)
 }












/*
   useEffect(() => {
      console.log("shopping",shopping);
      const subscriber = firestore()
        .collection('accounts')
        .doc("A24GK")
        .collection('shopping')
        .orderBy('dateOfRegistration', 'desc')
        .onSnapshot((querySnapshot) => {
          const shops = [];
          querySnapshot.forEach((documentSnapshot) => {
            shops.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setShopping(shops);
          console.log(shopping)
        });
      return () => subscriber();
    }, []);
*/

   return (
      <View style={{justifyContent:'center',alignItems:'center', height:SIZES.height}} >
         <SafeAreaView/>
         <Text style={{fontSize:30}} >Kullanıcılar</Text>
          <FlatList
                data={accountUsers}
                renderItem={({item}) => (
                  <Text>{item.name}</Text>
                )}
              />
      </View>
   )
}
