import React, {useEffect} from 'react'
import { View, Text, SafeAreaView, Image,StatusBar, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import {COLORS,SIZES} from '../constants';
import Icon from "react-native-vector-icons/Ionicons"
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

const ProductInfoItem = ({title,text})=>{
   return(
      <View style={{paddingVertical:5, paddingHorizontal:5}} >
         <Text style={{fontFamily:'GoogleSans-Regular'}} >  
            <Text style={{fontFamily:'GoogleSans-Bold'}} >{title}: </Text> 
               {text} 
            </Text>
      </View>
   )
}

export default function ProductDetail ({route, navigation}) {
   const {item} =route.params;
   return (
      <>
      <SafeAreaView/>
      <StatusBar backgroundColor={'#f8f8f8'} barStyle={'dark-content'} />
      <View style={{justifyContent:'flex-start', alignItems:'center'}} >
        
         <View style={{width:Dimensions.get('screen').width, paddingVertical:10, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}} >
           <TouchableOpacity onPress={()=>navigation.goBack()} >
             <Icon name={'chevron-back-outline'} size={26} color={'#000'}/>
           </TouchableOpacity>
         <Text style={styles.title}>Ürün Detayları</Text>
        </View>

        <ScrollView
           showsHorizontalScrollIndicator={false}
           showsVerticalScrollIndicator={false}
         >
         <Image 
            source={{uri: item.image?item.image:null}}
            style={{
               width:Dimensions.get('screen').width,
               height:Dimensions.get('screen').width,
               marginBottom:20
            }}
         />
         <View style={{flexDirection:'row', justifyContent:'space-between'}}>
         <Text style={{fontSize:28, fontFamily:'GoogleSans-Bold'}}> ₺{item.sales}</Text>
         <TouchableOpacity style={{backgroundColor:'#00000050', marginRight:20, justifyContent:'center', alignItems:'center', paddingHorizontal:15, borderRadius:10}} >
            <Text style={{fontSize:12, fontFamily:'GoogleSans-Regular'}}> {item.categories}</Text>
         </TouchableOpacity>

         </View>
         <ProductInfoItem title={"Ürün adı"} text={item.title} />
         <ProductInfoItem title={"Ürün Durumu"} text={item.status} />
         <ProductInfoItem title={"Konum"} text={item.location} />
         <ProductInfoItem title={"Ürün Açıklaması"} text={item.description}/>

            <View style={{width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', paddingVertical:20, paddingHorizontal:10}} >
               <View>
                  <Image 
                  source={{
                  headers: {Pragma: 'no-cache'},
                  uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/p'+item?.ownerMail+'.jpg'}}
                  style={styles.imageSelected}  
               />
               </View>
               <View style={{width:Dimensions.get('screen').width-80, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
  
                  <View>
                     <Text style={{fontFamily:'GoogleSans-Medium', fontSize:14}}>  {item.productOwner}</Text>
                     <View style={{flexDirection:'row', paddingVertical:1, paddingHorizontal:5}} >
                     <Icon name={'star'} size={16} color={'#e9c46a'}/>
                     <Icon name={'star'} size={16} color={'#e9c46a'}/>
                     <Icon name={'star'} size={16} color={'#e9c46a'}/>
                     <Icon name={'star'} size={16} color={'#e9c46a'}/>
                     <Icon name={'star-half'} size={16} color={'#e9c46a'}/>
                     </View>
                  </View>
                  <View>
                     <Icon name={'chevron-forward'} size={27} color={'#000'}/>
                  </View>
               </View>
            </View>

            <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center'}} >
            <Image 
               source={{uri:'https://cdn.motor1.com/images/mgl/ZeYKN/s3/google-maps.jpg'}}
               style={{
                  width:Dimensions.get('screen').width-30,
                  height:Dimensions.get('screen').width*0.4,
                  marginBottom:20,
                  borderRadius:15,
                  borderWidth:1,
                  borderColor:'#00000020'
               }}
            />
            </View>

            <View style={{paddingHorizontal:15}} >
               <Text style={{fontFamily:'GoogleSans-Regular', fontSize:16, color:'#333'}}>   Bu ürünü paylaş</Text>
               <View style={{flexDirection:'row', paddingVertical:1, paddingHorizontal:5}}>
                  <TouchableOpacity style={{padding:5, paddingLeft:0}} >
                     <Icon name={'logo-foursquare'} size={30} color={'rgb(223,83,116)'}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:5}} >
                     <Icon name={'logo-instagram'} size={30} color={'rgb(162,59,61)'}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:5}} >
                     <Icon name={'logo-twitter'} size={30} color={'rgb(80,161,210)'}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:5}} >
                     <Icon name={'logo-linkedin'} size={30} color={'rgb(51,117,171)'}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:5}} >
                     <Icon name={'logo-whatsapp'} size={30} color={'rgb(80,160,53)'}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:5}} >
                     <Icon name={'logo-google'} size={30} color={'rgb(201,90,76)'}/>
                  </TouchableOpacity>

               </View>
            </View>
         <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center'}} >
            <TouchableOpacity  style={styles.button} >
               <Text style={styles.buttonTitle} >Satıcı ile iletişime geç</Text>
            </TouchableOpacity>
         </View>
         </ScrollView>
      </View>
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

   imageSelected:{ 
      width:50, 
      height:50, 
      margin:0, 
      borderRadius:5, 
      borderWidth:0.5, 
      borderRadius:35, 
      borderColor:'#4e9b8f'
  },

   button:{
      marginBottom:100,
      marginTop:20,
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
   },
   title:{
      fontFamily:'GoogleSans-Medium',
      fontSize:15,
   },

})