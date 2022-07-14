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
class MyTrainingScreen extends Component {
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
      headerTitle: 'Training'
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
       
                  <View>
                     <ScrollableTabView
                          style={{
                            height:780
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
                              label:'Training'
                            }}

                            style={{backgroundColor: "#E7E9EB"}}

                            >

                            <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>CNT Events</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Sunedge Initiation Programme</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Sunedge Leadership Conclave</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Meet The Millionaire</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Personal Care and Mistral of Milan</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                              <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Sunedge Award Function</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                              <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Dale Carnegie</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                              <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Healthcare</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                              <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Special Training</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Sunedge Wellness Symposium</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Anniversary Event</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.panText}>
                               <View style={styles.container}>
                                  <View style={styles.leftItem}><Text style={styles.leftData}>Sunedge Leader Conclave 2</Text></View>
                                  <View style={styles.rightItem}><Text style={styles.arrow}> > </Text></View>
                               </View>
                             </TouchableOpacity>
                            
                             
                            </ScrollView>
                           
                            <View
                            tabLabel={{
                              label:'My Training'
                            }}>
                             

                            </View>

                       </ScrollableTabView>
                  </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
 
  panText: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 6,
    marginBottom: 6,
  },
   container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftItem: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15
  },
  rightItem: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15
  },
  leftData:{
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    fontWeight: '700',
    opacity: 0.75
  },
  arrow: {
    color: "#121212",
    fontSize: 30,
    opacity: 0.4
  }
});

const mapStateToProps = state => ({
  isLoading: state
})

export default connect(mapStateToProps, null)(MyTrainingScreen)
