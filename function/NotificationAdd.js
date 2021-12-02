import React from 'react'
import { View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore';
function NotificationAdd(name,id,sales,shopname,userimage,uniqueID ) {
   firestore()
      .collection('accounts')
      .doc(id)
      .collection('notification')
      .doc()
        .set({
          name:name,
          sales:sales,
          date:firestore.FieldValue.serverTimestamp(),
          shopingName:shopname,
          userimage:'p'+userimage,
          uniqueID:uniqueID
        })
   return 0;
}

export default NotificationAdd;