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
  Button
} from 'react-native'
import Svg, { Ellipse } from "react-native-svg";
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
class NetworkScreen extends Component {
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
      headerTitle: 'Network'
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

    }
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

  expandCard = (CardKey) =>{
      console.log('Card Clicked now : '+CardKey);
      this['item-'+CardKey].setNativeProps({style: {"height": 350,}});
      this['column-'+CardKey].setNativeProps({style: {"display": 'flex',}});
      this['upbtn-'+CardKey].setNativeProps({style: {"display": 'flex',}});
      this['downbtn-'+CardKey].setNativeProps({style: {"display": 'none',}});
  }
  deExpandCard = (CardKey) =>{
      console.log('Card Close Clicked now : '+CardKey);
      this['item-'+CardKey].setNativeProps({style: {"height": 85,}});
      this['column-'+CardKey].setNativeProps({style: {"display": 'none',}});
      this['upbtn-'+CardKey].setNativeProps({style: {"display": 'none',}});
      this['downbtn-'+CardKey].setNativeProps({style: {"display": 'flex',}});
  }

  /// //////
  render () {
    return (
      <ScrollView style={{ backgroundColor: themeStyle.backgroundColor }}>
       
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
                              label:'MY NETWORK'
                            }}>
                            <View style={styles.cardContainer}>
                              <View style={styles.serchItem}>
                                <TextInput
                                    style={{
                                      marginTop: 20,
                                      height: 38,
                                      borderColor: '#c1c1c1',
                                      borderBottomWidth: 1,
                                      textAlign: I18nManager.isRTL ? 'right' : 'left',
                                      paddingLeft: 12,
                                      paddingRight: 6,
                                      fontSize: themeStyle.mediumSize + 2,
                                      color: themeStyle.textColor
                                    }}
                                    placeholderTextColor={'#c1c1c1'}
                                    selectionColor={themeStyle.primaryDark}
                                    placeholder={'Distributor ID'}
                                  />
                                </View>
                                <View style={styles.serchBtn}>
                                <TouchableOpacity >
                                        <View  style={{
                                          marginTop: 20,
                                          alignItems: 'center',
                                          height: 38,
                                          justifyContent: 'center',
                                          opacity: 1,
                                        }} >
                                          <Text
                                          style={{
                                              textAlign: 'center',
                                              color: themeStyle.otherBtnsColor,
                                              fontSize: themeStyle.mediumSize,
                                              fontWeight: '500'
                                            }}
                                            >Search</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                           <View style={styles.container}>
                              <View style={styles.rect3Row}>
                                <View style={styles.rect3}>
                                  <View style={styles.rect6}></View>
                                </View>

                                {/* Card Start */}
                              <View style={styles.cardContainer}>
                                <View style={styles.cardItem}>    
                                <View style={styles.rect4}></View>
                                <View 
                                style={styles.rect5} 
                                key={'1'}
                                ref={(thisItem) => this[`item-1`] = thisItem}
                                >
                                    <Text style={styles.pravinPawar}>PRAVIN PAWAR</Text>
                                    <View style={styles.pointValueStackRow}>
                                        <View style={styles.pointValueStack}>
                                          <Text style={styles.pointValue}>Point Value</Text>
                                        </View>
                                        <View style={styles.pointValue1Stack}>
                                          <Text style={styles.pointValue1}>0</Text>
                                        </View>
                                    </View>
                                    <View style={styles.id76543219Column}>
                                          <Text style={styles.id76543219}>ID: 76543219</Text>
                                          <Text style={styles.pointValue2}>11%</Text>
                                    </View>
                                    <Image
                                      source={require("../../assets/images/star.png")}
                                      resizeMode="contain"
                                      style={styles.image}
                                    ></Image>
                                    <TouchableOpacity onPress={()=>this.expandCard('1')} >
                                      <View style={styles.ellipseStack1}  key={'down-1'} ref={(thisItem) => this[`downbtn-1`] = thisItem}>
                                        <Svg viewBox="0 0 22.5 22.97" style={styles.ellipse1} >
                                          <Ellipse
                                            strokeWidth={0}
                                            cx={11}
                                            cy={11}
                                            rx={11}
                                            ry={11}
                                            fill="rgba(220,215,215,1)"
                                            stroke="rgba(116,114,114,1)"
                                          ></Ellipse>
                                        </Svg>
                                        <Image
                                          source={require("../../assets/images/down-arrow.png")}
                                          resizeMode="contain"
                                          fill="rgba(230, 230, 230,1)"
                                          strokeWidth={80}
                                          stroke="rgba(230, 230, 230,0)"
                                          style={styles.image2}
                                        ></Image>
                                      </View>
                                    </TouchableOpacity>
                                
                                  <View style={styles.tableContainer} key={'col-1'} ref={(thisItem) => this[`column-1`] = thisItem}>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Designation</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>Distributor</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Cumulative PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>9608.92</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Exclusive PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Self PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Group PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Total Cumulative PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>9608.92</Text></View>
                                      <View style={styles.headeColumn}><Text style={styles.headeText}>Last Month Point Details</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Exclusive PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Total PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Level</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>NON QUALIFIED DIRECTOR</Text></View>
                                  </View>
                                  <TouchableOpacity onPress={()=>this.deExpandCard('1')}>
                                      <View style={styles.ellipseStack} key={'up-1'} ref={(thisItem) => this[`upbtn-1`] = thisItem}>
                                        <Svg viewBox="0 0 22.5 22.97" style={styles.ellipse} >
                                          <Ellipse
                                            strokeWidth={0}
                                            cx={11}
                                            cy={11}
                                            rx={11}
                                            ry={11}
                                            fill="rgba(220,215,215,1)"
                                            stroke="rgba(116,114,114,1)"
                                          ></Ellipse>
                                        </Svg>
                                        <Image
                                          source={require("../../assets/images/down-arrow.png")}
                                          resizeMode="contain"
                                          fill="rgba(230, 230, 230,1)"
                                          strokeWidth={80}
                                          stroke="rgba(230, 230, 230,0)"
                                          style={styles.image3}
                                        ></Image>
                                      </View>
                                  </TouchableOpacity>
                                </View>
                                </View>

                                {/* Card End */} 
                              {/* Card Start */}

                              <View style={styles.cardItem}>    
                                <View style={styles.rect4}></View>
                                <View 
                                style={styles.rect5} 
                                key={'2'}
                                ref={(thisItem) => this[`item-2`] = thisItem}
                                >
                                    <Text style={styles.pravinPawar}>ABHIJIT BABA</Text>
                                    <View style={styles.pointValueStackRow}>
                                        <View style={styles.pointValueStack}>
                                          <Text style={styles.pointValue}>Point Value</Text>
                                        </View>
                                        <View style={styles.pointValue1Stack}>
                                          <Text style={styles.pointValue1}>0</Text>
                                        </View>
                                    </View>
                                    <View style={styles.id76543219Column}>
                                          <Text style={styles.id76543219}>ID: 50518055</Text>
                                          <Text style={styles.pointValue2}>11%</Text>
                                    </View>
                                    <Image
                                      source={require("../../assets/images/star.png")}
                                      resizeMode="contain"
                                      style={styles.image}
                                    ></Image>
                                    <TouchableOpacity onPress={()=>this.expandCard('2')}>
                                      <View style={styles.ellipseStack1}  key={'down-2'} ref={(thisItem) => this[`downbtn-2`] = thisItem}>
                                        <Svg viewBox="0 0 22.5 22.97" style={styles.ellipse1} >
                                          <Ellipse
                                            strokeWidth={0}
                                            cx={11}
                                            cy={11}
                                            rx={11}
                                            ry={11}
                                            fill="rgba(220,215,215,1)"
                                            stroke="rgba(116,114,114,1)"
                                          ></Ellipse>
                                        </Svg>
                                        <Image
                                          source={require("../../assets/images/down-arrow.png")}
                                          resizeMode="contain"
                                          fill="rgba(230, 230, 230,1)"
                                          strokeWidth={80}
                                          stroke="rgba(230, 230, 230,0)"
                                          style={styles.image2}
                                        ></Image>
                                      </View>
                                    </TouchableOpacity>
                                
                                  <View style={styles.tableContainer} key={'col-2'} ref={(thisItem) => this[`column-2`] = thisItem}>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Designation</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>Distributor</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Cumulative PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>5604.92</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Exclusive PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Self PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Group PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Total Cumulative PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>5604.92</Text></View>
                                      <View style={styles.headeColumn}><Text style={styles.headeText}>Last Month Point Details</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Exclusive PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Total PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Level</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>NON QUALIFIED DIRECTOR</Text></View>
                                  </View>
                                  <TouchableOpacity onPress={()=>this.deExpandCard('2')} >
                                      <View style={styles.ellipseStack} key={'up-2'} ref={(thisItem) => this[`upbtn-2`] = thisItem}>
                                        <Svg viewBox="0 0 22.5 22.97" style={styles.ellipse} >
                                          <Ellipse
                                            strokeWidth={0}
                                            cx={11}
                                            cy={11}
                                            rx={11}
                                            ry={11}
                                            fill="rgba(220,215,215,1)"
                                            stroke="rgba(116,114,114,1)"
                                          ></Ellipse>
                                        </Svg>
                                        <Image
                                          source={require("../../assets/images/down-arrow.png")}
                                          resizeMode="contain"
                                          fill="rgba(230, 230, 230,1)"
                                          strokeWidth={80}
                                          stroke="rgba(230, 230, 230,0)"
                                          style={styles.image3}
                                        ></Image>
                                      </View>
                                  </TouchableOpacity>
                                </View>
                                </View>

                                {/* Card End */}

                                </View>
                              </View>
                            </View>
                            
                            </ScrollView>
                           
                            <ScrollView
                            tabLabel={{
                              label:'STARRED (1)'
                            }}>

                            <View style={styles.container}>
                              <View style={styles.rect3Row}>
                                <View style={styles.rect3}>
                                  <View style={styles.rect6}></View>
                                </View>

                                {/* Card Start */}
                              <View style={styles.cardContainer}>
                                <View style={styles.cardItem}>    
                                <View style={styles.rect4}></View>
                                <View 
                                style={styles.rect5} 
                                key={'3'}
                                ref={(thisItem) => this[`item-3`] = thisItem}
                                >
                                    <Text style={styles.pravinPawar}>GOPINATH</Text>
                                    <View style={styles.pointValueStackRow}>
                                        <View style={styles.pointValueStack}>
                                          <Text style={styles.pointValue}>Point Value</Text>
                                        </View>
                                        <View style={styles.pointValue1Stack}>
                                          <Text style={styles.pointValue1}>0</Text>
                                        </View>
                                    </View>
                                    <View style={styles.id76543219Column}>
                                          <Text style={styles.id76543219}>ID: 76543219</Text>
                                          <Text style={styles.pointValue2}>20%</Text>
                                    </View>
                                    <Image
                                      source={require("../../assets/images/star.png")}
                                      resizeMode="contain"
                                      style={styles.image}
                                    ></Image>
                                    <TouchableOpacity  onPress={()=>this.expandCard('3')}>
                                      <View style={styles.ellipseStack1}  key={'down-3'} ref={(thisItem) => this[`downbtn-3`] = thisItem}>
                                        <Svg viewBox="0 0 22.5 22.97" style={styles.ellipse1} >
                                          <Ellipse
                                            strokeWidth={0}
                                            cx={11}
                                            cy={11}
                                            rx={11}
                                            ry={11}
                                            fill="rgba(220,215,215,1)"
                                            stroke="rgba(116,114,114,1)"
                                          ></Ellipse>
                                        </Svg>
                                        <Image
                                          source={require("../../assets/images/down-arrow.png")}
                                          resizeMode="contain"
                                          fill="rgba(230, 230, 230,1)"
                                          strokeWidth={80}
                                          stroke="rgba(230, 230, 230,0)"
                                          style={styles.image2}
                                        ></Image>
                                      </View>
                                    </TouchableOpacity>
                                
                                  <View style={styles.tableContainer} key={'col-3'} ref={(thisItem) => this[`column-3`] = thisItem}>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Designation</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>Distributor</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Cumulative PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>9608.92</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Exclusive PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Self PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Group PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Total Cumulative PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>9608.92</Text></View>
                                      <View style={styles.headeColumn}><Text style={styles.headeText}>Last Month Point Details</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Exclusive PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Total PV</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>0.00</Text></View>
                                      <View style={styles.leftItem}><Text style={styles.leftColumnText}>Previous Level</Text></View>
                                      <View style={styles.rightItem}><Text style={styles.rightColumnText}>NON QUALIFIED DIRECTOR</Text></View>
                                  </View>
                                  <TouchableOpacity onPress={()=>this.deExpandCard('3')} >
                                      <View style={styles.ellipseStack} key={'up-3'} ref={(thisItem) => this[`upbtn-3`] = thisItem}>
                                        <Svg viewBox="0 0 22.5 22.97" style={styles.ellipse} >
                                          <Ellipse
                                            strokeWidth={0}
                                            cx={11}
                                            cy={11}
                                            rx={11}
                                            ry={11}
                                            fill="rgba(220,215,215,1)"
                                            stroke="rgba(116,114,114,1)"
                                          ></Ellipse>
                                        </Svg>
                                        <Image
                                          source={require("../../assets/images/down-arrow.png")}
                                          resizeMode="contain"
                                          fill="rgba(230, 230, 230,1)"
                                          strokeWidth={80}
                                          stroke="rgba(230, 230, 230,0)"
                                          style={styles.image3}
                                        ></Image>
                                      </View>
                                  </TouchableOpacity>
                                </View>
                                </View>

                                {/* Card End */} 

                                </View>
                              </View>
                            </View>

                            </ScrollView>
                            
                       </ScrollableTabView>
                  </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  cardItem: {
    width: '100%', // is 50% of container width
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  serchItem: {
    width: '80%', // is 50% of container width
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  serchBtn: {

  },
  tableContainer: {
    top: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    display: 'none'
  },
  headeColumn: {
    width: '100%',
    textAlign: 'left',
    alignItems: 'flex-start',
    paddingTop: 5,
  },
  headeText: {
    fontFamily: "roboto-700",
    color: "rgba(74,74,74,1)",
    fontSize: 16,
    elevation: 30,
    fontWeight: "bold",
    paddingLeft: 17
  },
  leftItem: {
    width: '50%', // is 50% of container width
    textAlign: 'left',
    alignItems: 'flex-start',
    paddingTop: 5,
  },
  leftColumnText: {
    fontFamily: "roboto-700",
    color: "rgba(74,74,74,1)",
    fontSize: 13,
    paddingLeft: 17
  },
  rightItem: {
    width: '50%', // is 50% of container width
    textAlign: 'right',
    alignItems: 'flex-end',
    paddingTop: 5,
  },
  rightColumnText: {
    fontFamily: "roboto-700",
    color: "rgba(74,74,74,1)",
    fontSize: 13,
    fontWeight: "bold",
    paddingRight: 10
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  genderRow: {
    height: 27,
    flexDirection: "row",
    marginTop: 19,
    marginRight: 84,
    
  },
  genderColumn: {
    width: "50%",
    marginTop: 1,
    marginLeft: 10,
    textAlign: "left"
  },
  userIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
  genderSecondColumn: {
    width: "50%",
    marginLeft: "2%",
    marginBottom: 1,
    textAlign: "right"
  },
  profileValue: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 8,
    marginLeft:3,
  },
  rect3: {
    width: 3,
    height: 542,
    backgroundColor: "rgba(206,206,206,1)",
    marginTop: 30
  },
  rect6: {
    width: 3,
    height: 542,
    backgroundColor: "rgba(206,206,206,1)"
  },
  rect4: {
    width: 3,
    height: 20,
    backgroundColor: "rgba(206,206,206,1)",
    transform: [
      {
        rotate: "-90.00deg"
      }
    ],
    marginLeft: 7,
    marginTop: 70
  },
  pravinPawar: {
    fontFamily: "roboto-700",
    color: "rgba(74,74,74,1)",
    fontSize: 14,
    opacity: 0.76,
    width: 500,
    elevation: 30,
    marginTop: 20,
    marginLeft: "5%",
    fontWeight: 'bold'
  },
  pointValue: {
    top: 5,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 14,
    opacity: 0.67,
    width: 500,
    elevation: 30,
    marginLeft: "35%",
  },
  pointValue3: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 9,
    opacity: 0.67,
    elevation: 30,
  },
  pointValueStack: {
    width: 46,
    height: 11
  },
  pointValue1: {
    top: 7,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(13,185,146,1)",
    fontSize: 16,
    elevation: 30,
    fontWeight: 'bold'
  },
  text2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(13,185,146,1)",
    fontSize: 9,
    elevation: 30,
  },
  pointValue1Stack: {
    width: 100,
    height: 11,
    marginLeft: "20%"
  },
  pointValueStackRow: {
    height: 11,
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 1,
    marginRight: 16
  },
  pravinPawarColumn: {
    width: 80,
    marginLeft: 29,
    marginTop: 139,
    marginBottom: 497
  },
  rect5: {
    width: "95%",
    height: 85,
    backgroundColor: "rgba(206,206,206,1)",
    shadowColor: "rgba(0,0,0,1)",
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    left: 20,
    top: -60
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 42,
    height: 43,
    position: "absolute",
  },
  ellipse1: {
    top: 0,
    left: 0,
    width: 42,
    height: 43,
    position: "absolute",
  },
  image3: {
    top: 7,
    left: 8,
    width: 25,
    height: 25,
    position: "absolute",
    transform: [{ rotate: '180deg'}]
  },
  image2: {
    top: 10,
    left: 5,
    width: 25,
    height: 25,
    position: "absolute",
    elevation: 31,
  },
  ellipseStack: {
    width: 55,
    height: 23,
    marginTop: 50,
    elevation: 30,
    marginLeft: "45%",
    display: 'none',
  },
  ellipseStack1: {
    width: 55,
    height: 23,
    marginTop: 10,
    elevation: 30,
    marginLeft: "45%"
  },
  id76543219: {
    fontFamily: "roboto-700",
    color: "rgba(74,74,74,1)",
    fontSize: 14,
    elevation: 30,
    fontWeight: "bold"
  },
  pointValue2: {
    fontFamily: "roboto-regular",
    color: "rgba(224,137,20,1)",
    fontSize: 16,
    marginTop: 10,
    elevation: 30,
    fontWeight: "bold"
  },
  id76543219Column: {
    width: "100%",
    marginLeft: "60%",
    marginTop: -33
  },
  image: {
    width: 26,
    height: 21,
    marginLeft: "90%",
    marginTop: -35,
    elevation: 30,
  },
  rect3Row: {
    flexDirection: "row",
    marginTop: -2,
    marginLeft: 23,
    marginRight: 25
  }
});



const mapStateToProps = state => ({
  isLoading: state
})

export default connect(mapStateToProps, null)(NetworkScreen)
