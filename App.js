import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { 
    Profile,
    ToDoList,
    BookDetail, 
    ShoppingAdd,
    InvoiceAdd,
    DebtAdd,
    LogIn,
    SingIn, 
    ProfilePhoto, 
    Entry, 
    HomeAccountCreate, 
    HomeCodeView, 
    Notification,
    Store,
    ProductAdd,
    ProductDetail,
    Blog,
    BlogText
} from "./screens/";
import Tabs from "./navigation/tabs";
import codePush from "react-native-code-push";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
//appcenter codepush release-react -a bhdrtrs/ogrenciEvi -d Staging
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}
const App = () => {
    const [isFirstLauncher, setIsFirstLauncher]= useState(null);
    useEffect(() => {
        AsyncStorage.getItem('username').then(value =>{
          if(value==null){
            setIsFirstLauncher(false);
          } else {
            setIsFirstLauncher(true)
          }
        });
      }, []);

    if(isFirstLauncher=== null){
        return null;
      } else if( isFirstLauncher=== true ){
        return (
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName={'Home'}>
                    <Stack.Screen name="HomeAccountCreate" component={HomeAccountCreate}
                        options={{ title:'Ev Hesabı Oluştur', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    
                    <Stack.Screen name="ToDoList" component={ToDoList}
                        options={{ title:'ToDoList', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />

                     <Stack.Screen name="Bildirimler" component={Notification}
                        options={{ title:'Bildirimler', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />

                    <Stack.Screen name="HomeCodeView" component={HomeCodeView}
                        options={{ title:'Ev Hesabı Oluşturuldu', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    
                    <Stack.Screen name="Store" component={Store}
                    options={{ title:'Market', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                        
                   <Stack.Screen name="Profile" component={Profile}
                        options={{ title:'Profil', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                   
                    <Stack.Screen name="Entry" component={Entry}
                        options={{ title:'Giriş', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="ShoppingAdd" component={ShoppingAdd}
                        options={{ title:'Alışveriş Ekle', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="DeptAdd" component={DebtAdd}
                        options={{ title:'Tahsilat Ekle', headerShown: true, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}} />
                    <Stack.Screen name="InvoiceAdd" component={InvoiceAdd}
                        options={{title:'Fatura Ekle', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="LogIn" component={LogIn}
                        options={{ title:'Giriş Yap', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="SingIn" component={SingIn}
                        options={{ title:'Kayıt Ol', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="ProfilePhoto" component={ProfilePhoto}
                        options={{ title:'Kaydı Tamamla', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Detay" component={BookDetail}
                        options={{ title: 'Harcama Detayı', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Home" component={Tabs}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="ProductAdd" component={ProductAdd}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="ProductDetail" component={ProductDetail}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="Blog" component={Blog}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="BlogText" component={BlogText}
                        options={{ title:' ', headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
      }else {
        return (
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName={'LogIn'}>
                    <Stack.Screen name="HomeAccountCreate" component={HomeAccountCreate}
                        options={{ title:'Ev Hesabı Oluştur', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                     <Stack.Screen name="Profile" component={Profile}
                        options={{ title:'Profil', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                   
                   <Stack.Screen name="ToDoList" component={ToDoList}
                        options={{ title:'ToDoList', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />

                   <Stack.Screen name="Bildirimler" component={Notification}
                        options={{ title:'Bildirimler', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />

                    <Stack.Screen name="HomeCodeView" component={HomeCodeView}
                        options={{ title:'Ev Hesabı Oluşturuldu', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="Store" component={Store}
                    options={{ title:'Market', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                        
                    <Stack.Screen name="Entry" component={Entry}
                        options={{ title:'Giriş', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="ShoppingAdd" component={ShoppingAdd}
                        options={{ title:'Alışveriş Ekle', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="DeptAdd" component={DebtAdd}
                        options={{ title:'Tahsilat Ekle', headerShown: true, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}} />
                    <Stack.Screen name="InvoiceAdd" component={InvoiceAdd}
                        options={{title:'Fatura Ekle', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="LogIn" component={LogIn}
                        options={{ title:'Giriş Yap', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="SingIn" component={SingIn}
                        options={{ title:'Giriş Yap', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Detay" component={BookDetail}
                        options={{ title: 'Harcama Detayı', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Home" component={Tabs}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="ProfilePhoto" component={ProfilePhoto}
                        options={{ title:'Kaydı Tamamla', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="ProductAdd" component={ProductAdd}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="ProductDetail" component={ProductDetail}
                        options={{ title:' ', headerShown: false }} />
                     <Stack.Screen name="Blog" component={Blog}
                        options={{ title:' ', headerShown: false }} />
                     <Stack.Screen name="BlogText" component={BlogText}
                        options={{ title:' ', headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
      }
    }



export default codePush(App);
