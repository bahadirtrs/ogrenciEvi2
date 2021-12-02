import React from 'react';
import {View,StatusBar,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import SubmitButton from '../components/Button/SubmitButton';
import ShareButton from '../components/Button/ShareButton';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageSelect from '../language';

const ProfilePhoto = ({route, navigation}) => {
  const {homeCode} = route.params;
 
  return (
    <ScrollView>
      <SafeAreaView backgroundColor={COLORS.lightGreen} />
      <StatusBar backgroundColor={COLORS.lightGreen} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerExp}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
              <Icon name={'arrow-back'} size={25} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{color: '#f1f1f1', fontSize: 17, ...FONTS.medium}}>
              {LanguageSelect().HacPage.pageTitle}
            </Text>
            <TouchableOpacity style={styles.infoBotton}>
              <Icon
                name={'information-circle-outline'}
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
       
          <View style={styles.nextContainer}>
            <View style={styles.nextContainerExp}>
              <Icon name={'checkmark-circle-outline'} size={90} color="#fff" />
              <Text style={styles.nextTitle}>{'Tebrikler!'}</Text>
              <Text style={styles.nextDescription}>
                {'Ev hesabı başarıyla oluşturuldu.'}
              </Text>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{homeCode}</Text>
              <Text style={styles.codeDescription}>
                {'bu kod ile diğer kullanıcıların eve katılmasını sağlayabilirsiniz.'}
              </Text>
              <View style={styles.buttonView}>
                <ShareButton
                  code={homeCode}
                  text={"Ortak ev hesabına katılmak için kullanabileceğin EvKodu: "}
                  title={'Ev Kodunu paylaş'}
                />
                <ShareButton
                  code={(`bahadirtiras.com.tr/ogrenciEvi/index.php?res=${homeCode}`)}
                  text={"Harcamalarımızı tutacağımız Öğrenci Evi uygulamasını denemelisin!! İndirmek için hemen tıkla: "}
                  title={'Arkadaşına davet gönder'}
                />
                <SubmitButton
                  title={'Kullanmaya başla'}
                  butonPress={() => navigation.navigate('Home')}
                />
              </View>
            </View>
          </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  header: {
    width: SIZES.width,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGreen,
  },

  headerExp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backBotton: {
    backgroundColor: COLORS.lightGreen,
    paddingLeft: 20,
    width: 50,
  },
  infoButton: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.lightGreen,
    paddingRight: 20,
    width: 50,
  },

  logo: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    height: 180,
  },
  logoText: {
    ...FONTS.medium,
    color: '#fff',
    fontSize: 12,
    paddingTop: 10,
  },
  endButtonContainer: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextContainer: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },

  nextContainerExp: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    height: 180,
  },

  nextTitle: {
    ...FONTS.medium,
    color: '#fff',
    fontSize: 30,
    paddingTop: 0,
  },
  nextDescription:{
    ...FONTS.medium,
    color: '#fff',
    fontSize: 14,
    paddingTop: 0,
  },
  //code styles
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },

  codeText: {
    ...FONTS.medium,
    color: COLORS.lightGreen,
    fontSize: 40,
    paddingTop: 10,
  },
  codeDescription: {
    ...FONTS.regular,
    color: '#333',
    fontSize: 13,
    paddingTop: 5,
    textAlign: 'center',
  },

  buttonView: {
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...FONTS.bold,
    fontSize: 22,
    color: '#333',
    marginBottom: 0,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
});

export default ProfilePhoto;
