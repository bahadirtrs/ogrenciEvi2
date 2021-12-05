import React from 'react'
import { View, StyleSheet, Image} from 'react-native'
import {SIZES } from '../../../constants';
import ItemOne from '../ItemOne'
import PlugButton from '../PlugButton'
import ItemTwo from '../ItemTwo'
import ItemOneAmount from '../ItemOneAmount'
import moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')


export default function DealType({data}) {
    return (
    <View style={styles.container}>
        <View style={{height:10}}></View>
        <ItemOne icon={"clipboard"} title={"Fatura Adı"} answer={data.shoppingName} />
        <ItemOne icon={"user-check"}  title={"Faturayı Ödeyen"} answer={data.name} />
        <ItemOneAmount icon={"comment-dollar"}  title={"Fatura Tutarı"} answer={data.sales} />
        <ItemOne icon={"calendar-alt"}  title={"Son Ödeme Tarihi"} answer={data.date && moment(data.date).format('LL')} />
        <ItemTwo icon={"users"}  title={"Alışverişe Dahil Olanlar"} answer={data&&data.users} />     
        <ItemOneAmount icon={"money-bill-wave"} title={"Kişi Başına Düşen Tutar"} answer={data.salesExp} />
        {data.image!=='noData'&& <PlugButton imageUrl={data.image} text={'Fatura Görselini Görüntüle'} /> }
        
    </View>
    )
}
const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        width:SIZES.width,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent:'flex-start',
    },
})

