import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const EntryPage = {
   logOutButtonText:'Çıkış',
   welcome:'Merhaba',
   welcomeText:'Öğrenci evi senin ve ev arkadaşlarının harcamaları düzenli şekilde yönetmek için oluştuturulmuş bir mobil uygulamadır.',
   questionTitle:'Ne Yapmak İstersin?',
   homeCodeText:'Arkadaşlarından birisi uygulamayı yüklemiş ve Ev Hesabı oluşturmuşsa o hesaba katılabilirsin.',
   homeCodePlaceholderText:'5 haneli ev hesabı kodunu giriniz',
   homeCodeButtonText:'Hesaba Katıl',
   homeCodeMessageText:'Hay Aksi!! Bir şeyler ters gitti. Lütfen girdiğin bilgileri kontrol et.',
   homeAccountText:'Eğer evinde hiç kimse uygulamayı yüklememişse Ev hesabı oluşturabilir ve arkadaşlarını davet edebilirsin.',
   homeAccountButtonText:'Ev Hesabı Oluştur',
   personelAccountText:'İstersen  ev hesabına katılmadan uygulamayı kişisel olarak kullanabilirsin.',
   personelAccountButtonText:'Kişisel Hesap Olarak Kullan',
   helpButtonOneText:'Nasıl kullanacağını bilmiyor musun?',
   helpButtonTwoText:'Hemen Öğren'
};

export const ShoppingAddPage ={
   shoppingName:'Alışveriş Adı',
   shoppingDesc:'Açıklama',
   pays:'ödüyor',
   pageTitle:'Alışveriş Ekle',
   shoppingUser:'Alışverişe dahil olanlar',
   paymentTitle:'Ödeme Detayları',
   paymentDescription: 'Kişi başına düşen ödeme tutarlarını görüntüleyin',
   noSales:'Hesaplama yapılamabilmesi için alışveriş tutarını girmeniz gerekmektedir.',
   noUsers:'Faturaya dahil olan kullanıcıları seçtiğinizde kişi başına düşen tutar burada görüntülenecektir.',
   deptUsername:'Alışverişi kim yaptı?',
   deptUserDesc:'Hesaplamalar seçtiğiniz kullanıcı üzerinden yapılacaktır',
   shoppingUserDesc:'Ev arkadaşlarınızdan alışverişe dahil olanlara dokunun.',
   deptTitle:'Değiştirmek için dokunun',
   deptTitleHover:'Küçültmek için dokunun',
   dateTitle:'Alışveriş ödeme tarihini seçiniz',
};

export const InvoiceAddPage ={
   shoppingName:'Fatura Adı',
   shoppingDesc:'Açıklama',
   pays:'ödüyor',
   pageTitle:'Fatura Ekle',
   shoppingUser:'Faturaya dahil olanlar',
   paymentTitle:'Ödeme Detayları',
   paymentDescription: 'Kişi başına düşen ödeme tutarlarını görüntüleyin',
   noSales:'Hesaplama yapılamabilmesi için alışveriş tutarını girmeniz gerekmektedir.',
   noUsers:'Faturaya dahil olan kullanıcıları seçtiğinizde kişi başına düşen tutar burada görüntülenecektir.',
   deptUsername:'Faturayı kim ödedi?',
   deptUserDesc:'Hesaplamalar seçtiğiniz kullanıcı üzerinden yapılacaktır',
   shoppingUserDesc:'Ev arkadaşlarınızdan faturaya dahil olanlara dokunun.',
   deptTitle:'Değiştirmek için dokunun',
   deptTitleHover:'Küçültmek için dokunun',
   dateTitle:'Fatura ödeme tarihini seçiniz',
};

export const LogInPage ={
   homeTitle:'Harcamaların her',
   homeTitleDes: 'zaman kontrol altında!',
   infoText:'Uygunsuz Tanımlama',
   notPassTitle:'Şifre Hatası',
   noPassDesc:"Lütfen kullanıcı adı ve şifrenizi giriniz.",
   emailPlaceholder:'E-posta adresi',
   passwordPlaceholder:'Parola',
   butonTitle:'Giriş Yap',
   endButtonOne:'Hesabınız yok mu?',
   endButtonTwo:'Kayıt Olun',
   socialIconText:'ile kaydolun!'
};

export const HacPage ={
   pageTitle:'Ev Hesabı Ekle',
   headerDes:'Ortak kullanım için evinizi oluşturun',
   homeNamePh:'Ev Takma Adı',
   city:'Şehir',
   userCount:'Evde Yaşayan Sayısı',
   buttonTitle:'Ev Hesabı Oluştur'

};

export const SingInPage ={
  homeTitle:'Harcamalarını kaydetmek',
  homeTitleDes: 'için hemen kayıt ol!',
  emailPh:'E-mail Adresiniz',
  password:'Parolanız',
  passwordRepeat:'Parola Tekrarı',
  buttonText:'Devam Et',
  endButtonOne:'Hesabınız var mı?',
  endButtonTwo:'Giriş Yapın',

};

export default {EntryPage, ShoppingAddPage, LogInPage,InvoiceAddPage,HacPage,SingInPage}