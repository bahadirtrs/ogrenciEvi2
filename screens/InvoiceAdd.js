import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Text
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import DataSelect from '../components/DataSelect';
import UsersList from '../components/UsersList';
import SubmitButton from '../components/Button/SubmitButton';
import {LogBox} from 'react-native';
import Menu from '../components/Menu';
import PlugUpload from '../components/PlugUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShoppingHeader from '../components/Shopping/ShoppingHeader';
import ShoppingItemTitle from '../components/Shopping/ShoppingItemTitle';
import ShoppingUserImage from '../components/Shopping/ShoppingUserImage';
import InfoAlert from '../components/InfoAlert';
import tr from '../language/language-tr';
import en from '../language/language-en';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const ShoppingAdd = ({route, navigation}) => {
  const [shoppingUser, setshoppingUser] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopSales, setShopSales] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopDate, setShopDate] = useState(new Date());
  const [userss, setUserss] = useState([]);
  const [usersss, setUsersss] = useState([]);
  const [error, setError] = useState('deneme');
  const [plugUrl, setPlugUrl] = useState(Math.floor(Math.random() * 1000000000) + 1);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageOk, setImageOk] = useState(false);
  const [userListModal, setuserListModal] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [userEmail, setUserEmail] = useState("")
  const [lang, setLang] = useState(tr)
  const [info, setInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null)

  useEffect(() => {
    firestore()
    .collection('language')
    .doc("item")
    .onSnapshot((querySnapshot) => {
        querySnapshot.data() &&
        querySnapshot.data().lang &&
        querySnapshot.data().lang=='en' 
        ? setLang(en)
        : setLang(tr)   
    });
})

  useEffect(() => {
    getData();
  }, [trigger]);

  const getData = async () => {
    console.log('1.adım', userInfo.hesapID);
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        firestore()
          .collection('Users')
          .doc(value)
          .onSnapshot((querySnapshot) => {
            setUserInfo(querySnapshot.data());
            setshoppingUser(querySnapshot.data().name);
            setUserEmail(querySnapshot.data().email)
            UserList(querySnapshot.data().hesapID, querySnapshot.data().name);
          });
      } else {
        setTrigger(false);
      }
    } catch (e) {}
  };

  const UserList = (userInfom, name) => {
    console.log('2.adım', userInfo.hesapID);
    usersss.push(name.slice(0, name.lastIndexOf(' '))); //<---------
    //Başlangıçta hesap sahibinin alışverişte seçili olması için--|
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    //Firestore da hesapa bağlı olan kullanıcıları Listeleme fonksiyonu
    const subscriber = firestore()
      .collection('accounts')
      .doc(userInfom)
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const dey = [];
        querySnapshot.forEach((documentSnapshot) => {
          dey.push({
            key: documentSnapshot.id,
            name: documentSnapshot.data().name,
            selected: documentSnapshot.data().name === name ? true :documentSnapshot.data().selected,
            //Başlangıçta hesap sahibinin alışverişte seçili olması için
            //selected:documentSnapshot.data().selected,
            email: documentSnapshot.data().email,
            image: documentSnapshot.data().image,
            accountdate: documentSnapshot.data().date,
          });
        });
        setUserss(dey);
      });
    return () => subscriber();
  };

  const ShoppingAdd = () => {
    //Firestore a veri ekleme fonksiyonu
    if (shopSales>1 && usersss.length > 0) {
      firestore()
        .collection('accounts')
        .doc(userInfo.hesapID)
        .collection('shopping')
        .doc()
        .set({
          shoppingName: shopName ? shopName : 'Alışveriş',
          shopDescription: shopDescription,
          name: shoppingUser,
          email: userEmail,
          sales: shopSales / 1,
          salesExp: shopSales / usersss.length / 1,
          date: shopDate,
          image: imageOk ? plugUrl : 'noData',
          type: '1',
          users: userss,
          dateOfRegistration: firestore.FieldValue.serverTimestamp(),
          hesapID: userInfo.hesapID,
        })
        .then(() => {
          navigation.push('Home');
        });
    } else {
      let salesNameError = ' alışveriş adı';
      let salesError = ' alışveriş tutarı';
      let salesUser = ' alışverişe dahil olan kullnanıcılar';
    
      
      //InfoModal Setting
      setError(error);
      setModalType('info') // modalin tipi "info | button"
      setInfo(`Alışveriş kaydedilemedi. Lütfen${salesNameError} ${salesError}, ${salesUser} alanını kontrol ediniz.`), //Uyarı metni
      setModal(true); // aktif hale getiriyoe
      setTimeout(() => {setModal(false)}, 4000); // 4 sn sonra kaybediyor
    }
  };

  const Ekle = (value, key) => {
    // Özünde ortak hesap kullnıcılarını belirginleşirmeye yarasa da, sonraları kullanıcı sayısını saymaya yaradı.
    // Bu fonksiyon dünya için küçük, uygulama için çok büyük bir adımdır..
    let sayac = 0;
    let bosluk = value.lastIndexOf(' ');
    value = value.slice(0, bosluk);
    const listItems = usersss.map((number) =>
      number == value ? sayac++ : null,
    );
    if (sayac > 0) {
      const index = usersss.indexOf(value);
      if (index > -1) {
        usersss.splice(index, 1);
      }
    } else {
      usersss.push(value);
    }

    LocalExp(key);
    console.log("Users: ",usersss);
  };

  useEffect(() => {
    
    // tutar hesaplamada ,(virgül) kullanılınca sorun çıkıyor
    // shopSales'teki virgüller notaya çevrildi.
    let sales = shopSales.replace(',', '.');
    setShopSales(sales);
  }, [shopSales]);

  const LocalExp = (key) => {
    //Hesaptaki kullanıcıları yeni bir Array e atarak, ortak kullanım sağlandı.
    const elementsIndex = userss.findIndex((element) => element.key == key);
    let newArray = [...userss];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      selected: !newArray[elementsIndex].selected,
    };
    setUserss(newArray);
  };

  const ImageOk = () => {
    //Fotoğrafın yüklü olup olmadığını kontrol ediyor eğer yüklüyse
    //veritabanına img valuesunu yazmaya izin veriyor.
    setImageOk(true);
    setModalVisible(!modalVisible);
  };

  const ImageNot = () => {
    //Fotoğrafın yüklü olup olmadığını kontrol ediyor eğer yüklü değilse
    //veritabanına image alanına 'noData' yazmaya izin veriyor.
    setImageOk(false);
    setModalVisible(!modalVisible);
  };

  const ShoppingUserName = (name,email,key) => {
    let newArray = [];
    name2=name;
    let bosluk = name2.lastIndexOf(' ');
    name2 = name2.slice(0, bosluk);
    newArray.push(name2);
    setUsersss(newArray)
    UserList(userInfo.hesapID, name);
    setUserEmail(email)
    setshoppingUser(name);
    setuserListModal(!userListModal);
  };

  return (
    <View>
      <SafeAreaView backgroundColor="#4e9b8f" />
      <StatusBar backgroundColor={modalVisible ? '#366a62' : '#4e9b8f'} barStyle="light-content"/>
      <View style={styles.container}>
      {/*/////////Header start/////////*/}
        <Menu
          pageName={lang.InvoiceAddPage.pageTitle}
          butonLeftPress={() => navigation.goBack()}
          butonRightPress={null}
        />
        <ScrollView>
          <View style={styles.headerContainer}>
            <PlugUpload
              profilePhotoName={plugUrl}
              mail={'bhdrtrs'}
              visible={modalVisible}
              modalPress={() => setModalVisible(!modalVisible)}
              imageOk={() => ImageOk()}
              imageNot={() => ImageNot()}
            />
            <ShoppingHeader
              shoppingUser={shoppingUser} 
              shoppingNamePlaceholder={lang.InvoiceAddPage.shoppingName}
              explanationPlaceholder={lang.InvoiceAddPage.shoppingDesc} 
              pays={lang.InvoiceAddPage.pays}
              pressModal={() => setuserListModal(!userListModal)}
              shopSales={shopSales}
              setShopSales={(text) => setShopSales(text)}
              shopName={shopName}
              setShopName={(text) => setShopName(text)}
              shopDescription={shopDescription}
              setShopDescription={(text) => setShopDescription(text)}
            />
          </View>
        {/*/////Header end//////*/}
        {/*/////Alışverişe dahil olanlar start//////*/}
          <View style={{  backgroundColor: '#f1f1f1', paddingBottom: 100, paddingTop:5}}>
            <View
              style={[
                {width: SIZES.width, paddingVertical: 5, paddingHorizontal: 10},
                styles.iosShadow,
              ]}>
              <View
                style={{
                  backgroundColor: '#fff',
                  elevation: 1,
                  paddingVertical: 0,
                  borderRadius: 10,
                }}>
                <ShoppingItemTitle
                  title={lang.InvoiceAddPage.shoppingUser}
                  titleDescription={lang.InvoiceAddPage.shoppingUserDesc}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                   
                  }}>
                  <FlatList
                    data={userss}
                    horizontal={true}
                    style={{flexDirection: 'row'}}
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) =>
                      item.selected ? (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => Ekle(item.name, item.key, item.email)}
                          style={{
                            margin: 0,
                            paddingLeft:index===0 ? 25 : 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <ShoppingUserImage
                            status={true}
                            email={item.image}
                            name={item.name}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => Ekle(item.name, item.key, item.email)}
                          style={{
                            margin: 0,
                            paddingLeft:index===0 ? 25 : 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <ShoppingUserImage
                            status={false}
                            email={item.image}
                            name={item.name}
                          />
                        </TouchableOpacity>
                      )
                    }
                  />
                </View>
              </View>
            </View>
    {/*/////Alışverişe dahil olanlar end//////*/}
    {/*/////Ödeme deatyları start//////*/}
            <UsersList
              usersss={usersss}
              shoppingUser={shoppingUser}
              shopSales={shopSales}
            />
            <DataSelect shopDate={shopDate} setShopDate={setShopDate} 
              deptTitle={lang.InvoiceAddPage.deptTitle}
              deptTitleHover={lang.InvoiceAddPage.deptTitleHover}
              dateTitle={lang.InvoiceAddPage.dateTitle}
            
            />
            <SubmitButton
              title={lang.InvoiceAddPage.pageTitle}
              butonPress={() => ShoppingAdd()}
            />
      {/*/////Ödeme deatyları end//////*/}
          </View>
        </ScrollView>
      {/*/////Alışverişei ödeyen Modal start//////*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={userListModal}
          onRequestClose={() => setuserListModal(!userListModal)}>
          <TouchableOpacity onPress={() => setuserListModal(!userListModal)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity activeOpacity={1} style={{}}>
                  <ShoppingItemTitle
                    title={lang.InvoiceAddPage.deptUsername}
                    titleDescription={lang.InvoiceAddPage.deptUserDesc}
                    status={true}
                  />
                  <FlatList
                    data={userss}
                    horizontal={true}
                    style={{flexDirection: 'row', paddingHorizontal: 10, width:SIZES.width*0.9}}
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => ShoppingUserName(item.name, item.email,item.key)}
                        style={{
                          margin: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <ShoppingUserImage
                          status={false}
                          email={item.image}
                          name={item.name}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <InfoAlert 
        modalType={modalType} 
        info={info} 
        modal={modal} 
        setModal={() => setModal(!modal)} 
        butonPress={null} 
      />
          {/*/////Alışverişi ödeyen Modal end//////*/}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.lightGreen,
  },

  headerContainer: {
    flexDirection: 'row',
    width: SIZES.width,
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingTop: 25,
    paddingHorizontal: 20,
    backgroundColor: '#4e9b8f',
    marginBottom: 5,
  },

  textInput: {
    width: SIZES.width * 0.6,
    paddingVertical: 1,
    fontSize: 16,
    borderBottomWidth: 0.3,
    borderBottomColor: '#bbbbbb90',
    ...FONTS.regular,
    color: '#fff',
  },

  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#00000050',
    width: SIZES.width,
    height: SIZES.height,
  },
  modalView: {
    paddingVertical: 10,
    paddingHorizontal:0,
    height: 160,
    width: SIZES.width * 0.95,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default ShoppingAdd;
