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
  StyleSheet
} from 'react-native'
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
class MyProfileScreen extends Component {
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

  /// /////////////////////////////////////////////////////////
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: 'Profile'
    })
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
      success: '',
      customers_id: '',
      image_id: 0,
      customers_telephone: '',
      customerData: SyncStorage.get('customerData')
    }
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
        {/* Profile Viewed */}
                  <View style={styles.button}>
                    <Image
                      source={require("../../assets/images/user.png")}
                      resizeMode="contain"
                      style={styles.image}
                    ></Image>
                    <Text style={styles.omAgencies}>{this.state.customerData.distributor_id}</Text>
                    <Text style={styles.loremIpsum}>Silver Director : {this.state.customerData.distributor_id}</Text>
                  </View>
                  {/* Profile Viewed */}
                  <View>
                     <ScrollableTabView
                          style={{
                            height:600
                          }}
                          tabBarActiveTextColor={themeStyle.primaryDark}
                          locked={!!I18nManager.isRTL}
                          renderTabBar={() => (
                            <TabBar
                              style={{
                                alignItems: 'center',
                                flexDirection: 'column'
                              }}
                              underlineColor={themeStyle.primaryDark}
                              inactiveTextColor='#707070'
                              backgroundColor={themeStyle.backgroundColor}
                              tabBarStyle={{
                                height: 46,
                                marginTop: 0,
                                paddingTop: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: -16,
                                width: '109%'
                              }}
                              tabBarTextStyle={{
                                fontSize: themeStyle.smallSize + 1,
                                width: WIDTH * 0.4182 - 48,
                                textAlign: 'center',
                                fontWeight: Platform.OS === 'android' ? '900' : '400'
                              }}
                            />
                          )}>

                          <ScrollView
                            tabLabel={{
                              label:'PROFILE'
                            }}>
                             <View style={styles.profileText}>
                                <Text style={styles.distributor}>My DISTRIBUTOR ID</Text>
                                <Text style={styles.distributorValue}>{this.state.customerData.distributor_id}</Text>
                             </View>
                              <View style={styles.profileText}>
                                  <Text style={styles.distributor}>UPLINE ID</Text>
                                  <Text style={styles.distributorValue}>56784321</Text>
                             </View>
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
                                      <Text style={styles.profileValue}>OM</Text>
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
                                      <Text style={styles.profileValue}>AGENCIES</Text>
                                    </View>
                                  </View>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/calendar.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Text style={styles.profileValue}>17 JAN 2020</Text>
                                    </View>
                                  </View>
                             </View>

                             <View style={styles.contactCard}>
                                  <Text style={styles.distributor}>CONTACT DETAILS</Text>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/user-icon.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Text style={styles.profileValue}>9876543210</Text>
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
                                      <Text style={styles.profileValue}>test@gmail.com</Text>
                                    </View>
                                  </View>
                                  
                             </View>

                             <View style={styles.residentCard}>
                                  <Text style={styles.distributor}>RESIDENTIAL ADDRESS</Text>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Text style={styles.profileValue}>600 023</Text>
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
                                      <Text style={styles.profileValue}>OMR MAIN ROAD</Text>
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
                                      <Text style={styles.profileValue}>RAJ NAGAR</Text>
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
                                      <Text style={styles.profileValue}>TAMILNADU</Text>
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
                                      <Text style={styles.profileValue}>INDIA</Text>
                                    </View>
                                  </View>
                                  
                             </View>
                             <View style={styles.residentCard}>
                                  <Text style={styles.distributor}>SHIPPING ADDRESS</Text>
                                  <View style={styles.genderRow}>
                                   <View style={styles.genderColumn}>
                                      <Image
                                          source={require("../../assets/images/pin.png")}
                                          resizeMode="contain"
                                          style={styles.userIcon}
                                        ></Image>
                                    </View>
                                    <View style={styles.genderSecondColumn}>
                                      <Text style={styles.profileValue}>600 023</Text>
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
                                      <Text style={styles.profileValue}>OMR MAIN ROAD</Text>
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
                                      <Text style={styles.profileValue}>RAJ NAGAR</Text>
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
                                      <Text style={styles.profileValue}>TAMILNADU</Text>
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
                                      <Text style={styles.profileValue}>INDIA</Text>
                                    </View>
                                  </View>
                                  
                             </View>
                            </ScrollView>
                           
                            <View
                            tabLabel={{
                              label:'PAN BANK'
                            }}>
                             <View style={styles.panText}>
                                <Text style={styles.distributor}>PAN STATUS</Text>
                                <Text style={styles.distributorValue}>Verified</Text>
                             </View>

                              <View style={styles.panText}>
                                <Text style={styles.distributor}>PAN NUMBER</Text>
                                <Text style={styles.distributorValue}>BKBFG9870N</Text>
                             </View>

                             <View style={styles.panText}>
                                <Text style={styles.distributor}>BANK STATUS</Text>
                                <Text style={styles.distributorValue}>Verified</Text>
                             </View>

                              <View style={styles.panText}>
                                <Text style={styles.distributor}>BANK NAME</Text>
                                <Text style={styles.distributorValue}>State Bank</Text>
                             </View>

                             <View style={styles.panText}>
                                <Text style={styles.distributor}>IFSC</Text>
                                <Text style={styles.distributorValue}>SBI000345</Text>
                             </View>

                              <View style={styles.panText}>
                                <Text style={styles.distributor}>ACCOUNT NUMBER</Text>
                                <Text style={styles.distributorValue}>29510045678</Text>
                             </View>

                            </View>

                       </ScrollableTabView>
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
    borderBottomWidth: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: 106,
    height: 69,
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
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 12,
    marginTop: 4,
  },
  profileText: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 5,

  },
  panText: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
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
    height: 140,
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

export default connect(mapStateToProps, null)(MyProfileScreen)
