import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar } from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function ToDoList ({route, navigation}) {
   const [trigger, setTrigger] = useState(true);
   const [notificationList, setNotificationList] = useState([]);
   
   useEffect(() => {
      isGetData();
    }, [trigger]);
  
    const isGetData = async () => {
      try { // AsyncStorage'dan Mail adresi(uniqID) value değişkenine kaydedilir.
         const value = await AsyncStorage.getItem('username');
         if (value !== null) {
            firestore()
            .collection('Users')
            .doc(value)
            .onSnapshot((querySnapshot) => {
               // username ile HesapID çekilerek bildirimleri listeleme fonksiyonuna
               // parametre olarak gönderilir. Bu fonksiyon tüm bildirimleri çeker ve State'e kaydeder.
            allNotification(querySnapshot.data().hesapID);
            })
         }else{
            setTrigger(false);
         }
      }catch(e){console.log(e)}
    };

    const allNotification = (hesapID) =>{
      try { // Tüm Bildirimleri Listeleme fonksiyonu
         firestore()
         .collection('accounts')
         .doc(hesapID)
         .collection('notification')
         .orderBy('date', 'desc') // Tarihe göre azalan sıralama
         .onSnapshot((querySnapshot) => {
            const isNotification = [];
            querySnapshot.forEach((documentSnapshot) => {
               isNotification.push({
                  key: documentSnapshot.id,
                  ...documentSnapshot.data(),
               });
            });
            setNotificationList(isNotification);
         });
      } catch(e){console.log(e)}
    }

   return (
      <View>
         <SafeAreaView backgroundColor={COLORS.lightGreen} barStyle="light-content" />
         <StatusBar backgroundColor={COLORS.lightGreen} barStyle="light-content"/>
         <View style={{backgroundColor:COLORS.lightGreen, paddingVertical:5, marginBottom:10}} >
            <Text style={{fontSize:30, ...FONTS.medium, color:'#f8f8f8', width:SIZES.width, textAlign:'center', paddingBottom:10, paddingVertical:20}}>Bildirimler</Text>
         </View>
        
         <FlatList
            data={notificationList}
            style={{ height:SIZES.height, flexDirection: 'row', paddingHorizontal:0, width:SIZES.width}}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', flexWrap:'wrap', paddingVertical:12, paddingHorizontal:20, borderBottomColor:'#ddd', borderBottomWidth:1 }}>
               <View style={{paddingRight:5}} >
                  <Image source={{uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+item.userimage+'.jpg'}} style={{width:45, height:45, borderRadius:25, borderWidth:1, borderColor:'#888'}}/>
               </View>
               <View style={{width:SIZES.width-85}} >
                  <Text style={{...FONTS.regular, fontSize:12, paddingBottom:2}} > 
                     <Text style={{...FONTS.bold}} >{item.name}</Text>
                        {' tarafından '} 
                        <Text style={{...FONTS.bold}} >{item.sales}</Text>
                       {'₺ tutarında harcama yapıldı.'}
                  </Text>
                  <Text style={{...FONTS.regular, fontSize:13}}>
                     {item.date ? moment(item.date.toDate()).startOf('minutes').fromNow():null} - {item.shopingName}
                  </Text>
               </View>
            </View>
            )}
         />
      </View>
   )
}
