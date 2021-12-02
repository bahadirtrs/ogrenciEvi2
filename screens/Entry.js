import React, {useState, useEffect} from 'react';
import {View,StatusBar,Text,SafeAreaView,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeCodeItem from '../components/Entry/HomeCodeItem';
import AccountItem from '../components/Entry/AccountItem';
import LanguageSelect from '../language';

function Entry({route, navigation}) {
  const [tetik, setTetik] = useState(true);
  const [mail, setMail] = useState('');
  const [userInfo, setUserInfo] = useState([]);
 

  useEffect(() => {
    getData();
  }, [tetik]);

  const getData = async () => {
    try { const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setMail(value),UserInfo(value);
      }else {
        setTetik(false);
      }}catch (e) {}
  };

  const UserInfo = (value) => {
    const subscriber = firestore()
      .collection('Users')
      .doc(value)
      .onSnapshot((querySnapshot) => {
        setUserInfo(querySnapshot.data());
      });
    return () => subscriber();
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem('username');
      navigation.replace('LogIn');
    } catch (exception) {
      return false;
    }
  };

  return (
    <View style={{backgroundColor: COLORS.lightGreen}}>
      <StatusBar backgroundColor={COLORS.lightGreen} barStyle="dark-content" />
      <SafeAreaView backgroundColor={COLORS.lightGreen} />
      <ScrollView>
        <View style={styles.containerExp}>
          {/* Menu start */}
          <View style={styles.header}>
            <View style={styles.headerExp}>
              <Text></Text>
              <TouchableOpacity  onPress={()=>removeItem()} style={styles.infoButton}>
                <Text style={styles.logOutButtonText}> {LanguageSelect().EntryPage.logOutButtonText }</Text>
                <Icon name={'log-out-outline'} size={15} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Menu end */}
          <View style={{justifyContent:'center', alignItems:'center'}} >
            <Icon name={'beer-outline'} size={80} color={'#fff'} />
            <Text style={styles.welcomeTitle}>{LanguageSelect().EntryPage.welcome}{' '}
              {userInfo.name && userInfo.name.slice(0, userInfo.name.lastIndexOf(' '))}
            </Text>
            <Text style={styles.welcomeDescription}>{LanguageSelect().EntryPage.welcomeText}</Text>
          </View>
        </View>
         {/* Header end */}
        <View style={styles.container}>
          <Text style={styles.questionTitle}>{LanguageSelect().EntryPage.questionTitle}</Text>
         
          <HomeCodeItem data={userInfo}
            text={LanguageSelect().EntryPage.homeCodeText} 
            placeholderText={LanguageSelect().EntryPage.homeCodePlaceholderText}
            butonText={LanguageSelect().EntryPage.homeCodeButtonText}
            messageText={LanguageSelect().EntryPage.homeCodeMessageText}
          />
          <AccountItem
            butonPress={() =>navigation.navigate('HomeAccountCreate', {data: userInfo})}
            text={LanguageSelect().EntryPage.homeAccountText}
            butonText={LanguageSelect().EntryPage.homeAccountButtonText}
          />
          <AccountItem
            butonPress={() => navigation.replace('Home')}
            text={LanguageSelect().EntryPage.personelAccountText}
            butonText={LanguageSelect().EntryPage.personelAccountButtonText}
          />
          <View style={styles.helpButton}>
            <Text style={styles.helpButtonTitle}>{LanguageSelect().EntryPage.helpButtonOneText}</Text>
            <Text style={styles.helpButtonTitleBold}> {LanguageSelect().EntryPage.helpButtonTwoText} </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: '#f1f1f1',
    paddingBottom: 20,
  },

  containerExp:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGreen,
  },

  logOutButtonText:{
    ...FONTS.regular, 
    color:'#fff', 
    fontSize:12
  },

  welcomeTitle:{
    ...FONTS.medium,
    fontSize: 28,
    color: '#fff',
    paddingTop: 5,
  },

  welcomeDescription:{
    ...FONTS.regular,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
  },

  // body start
  questionTitle:{
    ...FONTS.bold,
    fontSize: 18,
    paddingVertical: 10,
    color: '#555',
  },

  helpButton:{
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonTitle:{
    ...FONTS.regular, 
    color: '#666'
  },
  helpButtonTitleBold:{
    ...FONTS.bold, 
    color: '#222'
  },

  header: {
    width: SIZES.width,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGreen,
  },

  headerExp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBotton: {
    backgroundColor: COLORS.lightGreen,
    paddingLeft: 20,
    width: 50,
  },
  infoButton: {
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    paddingRight: 0,
  },
});

export default Entry;
