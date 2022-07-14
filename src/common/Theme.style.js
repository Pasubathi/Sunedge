import { Dimensions } from 'react-native'
import uuid from 'react-native-uuid'
const WIDTH = Dimensions.get('window').width
// set card width according to your requirement
const cardWidth = WIDTH * 0.3991
// cardWidth= WIDTH * 0.4191 // card width for two and half card
// cardWidth= WIDTH * 0.6191 // one and half
// cardWidth= WIDTH * 0.42
const cIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1 // default
const cDid = uuid.v4()
export default {
  /// /////////////////////////////

 // url: 'https:// your site URL.com', //your site URL
 // url: 'http://127.0.0.1:8000', //your site URL
  url: 'http://mysunedge.com', //your site URL
  baseUrl: 'http://mysunedge.com', //your site URL
  assetUrl: 'http://mysunedge.com/', //your site URL
  consumerKey: '803d5ff100652fbb755366856ca999da', // Your consumer secret
  consumerSecret: '854beea225b025d6ada29662bb2158ee', // Your consumer secret

  webClientIdForGoogleSign: '',// webClientId For Google SignIn
  /// //// navigation
  homeTitle: 'Sun Edge',
  bottomNavigation: true,
  // please reset app cache after changing these five values
  defaultCurrencySymbol: '₹',
  defaultCurrencyCode: 'INR',
  priceDecimals: 2,
  // by default language for ltr
  ltrlanguageCode: 'en',
  // by default language for rtl
  //rtllanguageCode: 'ar',
  rtllanguageCode: 'en',

  // Banners props
  autoplay: true,
  autoplayDelay: 2,
  autoplayLoop: true,
  StatusBarColor: '#374e02',
  // --ion-color-primary-shade: #374e02;
  barStyle: 'light-content', // dark-content, default

  headerTintColor: '#3e5902',
  headerIconsColor: '#595959',
  headingColor: '#3e5902',

  primaryDark: '#374e02',
  primary: 'rgb(255, 255, 255)',
  // primary: '#3e5902', Primary App Color
  primaryContrast: '#ffffff',
  // backgroundColor: '#F2F2F2',// color for card style 11
  // backgroundColor: '#fdfcfa',
  backgroundColor: '#fdfdfd',
  textColor: '#000',
  textContrast: '#000',

  google: '#dd4b39',
  facebook: '#3b5998',

  // Button Colors
  addToCartBtnColor: '#3e5902',
  addToCartBtnTextColor: '#fff',
  // addToCartBagBtnColor: '#4E4E4E',
  addToCartBagBtnColor: '#3e5902',

  outOfStockBtnColor: '#D81800',
  outOfStockBtnTextColor: '#fff',

  detailsBtnColor: '#3e5902',
  detailsBtnTextColor: '#fff',
  removeBtnColor: '#D81800',
  removeBtnTextColor: '#fff',
  wishHeartBtnColor: '#3e5902',
  otherBtnsColor: '#3e5902',
  otherBtnsText: '#fff',

  saleBackgroundColor: '#3e5902',
  saleTextColor: '#fff',
  featuredBackgroundColor: '#3e5902',
  featuredTextColor: '#fff',
  newBackgroundColor: '#D81800',
  newTextColor: '#fff',

  priceColor: '#000',

  /// ///////// font size

  largeSize: 16,
  mediumSize: 14,
  smallSize: 12,

  /// //////// cartWidth
  singleRowCardWidth: cardWidth,
  twoRowCardWIdth: 0.465,
  loadingIndicatorColor: '#3e5902',
  ipAdress: cIp,
  deviceId: cDid
}
