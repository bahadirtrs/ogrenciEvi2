import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const EntryPage = {
   logOutButtonText:'LogOut',
   welcome:'Hello',
   welcomeText:'Student house is a mobile application created to manage your and your flatmates expenses regularly.',
   questionTitle:'What do you want to do?',
   homeCodeText:'If one of your friends has installed the app and created a Home Account, you can join that account.',
   homeCodePlaceholderText:'Enter the 5 digit house account code',
   homeCodeMessageText:'Opps!!Something went wrong. Please check the information you entered.',
   homeCodeButtonText:'Join Account',
   homeAccountText:'If no one at home has installed the app, you can create a Home account and invite your friends.',
   homeAccountButtonText:'Create Home Account',
   personelAccountText:'If you want, you can use the application personally without joining your home account.',
   personelAccountButtonText:'Use as Personal Account',
   helpButtonOneText:'Dont know how to use it?',
   helpButtonTwoText:'Learn Now'

};

export const ShoppingAddPage ={
   shoppingName:'Shoping Name',
   shoppingDesc:'Statement',
   pays:'pays',
   pageTitle:'Add Shopping',
   shoppingUser:'Included in shopping',
   paymentTitle:'Payment details',
   paymentDescription: 'View per capita payment amounts',
   noSales:'You need to enter the amount of shopping to be able to calculate.',
   noUsers:'When you select the users included in the invoice, the amount per person will be displayed here.',
   deptUsername:'Who did the shopping?',
   deptUserDesc:'Calculations will be made through the user you selected.',
   shoppingUserDesc:'Tap on those of your housemates involved in the shopping.',
   deptTitle:'Tap to change',
   deptTitleHover:'Tap to shrink',
   dateTitle:'Select invoice payment date',
}

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
   homeTitle:'Your expenses are ',
   homeTitleDes: 'always under control!',
   infoText:'İnappropriate Mistress',
   notPassTitle:'Password Error',
   noPassDesc:"Please enter your username and password.",
   emailPlaceholder:'E-mail adress',
   passwordPlaceholder:'Password',
   butonTitle:'Login',
   endButtonOne:'Dont have an account?',
   endButtonTwo:'Sing Up',
   socialIconText:'Sign Up With!'
};
export const HacPage ={
   pageTitle:'Add Home Account',
   headerDes:'Build your home for shared use',
   homeNamePh:'House Nickname',
   city:'City',
   userCount:'Number of Living in the House',
   buttonTitle:'Create Home Account'

};

export const SingInPage ={
   homeTitle:'Save your expenses',
   homeTitleDes: 'register now!',
   emailPh:'E-mail Adress',
   password:'Password',
   passwordRepeat:'Password Repeat',
   buttonText:'Continue',
   endButtonOne:'Do you have an account?',
   endButtonTwo:'Login',
 
 };
 
 export default {
    EntryPage, 
    ShoppingAddPage, 
    LogInPage,
    InvoiceAddPage,
    HacPage,
    SingInPage
}