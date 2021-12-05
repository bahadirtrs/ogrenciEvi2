import React, { useState, useEffect } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, SafeAreaView,View,StatusBar,Dimensions, ActivityIndicator } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const PlugShowModal = (props) => {
const [imageSize, setImageSize] = useState(1.33)
const [loading, setloading] = useState(false)
const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    Image.getSize("https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/"+props.profilePhotoName+".jpg",
    (width, height) => {
      let size= height/width;
      setImageSize(size)
      setTimeout(() => {
        setloading(true)
      }, 1000);
    }
    );
  }, [])


  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });


  return (
    <View style={[styles.centeredView ,{backgroundColor:props.modalPress==true ?'green': null,}]}>
      <StatusBar backgroundColor={props.visible ? '#000': '#4e9b8f'} barStyle="light-content" />
      
      <Modal 
        animationType="fade"
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
        visible={props.visible}
        onRequestClose={() => {props.modalPress}}
      >
     
        <View style={[styles.centeredView,{
          width:dimensions.screen.width,
          height:dimensions.screen.height
        }]}>
        <SafeAreaView/>
          <View style={styles.modalView}>
           { props.profilePhotoName=='noData' 
            ? <View style={{width:dimensions.screen.width-5, height:(dimensions.screen.width-5)*1.25, justifyContent:'center', alignItems:'center'}} >
                <Icon name={'images-outline'} size={60} color={'#555'} />
                <Text style={{...FONTS.regular, fontSize:12, color:'#555', paddingVertical:10}} >Bu harcama için fotoğraf yüklenmedi.</Text>
            </View>
            : 
         loading ?    
            <ImageZoom cropWidth={dimensions.window.width-5}
              cropHeight={(dimensions.window.height)}
              imageWidth={dimensions.window.width-5}
              imageHeight={(dimensions.window.width-5)*imageSize}
              style={{backgroundColor:'#000'}}
              pinchToZoom={true}>
                
              <Image 
                source={{
                headers: {Pragma: 'no-cache'},
                uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+props.profilePhotoName+'.jpg'}}
                style={{ width:dimensions.window.width-5, height:(dimensions.window.width-5)*imageSize, borderTopLeftRadius:5, borderTopRightRadius:5}} 
              />
        </ImageZoom> 
        :<ActivityIndicator/>
        }
        <View style={{
            position:'absolute',
            top:0,
            right:10,
            width:'100%',
            height:100,
             justifyContent:'flex-end',
             alignItems:'flex-end',
        }} >
            {loading&&<TouchableOpacity style={styles.button} onPress={props.modalPress}>
              <Icon name={'close'} size={36} color='#fff' />
            </TouchableOpacity>}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor:'#000',
    position:'absolute',
    
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
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
  button: {
    flexDirection:'row',
    borderRadius: 5,
    top:10,
    zIndex:99,
    position:'absolute',

  },
  buttonOpen: {
  },
  buttonClose: {
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

export default PlugShowModal;