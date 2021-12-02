import React, { useState, useEffect } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const TodoAddModal = (props) => {
  const [todoName, setTodoName] = useState("")

  const handleAddTodo = () =>{
    if(todoName.length>3){
      setTodoName("")
      firestore()
      .collection('accounts')
      .doc(props.userData.hesapID)
      .collection('toDo')
      .doc()
      .set({
        name:props.userData.name,
        text:todoName,
        date:firestore.FieldValue.serverTimestamp(), 
        visible:false,
        islemYapan:'string'
      })
      .then(props.setModalVisible);
    }else{
      alert("Anlamlı bir şeyler girin")
    }
  }
  
  return (
    <KeyboardAvoidingView  keyboardVerticalOffset={1} behavior={'padding'} >
    <View style={[styles.centeredView ,{backgroundColor:props.modalPress==true ?'#00000099': null,}]}>
      <StatusBar backgroundColor={COLORS.lightGreen} />
     
      <Modal animationType="fade" transparent={true} visible={props.visible} onRequestClose={() => {props.modalPress}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection:'row', justifyContent:'space-between', width:(SIZES.width*0.9)-20}} >
              <Text style={{...FONTS.medium,fontSize:24}} >{'Evde ne eksik? '}</Text>
              <TouchableOpacity onPress={props.setModalVisible} >
                <Icon name={'close-outline'} size={30} color={'#000'}/>
              </TouchableOpacity>
            </View>
            <Text style={{...FONTS.regular,fontSize:12, color:'#333', paddingBottom:10}} >{'Alışveriş listesine eklediğiniz her ürün için evde yaşayan diğer kullacılara bildirim gönderilir.'}</Text>
            <TextInput
              style={[styles.textInput, {fontSize:16}]}
              placeholder={"Ne satın almanız gerekiyor?"}
              placeholderTextColor={'#888'}
              value={todoName}
              onChangeText={(text)=>setTodoName(text)}
              textAlign='left'
            />
            
            <TouchableOpacity style={styles.button} onPress={()=>handleAddTodo()} >
            <Text style={{...FONTS.regular, color:'#fff'}} >Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor:'#00000050',
    height:SIZES.height,
  },
  modalView: {
    width:SIZES.width*0.9,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    justifyContent:'flex-start',
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding:15,
   
  },
  textInput:{ 
    width:(SIZES.width*0.9)-30,
    paddingVertical:4,
    fontSize:16,
    borderBottomWidth:0.3,
    borderBottomColor:'#55555590',
    ...FONTS.regular,
    color:'#000',
    marginBottom:20
  },
  
  button: {
    width:(SIZES.width*0.9)-30,
    backgroundColor:COLORS.lightGreen ,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10,
    marginVertical:5,
    borderRadius: 5,
    borderTopColor:'#e1e1e1',
    borderTopWidth:1
  },

  container:{ 
    zIndex:3, 
    bottom:0, 
    width:SIZES.width-50, 
    position:'absolute',
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#00000060', 
    padding:5, 
    borderRadius:0
  },
 
  textStyle: {
    color: "#222",
    ...FONTS.medium,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center"
  }
});

export default TodoAddModal;