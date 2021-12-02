import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, TextInput,StatusBar, StyleSheet, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import {COLORS, SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons"
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function ProductAdd ({route, navigation}) {
   const {userInfo} =route.params;
   const [categories, setCategories]=useState([])
   const [selectedCategory, setSelectedCategory]=useState()
   const [title, setTitle]=useState()
   const [sales, setSales]=useState()
   const [status, setStatus]=useState()
   const [location, setLocation]=useState()
   const [description, setDescription]=useState()
   const [image, setImage]=useState()

   const ProductAdd = () => {
     
      try {
         firestore()
         .collection('store')
         .doc("product")
         .collection('active')
         .doc()
         .set({
            title:title,
            sales:sales,
            status:status,
            location:location,
            description:description,
            categories:selectedCategory,
            image:image,
            date: firestore.FieldValue.serverTimestamp(), 
            productOwner:userInfo.name,
            ownerMail:userInfo.email
         })
         .then(() => {
            //alert("eklendi")
         });
     
      } catch (error) {
        // alert(error)
      }
       
    };

   
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
      <>
      <SafeAreaView  />
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
       showsHorizontalScrollIndicator={false}
       showsVerticalScrollIndicator={false}
       >
      <View style={{justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:5, paddingHorizontal:15}} >
      <View style={{width:Dimensions.get('screen').width, paddingVertical:10, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}} >
           <TouchableOpacity onPress={()=>navigation.goBack()} >
             <Icon name={'chevron-back-outline'} size={26} color={'#000'}/>
           </TouchableOpacity>
         <Text style={styles.title}>Ürün Detayları</Text>
        </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Fotoğraf yükle</Text>
            <View style={{flexDirection:'row', paddingVertical:10}} >
               <TouchableOpacity style={styles.productItems} >
                  <Icon name={'add-outline'} size={30} color={'#888'}/>
               </TouchableOpacity>
               <TouchableOpacity style={styles.productItems} >
                  <Icon name={'add-outline'} size={30} color={'#888'}/>
               </TouchableOpacity>
               <TouchableOpacity style={styles.productItems} >
                  <Icon name={'add-outline'} size={30} color={'#888'}/>
               </TouchableOpacity>
               <TouchableOpacity style={styles.productItems} >
                  <Icon name={'add-outline'} size={30} color={'#888'}/>
               </TouchableOpacity>
            </View>
         </View>
         <View style={{paddingVertical:20, height:240}} >
            <Text style={[styles.title,{fontSize:14}]}>  Kategori Seçiniz</Text>
            <FlatList
               data={categories}
               numColumns={3}
               scrollEnabled={false}
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
               style={{flexDirection: 'row', paddingVertical:10}}
               keyExtractor={(item) => item.key}
               renderItem={({item,index}) => (
                  <View>
                     <TouchableOpacity  onPress={()=>{setSelectedCategory(item.title)}} 
                        style={[
                           styles.headerList, 
                           {
                              backgroundColor:item.color,  
                              borderWidth:selectedCategory== item.title ? 3: 0
                              }]} >
                     <Text style={styles.itemTitle}> {item.title} </Text>
                     </TouchableOpacity>
                  </View>
               )}
            />
            <Text style={{fontSize:16, fontFamily:'GoogleSans-Medium'}} > Seçili Kategori: {selectedCategory} </Text>
         </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Başlık nedir?</Text>
            <TextInput
               placeholder='Ürünün ismini giriniz'
               style={styles.textInputStyle}
               placeholderTextColor={'#333'}
               value={title}
               onChangeText={(text)=> setTitle(text)}
            />
         </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Fiyat nedir?</Text>
            <TextInput
               placeholder='Ürünün fiyatını giriniz'
               style={styles.textInputStyle}
               placeholderTextColor={'#333'}
               value={sales}
               onChangeText={(text)=> setSales(text)}
            />
         </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Durum nedir?</Text>
            <TextInput
               placeholder='Ürünün durumunu giriniz'
               style={styles.textInputStyle}
               placeholderTextColor={'#333'}
               value={status}
               onChangeText={(text)=> setStatus(text)}
            />
         </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Konum nedir?</Text>
            <TextInput
               placeholder='Ürünün konumunu giriniz'
               style={styles.textInputStyle}
               placeholderTextColor={'#333'}
               value={location}
               onChangeText={(text)=> setLocation(text)}
            />
         </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Ürün Fotoğrafı</Text>
            <TextInput
               placeholder='Fotoğraf linkini giriniz'
               style={styles.textInputStyle}
               placeholderTextColor={'#333'}
               value={image}
               onChangeText={(text)=> setImage(text)}
            />
         </View>

         <View>
            <Text style={[styles.title,{fontSize:14}]}>  Açıklama yapınız?</Text>
            <TextInput
               placeholder='Ürün hakkında açıklama yapınız.'
               style={[styles.textInputStyle, {height:100, paddingTop:15 }]}
               placeholderTextColor={'#333'}
               value={description}
               onChangeText={(text)=> setDescription(text)}
               multiline={true}
            />
         </View>

         <View>
            <TouchableOpacity onPress={()=>ProductAdd()}  style={styles.button} >
               <Text style={styles.buttonTitle} >Ürünü Satışa Çıkar</Text>
            </TouchableOpacity>
         </View>

      </View>
      </ScrollView>
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

   title:{
      fontFamily:'GoogleSans-Medium',
      fontSize:18,
   },

   productItems:{
      justifyContent:'center',
      alignItems:'center',
      width:80,
      height:80,
      borderWidth:1,
      borderColor:'#888',
      borderRadius:10,
      margin:5,
   },

   headerList: {
      justifyContent:'center',
      alignItems:'center',
      borderRadius:15,
      marginVertical:5,
      marginHorizontal:5,
      borderColor:'#00000005'
      
   },
   itemTitle:{
      textAlign:'center',
      fontSize:13,
      fontFamily:'GoogleSans-Regular',
      color:'#fff',
      
      padding:10,
      paddingHorizontal:20,
      borderRadius:15,
   },
   textInputStyle:{
      width:Dimensions.get('screen').width-30, 
      borderWidth:0.3, 
      borderColor:'#bbb',
      borderRadius:5, 
      height:40, 
      paddingHorizontal:12,
      marginVertical:10,
      backgroundColor:'#ddd'
   }, 
   button:{
      marginBottom:100,
      width:Dimensions.get('screen').width-30,
      padding:10,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#118ab2',
      borderRadius:10,
   },
   buttonTitle:{
      fontFamily:'GoogleSans-Regular',
      color:'#fff',
      fontSize:16,
   }

})