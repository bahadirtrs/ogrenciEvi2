import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView, ScrollView} from 'react-native';
import DealType from '../components/ShoppingDetails/ShoppingType/DealType';
import DebtType from '../components/ShoppingDetails/ShoppingType/DebtType';
import InvoiceType from '../components/ShoppingDetails/ShoppingType/InvoiceType';
import MenuShopDetails from '../components/MenuShopDetails';
const Home = ({route, navigation}) => {
  const {data} = route.params;
  const {username} = route.params;
  return (
    <>
      <StatusBar backgroundColor={'#4e9b8f'} barStyle="light-content" />
      <SafeAreaView backgroundColor={'#4e9b8f'} />
      <ScrollView>
        <MenuShopDetails
          data={data}
          username={username}
          pageName={'Harcama Detayı'}
          butonPress={() => navigation.goBack()}
        />
        {data && data.type === '1' ? (
          <DealType data={data} />
        ) : data && data.type === '2' ? (
          <InvoiceType data={data} />
        ) : (
          <DebtType data={data} />
        )}
      </ScrollView>
      <SafeAreaView />
    </>
  );
};

export default Home;
