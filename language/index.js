import React, {useState, useEffect} from 'react'
import tr from './language-tr';
import en from './language-en';
import AsyncStorage from '@react-native-async-storage/async-storage';

 function LanguageSelect() {
   const [lang, setLang] = useState(tr)
   /* //Firebase ile dil değişimi
   useEffect(() => {
      firestore()
      .collection('language')
      .doc(uniqueId)
      .onSnapshot((querySnapshot) => {
          querySnapshot.data() &&
          querySnapshot.data().lang &&
          querySnapshot.data().lang=='en' 
          ? setLang(en)
          : setLang(tr)
          console.log("sorgu yapıldı")
      });
   }, [])
   */
useEffect(() => {
   LanguageChange()
}, [])
   const LanguageChange = async () =>{
      AsyncStorage.getItem('language').then(deger =>{
         if(deger==='en'){
            setLang(en)
         }else{
            setLang(tr)
         }
       });
   }
   return lang;
}
export default LanguageSelect;


