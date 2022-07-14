import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform, 
  ScrollView,
  StyleSheet,
  Picker
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { CardStyleInterpolators } from 'react-navigation-stack'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from 'react-native-underline-tabbar'
import { NavigationEvents } from 'react-navigation'
import WooComFetch, { getUrl } from '../common/WooComFetch'
import { connect } from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import themeStyle from '../common/Theme.style'
const WIDTH = Dimensions.get('window').width
class SignUpScreen extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' }
    }
  }



  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      myAccountData: {},
      firstName: SyncStorage.get('customerData').customers_firstname,
      lastName: SyncStorage.get('customerData').customers_lastname,
      errorMessage: '',
      spinnerTemp: false,
      phone: SyncStorage.get('customerData').phone,
      currentPassword: '',
      password: '',
      refercode:'',
      pincode:'',
      upline:'',
      email:'',
      contact:'',
      address:'',
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
      selectedTitle:'',
      first_name:'',
      last_name:'',
      dob:'',
      selectedGender:'',
      spouseName:'',
      success: '',
      customers_id: '',
      image_id: 0,
      customers_telephone: '',
      countryObject: []
    }
  }

  /// /////////////////////////////////////////////////////////
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: 'Sign Up'
    })

    var dat = { type: 'null' }
    const data = WooComFetch.postHttp(
      getUrl() + '/api/' + 'getcountries',
      dat
    )
    console.log('get Country', data);
  //  this.setState({ countryObject: data.data.data })
  }

  canBeSubmitted () {
    const { phone } = this.state
    return (
      phone.length >= 11 || phone.length == 0
    )
  }

  /// ///////////////////////////////////////////////////
  updateInfo = t => {
    const reg = /^([0-9\(\)\/\+ \-]*)$/
    if (reg.test(this.state.phone) === false) {
      t.setState({
        errorMessage: this.props.isLoading.Config.languageJson2['The phone number is not valid'],
        success: '0'
      })
      return
    }

    if (!this.canBeSubmitted()) {
      t.setState({
        errorMessage: this.props.isLoading.Config.languageJson2['The phone number is not valid in length'],
        success: '0'
      })
      return
    }
    t.setState({ spinnerTemp: true })

    t.state.myAccountData.customers_firstname = t.state.firstName
    t.state.myAccountData.customers_lastname = t.state.lastName
    t.state.myAccountData.customers_telephone = t.state.phone
    t.state.myAccountData.customers_id = SyncStorage.get(
      'customerData'
    ).customers_id
    if (t.state.password != '') { t.state.myAccountData.password = t.state.password }
    t.UpdateCustomerData1(
      t.state.myAccountData
    )
  }

  chnageCountry = (country) =>{
      console.log('selected Counry', country)
       this.setState({ selectedCountry:country})
  }

  chnageState = (state) =>{
      console.log('selected State', state)
       this.setState({ selectedState:state})
  }

  chnageCity = (city) =>{
      console.log('selected City', city)
       this.setState({ selectedCity:city})
  }

  chanageTitle = (title) =>{
      console.log('selected Title', title)
       this.setState({ selectedTitle:title})
  }

  chanageGender = (gender) =>{
      console.log('selected Title', gender)
       this.setState({ selectedGender:gender})
  }

  signup = () => {
    console.log('Clicked')
    this.props.navigation.navigate('HOME')
  }


  /// ///////////////////////////////////////////////////
  UpdateCustomerData1 = async (object) => {
    const data = await WooComFetch.postHttp(
      getUrl() + '/api/' + 'updatecustomerinfo',
      object
    )
    if (data.data.success === '1') {
      SyncStorage.set('customerData', Object.assign(SyncStorage.get('customerData'),
        {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          phone: this.state.phone,
          customers_telephone: this.state.phone
        }))
    }
    this.setState({
      spinnerTemp: false,
      currentPassword: '',
      password: '',
      errorMessage: data.data.message,
      success: data.data.success
    })
  }

  /// //////
  render () {
    return (
      <ScrollView style={{ backgroundColor: themeStyle.backgroundColor }}>
       
                  <View>
                             <View style={styles.personelCard}>
                                  <Text style={styles.distributor}>PERSONAL DETAILS</Text>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/user-icon.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Referral Code"
                                      onChangeText={refercode =>
                                        this.setState({ refercode, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      width: WIDTH * 0.9,
                                      textAlign: 'center',
                                      justifyContent:'center',
                                      alignItems:'center',
                                      paddingTop: 10,
                                      paddingBottom: 10
                                    }}
                                  ><Text>OR</Text></View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/user-icon.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                       <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Valid Upline"
                                      onChangeText={upline =>
                                        this.setState({ upline, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                 
                             </View>

                             <View style={styles.contactCard}>
                                  <Text style={styles.distributor}>CONTACT DETAILS</Text>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Picker
                                          selectedValue={this.state.selectedCountry}
                                          style={{ 
                                            height: 38,
                                            width: WIDTH * 0.9,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            fontSize: themeStyle.mediumSize + 2,
                                            color: themeStyle.textColor
                                             }}
                                          onValueChange={(itemValue, itemIndex) => this.chnageCountry(itemValue)}
                                        >
                                          <Picker.Item label="Select Country" value="" />
                                          <Picker.Item label="India" value="IND" />
                                          <Picker.Item label="America" value="USA" />
                                        </Picker>
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Pincode"
                                      onChangeText={pincode =>
                                        this.setState({ pincode, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Picker
                                          selectedValue={this.state.selectedState}
                                          style={{ 
                                            height: 38,
                                            width: WIDTH * 0.9,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            fontSize: themeStyle.mediumSize + 2,
                                            color: themeStyle.textColor
                                             }}
                                          onValueChange={(itemValue, itemIndex) => this.chnageState(itemValue)}
                                        >
                                          <Picker.Item label="Select State" value="" />
                                          <Picker.Item label="Tamilnadu" value="TN" />
                                        </Picker>
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Picker
                                          selectedValue={this.state.selectedCity}
                                          style={{ 
                                            height: 38,
                                            width: WIDTH * 0.9,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            fontSize: themeStyle.mediumSize + 2,
                                            color: themeStyle.textColor
                                             }}
                                          onValueChange={(itemValue, itemIndex) => this.chnageCity(itemValue)}
                                        >
                                          <Picker.Item label="Select City" value="" />
                                          <Picker.Item label="Chennai" value="chennai" />
                                        </Picker>
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/telephone.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Mobile"
                                      onChangeText={contact =>
                                        this.setState({ contact, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/email.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Email"
                                      onChangeText={email =>
                                        this.setState({ email, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Address"
                                      onChangeText={address =>
                                        this.setState({ address, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  
                             </View>

                             <View style={styles.residentCard}>
                                  <Text style={styles.distributor}>PERSONAL DETAILS</Text>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/user-icon.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Picker
                                          selectedValue={this.state.selectedGender}
                                          style={{ 
                                            height: 38,
                                            width: WIDTH * 0.9,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            fontSize: themeStyle.mediumSize + 2,
                                            color: themeStyle.textColor
                                             }}
                                          onValueChange={(itemValue, itemIndex) => this.chanageGender(itemValue)}
                                        >
                                          <Picker.Item label="Select Title" value="" />
                                          <Picker.Item label="Mr." value="Mr." />
                                          <Picker.Item label="Mrs." value="Mrs." />
                                          <Picker.Item label="Dr." value="Dr." />
                                          <Picker.Item label="Ms." value="Ms." />
                                        </Picker>
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/user-icon.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="First Name"
                                      onChangeText={first_name =>
                                        this.setState({ first_name, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/user-icon.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Last Name"
                                      onChangeText={last_name =>
                                        this.setState({ last_name, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <TextInputMask 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      type={'datetime'}
                                      options={{
                                        format: 'DD/MM/YYYY'
                                      }}
                                      placeholder="DD/MM/YYYY"
                                      value={this.state.dob}
                                      onChangeText={dob => {
                                        this.setState({
                                          dob: dob
                                        })
                                      }}
                                       />
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                     <Picker
                                          selectedValue={this.state.selectedTitle}
                                          style={{ 
                                            height: 38,
                                            width: WIDTH * 0.9,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            fontSize: themeStyle.mediumSize + 2,
                                            color: themeStyle.textColor
                                             }}
                                          onValueChange={(itemValue, itemIndex) => this.chanageTitle(itemValue)}
                                        >
                                          <Picker.Item label="Select Gender" value="" />
                                          <Picker.Item label="Male" value="Male" />
                                          <Picker.Item label="Female" value="Female" />
                                          <Picker.Item label="Others" value="Others" />
                                        </Picker>
                                    </View>
                                  </View>
                                   
                             </View>
                             <View style={styles.panText}>
                                <Text style={styles.distributor}>SPOUSE DETAILS</Text>
                                <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                     <TextInput 
                                       style={{
                                        height: 38,
                                        width: WIDTH * 0.9,
                                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: themeStyle.mediumSize + 2,
                                        color: themeStyle.textColor
                                      }}
                                      placeholder="Spouse Name"
                                      onChangeText={spouseName =>
                                        this.setState({ spouseName, errorMessage: '' })
                                      }
                                       />
                                    </View>
                                  </View>
                            </View>
                             <View style={styles.panText}>
                                <Text style={styles.distributor}>DISTRIBUTOR ID</Text>
                                <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        >
                                        </Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                     <Picker
                                          selectedValue={this.state.selectedGender}
                                          style={{ 
                                            height: 38,
                                            width: WIDTH * 0.9,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            fontSize: themeStyle.mediumSize + 2,
                                            color: themeStyle.textColor
                                             }}
                                          onValueChange={(itemValue, itemIndex) => this.chanageGender(itemValue)}
                                        >
                                          <Picker.Item label="Select Distributor ID" value="" />
                                          <Picker.Item label="8794352" value="8794352" />
                                          <Picker.Item label="4321567" value="4321567" />
                                          <Picker.Item label="6543218" value="6543218" />
                                          <Picker.Item label="8065421" value="8065421" />
                                        </Picker>
                                    </View>
                                  </View>
                            </View>
                            <View style={styles.subBtn}>
                              <TouchableOpacity
                               onPress={() => this.signup()}
                               >
                                <View
                                  style={{
                                    marginTop: 18,
                                    alignItems: 'center',
                                    height: 48,
                                    width: WIDTH * 0.9,
                                    backgroundColor: themeStyle.otherBtnsColor,
                                    justifyContent: 'center',
                                    borderRadius: 30
                                  }} >
                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      color: themeStyle.otherBtnsText,
                                      fontSize: themeStyle.mediumSize+4,
                                      fontWeight: '500'
                                    }}>
                                    {'Sign Up'}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                            
                  </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 160,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1
  },
  image: {
    width: 106,
    height: 69,
    marginTop: 7,
    marginLeft: "38%"
  },
  userIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
  omAgencies: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontWeight:'bold',
    marginTop: 5,
    marginLeft: "40%"
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 12,
    marginTop: 4,
    marginLeft: "34%"
  },
  profileText: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 5,

  },
  panText: {
    height: 100,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
  },
   subBtn: {
    height: 80,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  distributor: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontWeight:'bold',
    marginTop: 0,
    marginLeft:"3%",
  },
   distributorValue: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 8,
    marginLeft:"3%",
  },
  personelCard: {
    height: 190,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 5,
  },
  contactCard: {
    height: 370,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 5,
  },
  residentCard: {
    height: 270,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 5,
  },
  genderRow: {
    height: 27,
    flexDirection: "row",
    marginTop: 19,
    marginRight: 84,
    
  },
  genderColumn: {
    width: 27,
    marginTop: 1,
    marginLeft: 10,
  },
  genderSecondColumn: {
    width: "100%",
    marginLeft: "2%",
    marginBottom: 1
  },
  profileValue: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 8,
    marginLeft:3,
  },
});

const mapStateToProps = state => ({
  isLoading: state
})

export default connect(mapStateToProps, null)(SignUpScreen)
