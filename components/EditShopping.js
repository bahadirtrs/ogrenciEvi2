import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import InfoAlert from '../components/InfoAlert'

export default function EditShopping(props) {
  const navigation=useNavigation();
  const Onay = ()=>{
     
    if(props.data.name===props.username){
    Alert.alert(
        "Uyarı!","Bu faturayı düzenlemek üzeresiniz.",
        [
          { text: "Düzenle",style: "cancel"},
          { text: "Vazgeç", onPress: () => DeleteShop(), }
        ]
      );
    }else{
      Alert.alert(
        "Uyarı!",`Bu harcama sana ait değil. Yalnızca ${props.data.name} düzenleyebilir.`,
        [
          { text: "Tamam",style: "cancel"},
       
        ]
        );
    }
  }
  const DeleteShop = ()=>{
 
    firestore()
    .collection('accounts').doc(props.data.hesapID)
    .collection('shopping').doc(props.data.key)
    .delete()
    .then(() => {
      navigation.push('Home',{data:props.data})
    });
    
  }
  return (
    <TouchableOpacity onPress={()=>Onay()} style={styles.container} >
        <Icon name={props.icon} size={25}  color ={'#fff'} solid />       
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      justifyContent:'flex-end',
      paddingLeft:10
    }
})

