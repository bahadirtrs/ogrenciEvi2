import React, {useEffect,useState} from 'react'
import { View, Text,TouchableOpacity, StyleSheet,Image } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({data,username,userInfo, closeButton, butonPress}) {
    const [para, setPara]=useState(0);
    const [borc,setBorc]=useState(10)

    useEffect(() => {
        SalesCal()
    },)

    const SalesCal = ()=>{
      let count=0,borc=0;
        for (let i=0; i<data.length; i++) {
            for (let j=0; j<data[i].users.length; j++) {
                if(data[i].email==username){
                    if(data[i].users[j].email!=username){
                        if(data[i].users[j].selected==true){
                            count+=data[i].salesExp; 
                        }
                    } 
                }else{
                    if(data[i].users[j].email==username){
                        if(data[i].users[j].selected==true){
                            borc+=data[i].salesExp; 
                        }
                    } 
                }
            }
        } 
        setPara(count);
        setBorc(borc)
    }

    return (
    <View style={styles.container}>
        <View style={styles.profile}>
            <TouchableOpacity  onPress={butonPress} style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                { userInfo 
                ? <Image 
                    source={{
                    headers: {Pragma: 'no-cache'},
                    uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+userInfo.image+'.jpg'+ '?' + new Date()}}
                    style={{width: 40, height: 40, borderRadius:20, borderWidth:0.8, borderColor:'#fff'}} />
                : null
                 }
                <View style={{paddingLeft:10}}>
                    <Text style={styles.homeCode}>{userInfo && userInfo.name}</Text>
                    <Text style={styles.homeCode}>{userInfo && userInfo.hesapID}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={closeButton} >
              { /* <Text style={{...FONTS.regular, color:'#fff', fontSize:11}}>Çıkış </Text> */}
              <Icon  name="settings-outline" size={23} color="#f8f8f8"/>
            </TouchableOpacity> 
        </View> 
        {
        data && data!=''
        ? <View style={{flexDirection:'row'}}>
            <View style={styles.profileEnd}>
                <Text style={styles.amountTitle}>Toplam Alacak</Text>
                <Text style={styles.amount}>
                    {(para>99999
                     ? '+'+borc.toFixed(0).slice(0,5)
                     : para.toFixed(2)
                    )}₺
                </Text>
            </View> 
            <View style={styles.profileEndRight}>
                <Text style={styles.amountTitle}>Toplam Borç</Text>
                <Text style={styles.amount}>
                    {(borc>99999
                     ?  '+'+borc.toFixed(0).slice(0,5)
                     :  borc.toFixed(2)
                    )}₺                
                </Text>
            </View> 
          </View>
        :<View style={{flexDirection:'row'}}>
            <View style={[styles.profileEnd]}>
               <Text style={styles.amountTitle}>Alacağınız Tutar</Text>
                <Text style={styles.amountTitle2}>0 ₺</Text>
            </View> 
            <View style={styles.profileEndRight}>
                <Text style={styles.amountTitle}>Ödeyeceğiniz Tutar</Text>
                <Text style={styles.amountTitle2}>0 ₺</Text>
            </View> 
           
        </View>

        } 
       
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        backgroundColor:'#4e9b8f',
        paddingBottom:0
    },

    title:{ 
        ...FONTS.bold, 
        color: COLORS.primary,
        fontSize:30,
    },
    profile:{
        width:SIZES.width,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:20,
        paddingHorizontal:20,
        paddingVertical:10,
    },
    profileEnd:{
        width:SIZES.width/2,
        flexDirection:'column', 
        justifyContent:'space-between', 
        alignItems:'flex-start',
        paddingBottom:20,
        paddingHorizontal:20,
        paddingVertical:10,
    },
    profileEndRight:{
        width:SIZES.width/2,
        flexDirection:'column', 
        justifyContent:'space-between', 
        alignItems:'flex-end',
        paddingBottom:20,
        paddingHorizontal:20,
        paddingVertical:10,
    },

    homeCode:{
        ...FONTS.medium,
        fontSize:13,
        color:COLORS.white
    },
    amountTitle:{
        color:COLORS.white,
        fontSize:SIZES.h3,
        ...FONTS.regular
    },

    amountTitle2:{
        color:COLORS.white,
        fontSize:24,
        ...FONTS.bold,
        textAlign:'right'
    },
    amount:{
        fontSize:24,
        ...FONTS.medium,
        color:COLORS.white,
    },
    headerButton:{
        backgroundColor:'#f1f1f1',
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:5
    },

    butonText:{
        ...FONTS.regular,
        fontSize:SIZES.h3
    }
})