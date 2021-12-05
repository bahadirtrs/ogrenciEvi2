import React, { useState,useEffect,useRef } from "react";
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View , TextInput,
  KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { InteractionManager } from 'react-native';
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';
import TextInputField from "./Function/TextInputField";
import { TouchableHighlight } from "react-native-gesture-handler";

const DenemeModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [projectName, setProjectName] = useState(null)
  const [projectDescription, setProjectDescription] = useState(null)

  return (
    
   
 
      <View style={styles.container}>
      <Modal
      
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
     
      >
        <View  style={styles.centeredView}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
            behavior={Platform.OS === "ios" ? "position" : "position"}
            style={{width:'100%',paddingLeft:'5%', }}
         >
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.modalView}>
            <Text style={{fontFamily:'GoogleSans-Medium', fontSize:22, paddingBottom:10, width:'90%', textAlign:'center'}}>Proje Oluştur</Text>

          <TextInputField
            value={projectName}
            referans={true}
            change={(val) => setProjectName(val)}
            title={'Proje Adı'} 
            text={''}
            placeholder={'Organizaston adı giriniz'}
          />

          <TextInputField
            value={projectDescription}
            change={(val) => setProjectDescription(val)}
            title={'Organizasyon Adı'} 
            text={''}
            placeholder={'Proje açıklaması giriniz'}
            type={'multi'}
          />
          <View style={{ flexDirection:'row', width:'100%',paddingHorizontal:10}} >
            <TouchableOpacity onPress={()=>null} style={{padding:6, backgroundColor:'#726AED',width:100,borderRadius:4, margin:5 }} >
              <Text style={{textAlign:'center', color:'white'}} >Kaydet </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} style={{padding:6, borderColor:'#726AED',borderWidth:1, width:100,borderRadius:4, margin:5 }} >
              <Text style={{textAlign:'center', color:'black'}} >İptal </Text>
            </TouchableOpacity>
          </View>
          
              
          </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
        </View>
      </Modal>
      <TouchableOpacity style={{ height:10, borderWidth:1, borderColor:'#eee'}} onPress={()=>{
        setModalVisible(!modalVisible)
        }} >
        <Text>   </Text>
      </TouchableOpacity>
    </View>

     
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    width:'100%'
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor:'#00000050',
    height:SIZES.height,
    width:SIZES.width
  },

  modalView: {
    backgroundColor: "#f1f1f1",
    width:'95%',
    borderRadius: 6,
    paddingVertical:20,
    justifyContent:'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  
});

export default DenemeModal;