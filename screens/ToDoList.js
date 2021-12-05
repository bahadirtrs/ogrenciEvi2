import React, {useState,useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image,StatusBar, Dimensions } from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import 'moment/locale/tr'  
import { TouchableOpacity } from 'react-native-gesture-handler';
import TodoAddModal from '../components/TodoAddModal'
import Icon from 'react-native-vector-icons/Ionicons';
import InfoAlert from '../components/InfoAlert';
import SubmitButton from '../components/Button/SubmitButton'
moment.locale('tr')
let list = ['null'];

export default function Notification ({route, navigation}) {
   const [trigger, setTrigger] = useState(true);
   const [notificationList, setNotificationList] = useState([]);
   const [deneme, setDeneme] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [userData, setUserData] = useState([]);
   const [element, setElement] = useState([])
   const [info, setInfo] = useState(null);
   const [modal, setModal] = useState(false);
   const [modalType, setModalType] = useState(null)
   const [todoKey, setTodoKey] = useState("")
   
   useEffect(() => {
      list=[]
      isGetData();
    }, [trigger]);
  
    const isGetData = async () => {
      try { // AsyncStorage'dan Mail adresi(uniqID) value değişkenine kaydedilir.
         const value = await AsyncStorage.getItem('username');
         if (value !== null) {
            firestore()
            .collection('Users')
            .doc(value)
            .onSnapshot((querySnapshot) => {
               // username ile HesapID çekilerek bildirimleri listeleme fonksiyonuna
               // parametre olarak gönderilir. Bu fonksiyon tüm bildirimleri çeker ve State'e kaydeder.
            allNotification(querySnapshot.data().hesapID);
            setUserData(querySnapshot.data())
            })
         }else{
            setTrigger(false);
         }
      }catch(e){console.log(e)}
    };

    const allNotification = (hesapID) =>{
      try { // Tüm Bildirimleri Listeleme fonksiyonu
         firestore()
         .collection('accounts')
         .doc(hesapID)
         .collection('toDo')
         .orderBy('date', 'desc') // Tarihe göre azalan sıralama
         .onSnapshot((querySnapshot) => {
            const isNotification = [];
            querySnapshot.forEach((documentSnapshot) => {
               isNotification.push({
                  key: documentSnapshot.id,
                  ...documentSnapshot.data(),
               });
            });
            setNotificationList(isNotification);
         });
      } catch(e){console.log(e)}
    }
    const handleTodoAdd=() =>{
      setModalVisible(!modalVisible)
    }

    const toDoAdd = (key, text)=>{
      Ekle(text)
      const postReference = firestore()
      .collection('accounts')
      .doc(userData.hesapID)
      .collection('toDo')
      .doc(key)
      return firestore().runTransaction(async transaction => {
      const postSnapshot = await transaction.get(postReference);
         if (postSnapshot.exists) {
            await transaction.update(postReference, {
               visible: !postSnapshot.data().visible,
            });
           
         }
      });

     
         
    }

    const toDoDelete = (key)=>{
      setTodoKey(key)
      setModalType('button')
      setInfo("Bu ürünü listeden kaldırmak istediğine emin misin?"),
      setModal(true);
    }

    const toDoDeleteOk = (key)=>{
      firestore()
      .collection('accounts')
      .doc(userData.hesapID)
      .collection('toDo')
      .doc(key)
      .delete()
      .then(() => {setModal(false);
      });
    }

    const Ekle =(key)=>{

   let sayac = 0;
    const listItems = list.map((number) =>
      number == key ? sayac++ : null,
    );
    if (sayac > 0) {
      const index = list.indexOf(key);
      if (index > -1) {list.splice(index, 1);}
    }else{
      list.push(key);
    }
    setElement(list)
      console.log(list)
    }
    const NotificationSubmit =()=>{
       return(
          element.length>0
          ?
          <View style={{justifyContent:'center' ,alignItems:'center'}} >
            <SubmitButton
               butonPress={()=>navigation.push('ToDoList')}
               title={'Diğer kullanıcılara bildirim gönder'}/>
          </View>
          :null
       )
    }

   return (
      <View  >
         <SafeAreaView backgroundColor={COLORS.lightGreen} barStyle="light-content" />
         <StatusBar backgroundColor={COLORS.lightGreen} barStyle="light-content"/>
         <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:COLORS.lightGreen, paddingVertical:10, paddingHorizontal:20, marginBottom:10}} >
            <TouchableOpacity onPress={()=>navigation.goBack()} >
              <Icon name={'arrow-back-outline'} size={26} color={'#fff'}/>
            </TouchableOpacity>
            <Text style={{fontSize:22, ...FONTS.medium, color:'#f8f8f8',textAlign:'center', paddingBottom:0}}>Alışveriş Listesi</Text>
            <TouchableOpacity onPress={()=>handleTodoAdd()} >
               <Icon name={'duplicate-outline'} size={26} color='#fff'/>
            </TouchableOpacity>
         </View>
         {notificationList.length>0 
         ?
         <FlatList
         //inverted={true} // itemleri aşağıdan yukarıya sıralar
         data={notificationList}
         ListFooterComponent={null//NotificationSubmit()
         }
         style={{ height:SIZES.height*0.79,paddingHorizontal:0, width:SIZES.width}}
         keyExtractor={(item) => item.key}
         showsHorizontalScrollIndicator={false}
         renderItem={({item}) => (
         <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', paddingVertical:12, paddingHorizontal:20, borderBottomColor:'#ddd', borderBottomWidth:1 }}>
            <TouchableOpacity onPress={()=>setDeneme(!deneme)} style={{paddingRight:5}} >
            { item.visible ?
               <View style={{flexDirection:'row'}} >
                  <TouchableOpacity style={{width:SIZES.width-60,flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}} onPress={()=>toDoAdd(item.key, item.text)} >
                     <Icon name={'checkmark-circle-outline'} size={25} color='#000'/>
                     <Text style={{...FONTS.regular, fontSize:14, paddingBottom:0, textDecorationLine:'line-through'}} > 
                         {'  '}{item.text}
                     </Text>
                  </TouchableOpacity>                  
                 
                   <TouchableOpacity onPress={()=>toDoDelete(item.key)} >
                      <Icon name={'close-outline'} size={25} color='#000'/>
                  </TouchableOpacity> 
               </View>
               :
               <View style={{flexDirection:'row'}} >
                   <TouchableOpacity style={{width:SIZES.width-60,flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}} onPress={()=>toDoAdd(item.key,item.text)} >
                     <Icon name={'ellipse-outline'} size={25} color='#000'/>
                     <Text style={{...FONTS.regular, fontSize:14, paddingBottom:0}} > 
                         {'  '}{item.text}
                     </Text>
                  </TouchableOpacity>   
                   <TouchableOpacity onPress={()=>toDoDelete(item.key)} >
                      <Icon name={'close-outline'} size={25} color='#000'/>
                  </TouchableOpacity> 
               </View>                  
            }
            </TouchableOpacity>
         </View>
         )}
         />
         :
         
         <View style={{height:SIZES.height*0.8, justifyContent:'center', alignItems:'center'}} >
            <Icon name={'thunderstorm-outline'} size={80} color={COLORS.lightGreen}/>
            <Text style={{...FONTS.regular, fontSize:16, paddingTop:20, color:'#333'}} >Listede hiç ürün bulunamadı</Text>
            <TouchableOpacity onPress={()=>handleTodoAdd()} >
               <Text style={{...FONTS.regular, fontSize:13, paddingTop:0, color:'#555'}} >Yeni bir ürün eklemek için tıklayın</Text>
            </TouchableOpacity>
         </View>
            
         }
         
         <TodoAddModal
            userData={userData}
            visible={modalVisible}
            setModalVisible={()=>setModalVisible(!modalVisible)}
         />
         <InfoAlert 
        modalType={modalType} 
        info={info} 
        modal={modal} 
        setModal={() => setModal(!modal)} 
        butonPress={()=>toDoDeleteOk(todoKey)} 
      />
      </View>
   )
}
