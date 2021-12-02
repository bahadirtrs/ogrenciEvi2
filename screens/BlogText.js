import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from '../components/Store/TabBar';
import Icon from "react-native-vector-icons/Ionicons"
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function BlogText ({route, navigation}) {
   const {data}=route.params;
   const [blog, setBlog]=useState([])

   useEffect(() => {
      const subscriber = firestore()
        .collection('blog')
        .orderBy('id', 'asc')
        .onSnapshot((querySnapshot) => {
          const blog = [];
          querySnapshot.forEach((documentSnapshot) => {
            blog.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setBlog(blog);
          console.log(blog)
        });
      return () => subscriber();
    }, []);

    const TextArea =({item})=>{
      return(
         <View style={{paddingTop:10}}>
         {item.indexOf('http') > -1
         ? <Image source={{uri: item?item:null}} style={styles.image}/>
         : item.length>60
            ? <Text style={{fontFamily:'GoogleSans-Regular', color:'#333', lineHeight:21}}>{item}</Text>
            : <Text style={{fontFamily:'GoogleSans-Medium', color:'#333', fontSize:18}}>{item}</Text>
         }
      </View>
      )
    }

   const SocialIcon = ({icon,color})=>{
      return(
         <TouchableOpacity style={{padding:5, paddingLeft:0}} >
            <Icon name={icon} size={30} color={color}/>
         </TouchableOpacity>

      )
   }

   const SocialArea = ()=>{
      return(
         <View style={{flexDirection:'row'}} >
            <SocialIcon icon={'logo-foursquare'} color={'rgb(223,83,116)'}/>
            <SocialIcon icon={'logo-instagram'} color={'rgb(162,59,61)'} />
            <SocialIcon icon={'logo-twitter'} color={'rgb(80,161,210)'} />
            <SocialIcon icon={'logo-linkedin'} color={'rgb(51,117,171)'} />
            <SocialIcon icon={'logo-whatsapp'} color={'rgb(80,160,53)'} />
            <SocialIcon icon={'logo-google'} color={'rgb(201,90,76)'} />
         </View>
      )
   }
   return (
      <>
      <SafeAreaView/>
      <StatusBar backgroundColor={'#f8f8f8'} barStyle={'dark-content'} />
      <View style={{justifyContent:'flex-start', alignItems:'center'}} >
          <View style={styles.backButtonContainer} >
           <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()} >
             <Icon name={'chevron-back-outline'} size={18} color={'#fff'}/>
           </TouchableOpacity>
         <Text style={styles.title}>  </Text>
        </View>
         <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <Image source={{uri: data.image?data.image:null}} style={styles.image}/>
            <Text style={styles.title} > {data.title} </Text>
            <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:5}} >
               <View style={{flexDirection:'row', alignItems:'center'}} >
               <Icon name={'person-circle-outline'} size={16} color={'#000'}/>
                  <Text style={{fontFamily:'GoogleSans-Regular', fontSize:12}}> {data.ownerName} </Text>
               </View>
               <Text>{'   '} </Text>
               <Icon name={'calendar-outline'} size={16} color={'#000'}/>
               <Text style={styles.date}>
                  {' '}
                  {data.date && moment(data.date).format('LL')}{' '}
                  {data.date && moment(data.date).format('dddd')}{' '}
               </Text>
            </View>
            <View style={{paddingHorizontal:8, paddingVertical:10, marginBottom:100}} >
            <FlatList
            data={data.text}
            scrollEnabled={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
               <TextArea item={item}/> 
         )}
         />
       
           <View style={{ justifyContent:'center', alignItems:'center', paddingHorizontal:15, paddingVertical:15}} >
               <Text style={{fontFamily:'GoogleSans-Regular', fontSize:14, color:'#333'}}>Bu yazıyı arkadaşlarınla paylaş!</Text>
               <View style={{flexDirection:'row', paddingVertical:1, paddingHorizontal:5}}>
                  <SocialArea/>
               </View>
            </View>
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
   title:{
      fontFamily:'GoogleSans-Regular',
      fontSize:24,
      paddingVertical:10,
      paddingHorizontal:2,
      paddingBottom:0,
   },
   date:{
      fontSize:10, 
      ...FONTS.regular, 
      color:'#333', 
  },

  backButtonContainer:{
     zIndex:1,
     top:25, 
     position:'absolute', 
     width:Dimensions.get('screen').width, 
     paddingVertical:10, 
     flexDirection:'row', 
     alignItems:'center', 
     justifyContent:'flex-start'
   },

  backButton:{ 
     flexDirection:'row', 
     alignItems:'center', 
     justifyContent:'center', 
     width:30, 
     height:30,
     backgroundColor:'#00000070', 
     marginHorizontal:10, 
     padding:5, 
     borderRadius:20
   },
   image:{
      width:SIZES.width-20,
      height:SIZES.width*0.6,
      borderRadius:3,
      borderWidth:1,
      borderColor:'#00000020', 
      marginLeft:3,
      marginRight:10,
   },
   image:{
      width:SIZES.width,
      height:SIZES.width*0.6,
      borderWidth:1,
      borderColor:'#00000020', 
   }

})