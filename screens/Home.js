import React, {useState, useEffect} from 'react';
import {View,StatusBar,SafeAreaView,ActivityIndicator,FlatList,Text} from 'react-native';
import Header from '../components/Header';
import Shopping from '../components/ShoppingList/Shopping';
import ShoppingTitle from '../components/ShoppingTitle';
import MoreShopping from '../components/MoreShopping';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NullData from '../components/NullData';
import {SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DenemeModal from '../components/DenemeModal';

function Home({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [shopping, setShopping] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [mail, setMail] = useState('denme');
  const [tetik, setTetik] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [tabSelect, setTabSelect] = useState("1")
  const [accountUser, setAccountUser] = useState([])
  const [accoutID, setaccoutID] = useState(null)
  const [countShopping, setcountShopping] = useState(0)
  const [para, setPara]=useState(0);
  const [borc,setBorc]=useState(0)
  const [toplam, setToplam] = useState(0)

 
  const SalesCal = (data,username)=>{
    let count=0,borc=0,toplam=0;
    
      for (let i=0; i<data.length; i++) {
        //if(data[i].email==username)
        toplam+=data[i].sales; 
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
      setBorc(borc);
      setToplam(toplam);
  }
  useEffect(() => {
    getData();
  }, [tetik]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.log('getData ID: ', value);
        setMail(value);
        UserInfo(value);
      } else {
        setTetik(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  const UserInfo = (value) => {
    console.log('Value ID: ', value);
    const subscriber = firestore()
      .collection('Users')
      .doc(value)
      .onSnapshot((querySnapshot) => {
        setUserInfo(querySnapshot.data());
        if (
          querySnapshot.data() &&
          querySnapshot.data().name === 'User'
        ) {
          navigation.replace('ProfilePhoto', {
            mail: querySnapshot.data().email,
            buton: 'Kaydet',
          });
        }
        if (
          querySnapshot.data() &&
          querySnapshot.data().hesapID === 'null'
        ) {
          navigation.replace('Entry', {
            mail: querySnapshot.data().email,
            buton: 'Kaydet',
          });
        }
        ShoppingData(querySnapshot.data().hesapID,querySnapshot.data().email, '1' );
        setaccoutID(querySnapshot.data().hesapID)
        setTrigger(true);
      });
    return () => subscriber();
  };

  const ShoppingData = (hesapID,email,tab)=>
{
    const subscriber = firestore()
      .collection('accounts')
      .doc(hesapID)
      .collection('shopping')
      .where('type','==',tab)
      // Limit results
      .limit(20)
      .onSnapshot((querySnapshot) => {
        const shops = [];
        querySnapshot.forEach((documentSnapshot) => {
          shops.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setShopping(shops);
        setLoading(false);
        setTabSelect(tab)
        ShoppingDataCount(hesapID)
        SalesCal(shops, email)
      });
   
  };

  const ShoppingDataCount = (hesapID)=>
  {
      const subscriber = firestore()
        .collection('accounts')
        .doc(hesapID)
        .collection('shopping')
        // Limit results
        .limit(20)
        .onSnapshot((querySnapshot) => {
          const shops = [];
          querySnapshot.forEach((documentSnapshot) => {
            shops.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setcountShopping(shops)
          setLoading(false);
        });
     
    };

  useEffect(() => {
    const subscriber = firestore()
      .collection('accounts')
      .doc(userInfo.hesapID)
      .collection('users')
      .orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setAccountUser(users);
      });
    return () => subscriber();
  }, [trigger]);


  

  if (loading) {
    return (
      <View
        style={{
          height: SIZES.height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#4e9b8f" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={'#4e9b8f'} barStyle="light-content" />
      <SafeAreaView backgroundColor="#4e9b8f" />
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{flex: 1, maxWidth: SIZES.width}}>
          <View style={{width: '100%', backgroundColor: '#4e9b8f'}}>
            <Header
              closeButton={null}
              username={userInfo && userInfo.email}
              userInfo={userInfo}
              data={countShopping}
              butonPress={()=> navigation.navigate('Profile', {user:userInfo})}
            />
          </View>
          <View
            style={{
              paddingVertical: 0,
              width: '100%',
              backgroundColor: '#f1f1f1',
            }}>
              <View>
                <DenemeModal/>
              </View>
              <View style={{margin:5, flexDirection:'row', justifyContent:'space-around', width:'100%'}}>
                      <TouchableOpacity onPress={()=>ShoppingData(accoutID,userInfo.email,'1')} style={{ 
                        flexDirection:'row', alignItems:'center',
                        width:'100%', padding:10, paddingHorizontal:20, borderBottomColor:tabSelect=='1'?'#4e9b8f': '#f1f1f1',borderBottomWidth:tabSelect=='1'?2:0, borderRadius:0}} >
                      <Icon name={"shopping-cart"} size={16} color={'#4e9b8f'}/>
                      <Text style={{color:'black', fontFamily:tabSelect=='1'? 'GoogleSans-Bold':'GoogleSans-Regular', paddingLeft:5}} >
                          Alışverişler
                        </Text>
                      </TouchableOpacity  >
                      <TouchableOpacity onPress={()=>ShoppingData(accoutID,userInfo.email,'2')} style={{flexDirection:'row', alignItems:'center',padding:10, paddingHorizontal:20, borderBottomColor:tabSelect=='2'?'#4e9b8f': '#f1f1f1',borderBottomWidth:tabSelect=='2'?2:0, borderRadius:0}} >
                      <Icon name={"clipboard"} size={16} color={'#4e9b8f'}/>
                      <Text style={{color:'black', fontFamily:tabSelect=='2'? 'GoogleSans-Bold':'GoogleSans-Regular', paddingLeft:5}} >
                          Faturalar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>ShoppingData(accoutID,userInfo.email,'3')} style={{flexDirection:'row', alignItems:'center',padding:10, paddingHorizontal:20, borderBottomColor:tabSelect=='3'?'#4e9b8f': '#f1f1f1',borderBottomWidth:tabSelect=='3'?2:0, borderRadius:0}} >
                      <Icon name={"lira-sign"} size={16} color={'#4e9b8f'}/>
                        <Text style={{color:'black', fontFamily:tabSelect=='3'? 'GoogleSans-Bold':'GoogleSans-Regular', paddingLeft:5}} >
                          Tahsilatlar
                        </Text>
                      </TouchableOpacity>
                  </View>
            {!shopping.length>0 ? (
              <NullData type={tabSelect} />
            ) : (
              <FlatList
                data={shopping}
                style={{height:'80%'}}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                <View style={{flexDirection:'column', justifyContent:'space-between', padding:10,marginTop:10, paddingBottom:180}} >
                     <Text style={{fontFamily:'GoogleSans-Bold',color:'#555', fontSize:18, paddingBottom:5}}>Sayfa Toplamı</Text>
                     <View style={{flexDirection:'row', justifyContent:'space-between', padding:1}} >
                      <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:14}}>Toplam Harcanan Tutar  </Text>
                      <Text style={{fontFamily:'GoogleSans-Bold',color:'#555', fontSize:14}}> {toplam.toFixed(2)} ₺</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', padding:1}} >
                      <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:14}}>Alacak Tutar </Text>
                      <Text style={{fontFamily:'GoogleSans-Bold',color:'#555', fontSize:14}}> {para.toFixed(2)} ₺</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', padding:1}} >
                      <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:14}}>Borç Tutarı </Text>
                      <Text style={{fontFamily:'GoogleSans-Bold',color:'#555', fontSize:14}}> {borc.toFixed(2)} ₺</Text>
                    </View>
                    {(para-borc)!==0 && <View style={{flexDirection:'row', justifyContent:'space-between', padding:1}} >
                      <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:14}}>Fark</Text>
                      <Text style={{fontFamily:'GoogleSans-Bold',color:'#555', fontSize:14}}>{(para-borc)<1?'':'+'}{(para-borc).toFixed(2)} ₺</Text>
                    </View>}
                   

                </View>
              }
                ListHeaderComponent={<ShoppingTitle  length={shopping.length} />}
                renderItem={({item}) => (
                  <Shopping userName={userInfo && userInfo.name} data={item}/>
                )}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}

export default Home;
