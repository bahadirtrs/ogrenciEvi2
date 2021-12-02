import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons"

import Icons from "react-native-vector-icons/FontAwesome5"
import {useNavigation} from '@react-navigation/native';
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')



 const HeaderListComponent = () =>{
return(
   <View>
      <View style={styles.headerComponent} > 
         <Text style={styles.showCaseTitle} >Konumunuza Göre</Text>
         <View style={{flexDirection:'row'}} >
            <Text>Tümü </Text>
            <Icons name={'angle-right'} size={18} color={'#000'}/>
         </View>
      </View>
   <Text style={{fontFamily:'GoogleSans-Regular', fontSize:11, paddingLeft:5, color:'#555'}}>Satılan ürünlerden sizin konumunuza yakın alanda olanları görün. </Text>
   </View>
)
 }

export default function ShowCase () {
   const navigation = useNavigation();
   const [products, setProducts]=useState([])
   
   useEffect(() => {
      const subscriber = firestore()
        .collection('store')
        .doc('product')
        .collection('active')
        .onSnapshot((querySnapshot) => {
          const products = [];
          querySnapshot.forEach((documentSnapshot) => {
            products.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setProducts(products);
          console.log(products)
        });
      return () => subscriber();
    }, []);


   return (
  <>
  <HeaderListComponent/>
      <FlatList
            data={products}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{flexDirection: 'row', paddingVertical:10, width:SIZES.width}}
            keyExtractor={(item) => item.key}
            renderItem={({item,index}) => (
               <View>
                  <TouchableOpacity onPress={()=>navigation.push('ProductDetail', {item:item})}  style={[styles.headerList]} >
                  <Image 
                        source={{uri: item.image?item.image:null}}
                        style={{
                           width:Dimensions.get('screen').width/2-10,
                           height:Dimensions.get('screen').width/2-10,
                           borderTopLeftRadius:5,
                           borderTopRightRadius:5,
                           borderWidth:0.5,
                           borderColor:'#88888890'
                        }}

                     />
                  <View style={{ width:Dimensions.get('screen').width/2-10,justifyContent:'center', alignItems:'flex-start',  backgroundColor:'#00000090', padding:5, borderBottomLeftRadius:5, borderBottomRightRadius:5}} >
                     <Text style={{color:'#fff', fontFamily:'GoogleSans-Regular'}} > {item.title} </Text>
                     <View style={{flexDirection:'row', alignItems:'center', marginTop:3}} >
                         <Icon name={'location-outline'} size={10} color={'#fff'}/>
                         <Text style={{color:'#fff', fontFamily:'GoogleSans-Regular', fontSize:11,}} > {item.location} </Text>
                     </View>
                  </View>
                  </TouchableOpacity >
                  <View style={{position:'absolute', top:20, right:10, backgroundColor:'#00000090', padding:5, borderRadius:5}} >
                     <Text style={{color:'#fff', fontFamily:'GoogleSans-Medium'}} > {item.sales} TL </Text>
                  </View>

                  
               </View>
            )}
         />
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

   headerList: {
      justifyContent:'center',
      alignItems:'center',
      width:Dimensions.get('screen').width/2-10,
      height:Dimensions.get('screen').width/1.7,
      marginVertical:5,
      marginHorizontal:5,
   
   },
   itemTitle:{
      textAlign:'center',
      fontSize:12,
      fontFamily:'GoogleSans-Regular',
   },
   headerComponent:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:Dimensions.get('screen').width,
      paddingVertical:3,
      paddingHorizontal:5,
      marginTop:20,
   },
   showCaseTitle:{
      fontFamily:'GoogleSans-Medium',
      fontSize:18,
   }
})