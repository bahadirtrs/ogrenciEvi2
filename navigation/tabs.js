import React from "react";
import { SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Notification,ToDoList,Store,Blog } from "../screens/";
import { icons, COLORS } from "../constants";
import MainItem from '../components/TabItems/MainItem'
import ButtonItem from '../components/TabItems/ButtonItem';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const tabOptions = {
    showLabel: false,
    style: {
        backgroundColor: COLORS.white,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
        height:60
    }
}

const Tabs = () => {
    
    return (
        <>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.lightGreen : COLORS.black;

                    switch (route.name) {
                        case "Anasayfa":
                            return (
                                <ButtonItem tintColor={tintColor} icon={icons.dashboard_icon}/>
                            )
                        case "Store":
                            return (
                                <FontAwesome  name={'store'} size={20} color={tintColor}/>   
                            )
                        case "Harcama Ekle":
                            return (
                                <MainItem/>
                            )
                        case "ToDoList":
                            return (
                                <Icon  name={'list-circle-outline'} size={25} color={tintColor}/>   
                            )
                        case "Blog":
                            return (
                                <Icon  name={'book-outline'} size={25} color={tintColor}/>   
                        )
                    }
                }
            })}
            tabBarOptions={tabOptions}
        >
            <Tab.Screen name="Anasayfa" component={Home}/>
            <Tab.Screen name="Store" component={Store}/>
            <Tab.Screen name="Harcama Ekle" component={Home}/>
            <Tab.Screen name="Blog" component={Blog}/>
            <Tab.Screen name="ToDoList"component={ToDoList}/>
        </Tab.Navigator>
        <SafeAreaView backgroundColor='#fff' />
        </>
    )
}

export default Tabs;