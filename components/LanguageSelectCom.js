import React, {useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../constants/theme';
import {useNavigation} from '@react-navigation/native';

export default function LanguageSelectCom() {
   const [lang, setLang] = useState()
   const navigation = useNavigation();

   useEffect(() => {
      AsyncStorage.getItem('language').then(deger =>{
         if(deger){
            setLang(deger)
         }
         })
   }, [])
   /* //Firebase ile dil değişimi
   firestore()
   .collection('language')
   .doc(uniqueId)
   .onSnapshot((querySnapshot) => {
       querySnapshot.data() &&
       querySnapshot.data().lang &&
       querySnapshot.data().lang=='en' 
       ? setLang('en')
       : setLang('tr')
   });

   const LanguageChange = (item)=>{
      firestore()
      .collection('language').doc(uniqueId)
      .update({
         lang:item,
      });
   }
   */

   const LanguageChange = async (item) =>{
      AsyncStorage.getItem('language').then(deger =>{
         if(deger!==item){
            AsyncStorage.removeItem("language");
            AsyncStorage.setItem('language', item);
         }else{
            AsyncStorage.setItem('language', item);
         }
         setLang(item)
         navigation.push('LogIn')
       });
     
   }
   return (
   <>
      <View style={{position:'absolute', top:0, right:0, paddingRight:20, paddingTop:15}} >
      {lang =='en'
      ? 
         <TouchableOpacity   onPress={()=>LanguageChange('tr')} >
            <Image style={{width:36, height:24, borderRadius:3, borderWidth:0, borderColor:'#888'}} source={require('../assets/images/en.png')  } />
            <Text style={{...FONTS.regular, fontSize:10, textAlign:'center'}}>English</Text>
          </TouchableOpacity>
      :
          <TouchableOpacity onPress={()=>LanguageChange('en')} >
            <Image style={{width:36, height:24, borderRadius:3,  borderWidth:0, borderColor:'#888'}} source={require('../assets/images/tr.png')  } />
            <Text style={{...FONTS.regular, fontSize:10, textAlign:'center'}}>Türkçe</Text>
            </TouchableOpacity>
         }
      </View>
      </>
   )
}
