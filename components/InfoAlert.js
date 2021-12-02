import React, {useState} from 'react'
import { View,StatusBar,Modal, Text,StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';

export default function InfoAlert(props) {
   return (
      <Modal animationType="fade" transparent={true}visible={props.modal} statusBarTranslucent={true}>
        <TouchableOpacity activeOpacity={1} style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView/>
            <StatusBar backgroundColor={'#ca5c54'} barStyle="light-content"/>
            <TouchableOpacity activeOpacity={1} onPress={props.setModal}  style={{flexDirection:'row', alignItems:'center', width:SIZES.width ,paddingHorizontal:20, paddingVertical:5}} >
              <Icon name={'information-circle-outline'}  size={30} color={'#fff'}/>
              <Text style={{ width:SIZES.width-60, color:'#f1f1f1', fontSize:14, ...FONTS.regular, paddingLeft:10}} >{props.info}</Text>
            </TouchableOpacity>
            { props.modalType=='button' ?
            <View style={{flex:1, width:SIZES.width, flexDirection:'row', justifyContent:'space-around', borderTopColor:'#f8f8f830', borderTopWidth:1}} >
              <TouchableOpacity style={{ justifyContent:'center', alignItems:'center', flex:1,paddingVertical:7, paddingHorizontal:20}}  onPress={props.butonPress} >
                <Text style={{ color:'#f1f1f1', fontSize:14, ...FONTS.medium, paddingLeft:10, }}>Evet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent:'center', alignItems:'center', flex:1,paddingVertical:10, paddingHorizontal:20}} onPress={props.setModal}  >
                <Text style={{ color:'#f1f1f1', fontSize:14, ...FONTS.medium, paddingLeft:10}} >Vazgeç</Text>
              </TouchableOpacity>
            </View>
            :<View style={{paddingBottom:15}}/>

            }
            
          </View>
        </TouchableOpacity>
      </Modal>

   )
}

const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width:SIZES.width,
    position:'absolute',
    backgroundColor:'red',
  },
  modalView: {
    backgroundColor:'#ca5c54',
    borderRadius: 0,
    paddingTop: 30,
    paddingBottom:0,
    width:SIZES.width,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  },

});
