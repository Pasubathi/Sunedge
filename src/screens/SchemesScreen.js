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
class SchemesScreen extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: "Schemes List",
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
      headerTitle: 'Vouchers'
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
      customers_telephone: ''
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

  /// //////
  render () {
    return (
      <ScrollView style={{ backgroundColor: themeStyle.backgroundColor }}>
       
                  <View>
                     
                  </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: "50%",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 16,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1
  },
 
});



const mapStateToProps = state => ({
  isLoading: state
})

export default connect(mapStateToProps, null)(SchemesScreen)
