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

export default function Blog ({route, navigation}) {
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


   return (
      <>
      <SafeAreaView  backgroundColor={'#f8f8f8'} />
      <StatusBar backgroundColor={'#f8f8f8'} barStyle={'dark-content'} />
      <View style={{justifyContent:'flex-start', alignItems:'center'}} >
      <TabBar userInfo={'userInfo'} placeholder='Yazılar içerisinde ara' />
          <FlatList
            data={blog}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{flexDirection: 'row', paddingVertical:10, width:SIZES.width}}
            keyExtractor={(item) => item.key}
            renderItem={({item,index}) => (
               <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.push('BlogText', {data:item})}  >
                  <Image 
                        source={{uri: item.image?item.image:null}}
                        style={{
                           width:90,
                           height:70,
                           borderRadius:6,
                           borderWidth:1,
                           borderColor:'#00000020', 
                           marginLeft:3,
                           marginRight:10,
                        }}

                     />
                     <View style={{width:SIZES.width-120}} >
                        <Text style={{fontSize:16, fontFamily:'GoogleSans-Medium'}}numberOfLines={1}>{item.title} </Text>
                        <Text style={{fontSize:12, fontFamily:'GoogleSans-Regular'}} numberOfLines={3}>{item.description}  </Text>
                     </View>
               </TouchableOpacity>
            )}
         />
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
   itemContainer:{
      width:SIZES.width-20, 
      borderRadius:5, 
      flexDirection:'row', 
      backgroundColor:'#f1f1f1', 
      paddingVertical:10, 
      marginHorizontal:10, 
      borderBottomWidth:1, 
      borderBottomColor:'#33333330'
   }

})