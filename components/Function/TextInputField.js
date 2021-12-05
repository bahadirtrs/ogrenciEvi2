import React,{useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import {useTheme} from '@react-navigation/native'
const TextInputField = ({ value, change, title, text, placeholder, secure, onPress,type,referans,onSubmitEditing }) => {
    const {colors}=useTheme()
    const primary='#726AED'
    const border='#ddd'
    const [focus, setFocus] = useState(false)
    return (
        <View style={styles.textInputContainer} >
            <View style={[styles.textInputTitle,]} >
                <Text style={{color:colors.text }}>{title}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{color:colors.text}}> {text} </Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={[styles.textInputStyle,{ 
                    color:colors.text, 
                    borderColor:focus?primary:border, 
                    borderWidth:focus?1.5:1,
                    minHeight:type=='multi'? 80: null,
                    maxHeight:160
                }]
                }
                autoFocus={referans} 
                contextMenuHidden={true}
                placeholder={placeholder}
                placeholderTextColor={'#aaa'}
                value={value}
                onSubmitEditing={onSubmitEditing}
                showSoftInputOnFocus={false}
                textAlignVertical={type=='multi'?'top':'center'}
                multiline={type=='multi'?true:false}
                clearButtonMode={"always"}
                onFocus={()=>setFocus(true)}
                onBlur={()=>setFocus(false)}
                onChangeText={(text) => change(text)}
                secureTextEntry={secure?true:false}
                autoCapitalize={'none'}
            />
        </View>
    )
}

export default TextInputField;

const styles = StyleSheet.create({
    textInputContainer: {
        paddingHorizontal: 15,
        marginVertical:5 ,
        width:'100%'
    },
    textInputStyle: {
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical:Platform.OS=='android'?3:10,
        borderRadius: 6,
    },
    textInputTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:2
    },
})
