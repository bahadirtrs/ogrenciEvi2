import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5"
import {useNavigation} from '@react-navigation/native';
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')



 const categoriesColor = {
   0:'#d9ed92',
   1:'#b5e48c',
   2:'#76c893',
   3:'#34a0a4',
   4:'#1a759f',
   5:'#1e6091',
   6:'#184e77',
 }

 const HeaderListComponent = () =>{
return(
   <View>
      <View style={styles.headerComponent} > 
         <Text style={styles.showCaseTitle} >Vitrindekiler</Text>
         <View style={{flexDirection:'row'}} >
            <Text>Tümü </Text>
            <Icon name={'angle-right'} size={18} color={'#000'}/>
         </View>
      </View>
   <Text style={{fontFamily:'GoogleSans-Regular', fontSize:11, paddingLeft:5, color:'#555'}}> Uygulama içerisinde en çok incelenen ürünleri inceleyebilirsiniz.</Text>
   </View>
)
 }


export default function ShowCase () {
   const [products, setProducts]=useState([])
   const navigation = useNavigation();
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
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{flexDirection: 'row', paddingVertical:10, width:SIZES.width}}
            keyExtractor={(item) => item.key}
            renderItem={({item,index}) => (
               <View>
                  <TouchableOpacity onPress={()=>navigation.push('ProductDetail', {item:item})} style={[styles.headerList, {backgroundColor:categoriesColor[6-index]}]} >
                     <Image 
                        source={{uri: item.image?item.image:null}}
                        style={{
                           width:120,
                           height:120,
                           borderRadius:8,
                           borderWidth:0.3,
                           borderColor:'#00000040'
                        }}

                     />

                  </TouchableOpacity>
                  <Text style={styles.itemTitle}>{' '}  {item.title} </Text>
                  <Text style={styles.itemTitleSales}>{' '}  {item.sales} TL</Text>

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
      width:120,
      height:120,
      marginVertical:5,
      marginHorizontal:5,
      borderRadius:10,
   },
   itemTitle:{
      textAlign:'left',
      fontSize:12,
      fontFamily:'GoogleSans-Regular',
      paddingTop:5,
      color:'#000'
   },
   itemTitleSales:{
      textAlign:'left',
      fontSize:12,
      fontFamily:'GoogleSans-Bold',
      paddingTop:5,
      color:'#000'
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