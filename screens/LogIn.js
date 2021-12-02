import React, {useState, useEffect} from 'react'
import { View,StatusBar,Switch,Text,StyleSheet,Image,ScrollView,SafeAreaView } from 'react-native'
import auth from '@react-native-firebase/auth';
import { FONTS, SIZES } from "../constants/theme";
import Input from '../components/LogIn/Input';
import SubmitButton from '../components/LogIn/SubmitButton';
import SocialLogin from '../components/LogIn/SocialLogin';
import SingLoginButton from '../components/Button/SingLoginButton';
import { errorResolve } from '../components/LogIn/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import LanguageSelect from '../language';
import LanguageSelectCom from '../components/LanguageSelectCom';
import InfoAlert from '../components/InfoAlert'

function LogIn({ route, navigation }) {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const [info, setInfo] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(null)

    const loginUser = async () => {
        if(username && password){
            try{
                await auth().signInWithEmailAndPassword(username, password)
                    AsyncStorage.getItem('username').then(deger =>{
                        if(deger!==null){
                            AsyncStorage.removeItem("username");
                            AsyncStorage.setItem('username', username);
                        }else {
                            AsyncStorage.setItem('username', username);
                        }  
                    });
                navigation.push('Home', {username:username})
            }
            catch(error){
                setModalType('info')
                setInfo(errorResolve(error.code)),
                setModal(true); setTimeout(() => {setModal(false)}, 4000);
            }
        }else{
            setModalType('info')
            setInfo('Lüften Kullanıcı adı ve Parola giriniz'),
            setModal(true); setTimeout(() => {setModal(false)}, 4000);
        }
    }
    return (
        <ScrollView style={{height:SIZES.height}} >
        <SafeAreaView/>
        <FlashMessage  position="bottom" animated={true} autoHide={false} />
        <View style={styles.container} >
            { <LanguageSelectCom/>  /* Dil Seçimi */}
            <InfoAlert 
                modalType={modalType} 
                info={info} 
                modal={modal} 
                setModal={() => setModal(!modal)} 
                butonPress={null} 
            />
            <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
            <View style={{alignItems:'center'}}>
                <Image style={{width:200, height:200, marginBottom:0}} source={require('../assets/images/logom.png')} />
                <Text style={styles.title}>{LanguageSelect().LogInPage.homeTitle} 
                 </Text>
                <Text style={styles.title}> 
                    {LanguageSelect().LogInPage.homeTitleDes}
                </Text>
            </View>
            <Input type={'2'} icon={'person'} 
                placeholder={LanguageSelect().LogInPage.emailPlaceholder}
                setUsername={(text)=>setUsername(text)} username={username}
            />
             <Input type={'1'} icon={'lock-open'} 
                placeholder={LanguageSelect().LogInPage.passwordPlaceholder}
                setUsername={(text)=>setPassword(text)} username={password}
             />
            <SubmitButton title={LanguageSelect().LogInPage.butonTitle} butonPress={()=>loginUser()}/>
            <SocialLogin title={LanguageSelect().LogInPage.socialIconText} />
            <SingLoginButton
                butonPress={()=>navigation.navigate('SingIn')}
                textOne={LanguageSelect().LogInPage.endButtonOne}
                textTwo={LanguageSelect().LogInPage.endButtonTwo}
            />
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        height:SIZES.height-20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        ...FONTS.bold,
        fontSize:26,
        color:'#333',
        marginBottom:0,
        textAlign:'center',
        paddingHorizontal:0
    },

})

export default LogIn;
