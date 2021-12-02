import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageUpload from '../components/ImageUpload';
import { COLORS, FONTS, SIZES } from "../constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Menu from '../components/Menu'
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')


function ProfileItem (props) {
   return(
      <TouchableOpacity style={{borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:10 ,}} >     
         <Text style={{...FONTS.medium, fontSize:15, color:'#222', paddingBottom:3}} >{props.text}</Text>
         <Text style={{...FONTS.regular, fontSize:15, color:'#222'}} >{props.textAns}</Text>
      </TouchableOpacity>
   )
}

function ProfileItemTwo (props) {
   return(
      <TouchableOpacity onPress={props.butonPress} style={{paddingVertical:3 ,}} >     
         <Text style={{...FONTS.medium, fontSize:15, color:'#222', paddingTop:3}} >{props.text}</Text>
      </TouchableOpacity>
   )
}

export default function Profile({route, navigation}) {
   const {user}=route.params;
   const removeItem = async () => {
      try {
        await AsyncStorage.removeItem('username');
        navigation.replace('LogIn');
      } catch (exception) {
        return false;
      }
    };

   return (
      <>
      <SafeAreaView backgroundColor={COLORS.lightGreen} />
      <View style={styles.container} >
         <Menu pageName={"Profil"} butonLeftPress={() => navigation.goBack()} butonRightPress={null}/>
            <ScrollView style={{flex:1, width:SIZES.width }} >
               <View style={{backgroundColor:COLORS.lightGreen}} >
                  <ImageUpload type={'profile'} image={user.image} profilePhotoName={user.image} mail={user.email} />
               </View>
               <View style={styles.body} >
                  <ProfileItem text={'İsim Soyisim: '}  textAns={user.name} /> 
                  <ProfileItem text={'Mail Adresi: '} textAns={user.email} /> 
                  <ProfileItem text={'Şifre: '} textAns={'********'} /> 
                  <ProfileItem text={'Kullanıcı Numarası: ' } textAns={user.refNumber}/> 
                  <ProfileItem text={'Ev Hesap No: '} textAns={user.hesapID}/> 
                  <ProfileItem text={'Uygulama Dili: '} textAns={'Türkçe'}/> 
                  <ProfileItem text={'Yaşadığı Şehir: '} textAns={'Hatay'}/> 
                  <ProfileItem text={'Kayıt Tarihi: '} textAns= {user.date && moment(user.date.toDate()).format('LLLL')}/> 
                  <ProfileItemTwo text={'Hesabı Kapat'} textAns={null}/>
                  <ProfileItemTwo text={'Çıkış Yap'} butonPress={()=>removeItem()}  textAns={null}/>
               </View>
            </ScrollView>
      </View>
      </>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      backgroundColor:COLORS.lightGreen
   },
   body:{
      flex:1,
      backgroundColor:'#f8f8f8',
      paddingVertical:20,
      paddingHorizontal:20,
      paddingBottom:200
   }
})
