import React, {useState, useEffect} from 'react'
import { View,StatusBar,Alert, Text,StyleSheet,Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Input from '../components/LogIn/Input'
import SubmitButton from '../components/LogIn/SubmitButton'
import SocialLogin from '../components/LogIn/SocialLogin'
import SingLoginButton from '../components/Button/SingLoginButton'
import { errorResolve } from '../components/LogIn/error';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelect from '../language';
import LanguageSelectCom from '../components/LanguageSelectCom';
import InfoAlert from '../components/InfoAlert'

const SingIn = ({ route, navigation }) => {
    const [mail, setMail]=useState("")
    const [password, setPassword]=useState("")
    const [passwordRepeat, setPasswordRepeat]=useState("")
    const [infoText, setInfoText]=useState("")
    const [info, setInfo] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(null)

    const Next = async ()  =>{
        try {
            if(mail && password){
                await auth().createUserWithEmailAndPassword(mail, password)
                DBUser(); 
            }else{
                setModalType('info')
                setInfo(`Lütfen bir geçerli e-mail adresi ve parola girinz.`),
                setModal(true);
                setTimeout(() => {setModal(false)}, 4000);
            }
        }
        catch (error) {
            setModalType('info')
            setInfo(errorResolve(error.code)),
            setModal(true);
            setTimeout(() => {setModal(false)}, 4000);
        }
      }

    const DBUser = async ()=>{
        //Kullanıcı verilerinin Firebase' e kaydedilmesi
        if(mail){
            firestore()
            .collection('Users').doc(mail)
            .set({
                username:mail,
                email:mail,
                image:'image@image.com',
                date:firestore.FieldValue.serverTimestamp(), //Anlık zaman(Kayıt Zamanı)
                refNumber:'LK34HN',
                name:'User',
                hesapID:'null',
            })
            AsyncStorage.getItem('username').then(deger =>{
                if(deger!==null){
                    AsyncStorage.removeItem("username");
                    AsyncStorage.setItem('username', mail);
                }else{
                    AsyncStorage.setItem('username', mail);
                }  
            }),
            navigation.replace('ProfilePhoto', {mail:mail, buton:'Kayıt ol'})  
        }
    }
    return (
        <ScrollView style={{height:SIZES.height}} >
            <SafeAreaView/>   
            <InfoAlert 
                modalType={modalType} 
                info={info} 
                modal={modal} 
                setModal={() => setModal(!modal)} 
                butonPress={()=>DeleteShop()} 
            />
            <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Image style={{width:180, height:180, marginBottom:0}} source={require('../assets/images/logom.png')} />
                    <Text  onPress={()=>navigation.push('ProfilePhoto', {mail:mail})}  style={styles.title}>
                        {LanguageSelect().SingInPage.homeTitle}
                    </Text>
                    <Text style={styles.title}>
                        {LanguageSelect().SingInPage.homeTitleDes}
                    </Text>
                    <Text> </Text>
                </View>
                <Input type={'2'}  icon={'mail'} placeholder={LanguageSelect().SingInPage.emailPh}
                    setUsername={(text)=>setMail(text)}username={mail}
                />
                <Input type={'1'} icon={'lock-closed'} placeholder={LanguageSelect().SingInPage.password}
                    setUsername={(text)=>setPassword(text)}  username={password}
                />
                <Input type={'1'}  icon={'lock-open'} placeholder={LanguageSelect().SingInPage.passwordRepeat}
                    setUsername={(text)=>setPasswordRepeat(text)}  username={passwordRepeat}
                />
                <SubmitButton  title={LanguageSelect().SingInPage.buttonText} butonPress={()=>Next()}/>
                <SocialLogin/>
                <SingLoginButton
                    butonPress={()=>navigation.navigate('LogIn')}
                    textOne={LanguageSelect().SingInPage.endButtonOne} 
                    textTwo={LanguageSelect().SingInPage.endButtonTwo} 
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        height:SIZES.height-80,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center', 
    },
    title:{
        ...FONTS.bold,
        fontSize:22,
        color:'#333', 
        marginBottom:0,
        textAlign:'center',
        paddingHorizontal:0
    },
  

})

export default SingIn;