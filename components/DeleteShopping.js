import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import InfoAlert from '../components/InfoAlert';

export default function DeleteShopping(props) {
  const navigation = useNavigation();
  const [info, setInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null)

  const Onay = () => {
    if (props.data.name === props.username) {
      setModalType('button')
      setInfo("Bu faturayı silmek istediğinize emin misiniz?"),
      setModal(true);
    } else {
      setModalType('info')
      setInfo(`Bu harcama sana ait değil. Yalnızca ${props.data.name} ve hesap yöneticisi kaldırabilir.`),
      setModal(true);
      setTimeout(() => {setModal(false)}, 4000);
    }
  };
  const DeleteShop = () => {
    setModal(false)
    firestore()
      .collection('accounts')
      .doc(props.data.hesapID)
      .collection('shopping')
      .doc(props.data.key)
      .delete()
      .then(() => {
        navigation.push('Home', {data: props.data});
      });
  };
  return (
    <>
      <TouchableOpacity onPress={() => Onay()} style={styles.container}>
         <Icon name={props.icon} size={25} color={'#fff'} solid />
      </TouchableOpacity>
      <InfoAlert 
        modalType={modalType} 
        info={info} 
        modal={modal} 
        setModal={() => setModal(!modal)} 
        butonPress={()=>DeleteShop()} 
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
});
