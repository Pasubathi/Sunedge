import React, { Component } from 'react'
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import { createSelector } from 'reselect'
import { Icon } from 'native-base'
import CardTem from './CardTemplate'
import WooComFetch, { getUrl, postHttp } from '../common/WooComFetch'
import { connect } from 'react-redux'
import Loader from 'react-native-easy-content-loader'
import themeStyle from './Theme.style'
const WIDTH = Dimensions.get('window').width

class ShopPvList extends Component {
  mounted = false
  constructor (props) {
    super(props)
    this.state = {
      objectArray: [],
      isLoading: true,
      SpinnerTemp: false,
      recent: false,
      activeBtn: 1,
      loading: false,
      timeValue: 400,
      catArray: [],
    }
  }

  /// //////
  static getDerivedStateFromProps (props) {
    if (props.dataName === 'RecentlyViewed') {
      return {
        isLoading: false,
        SpinnerTemp: false,
        recent: true,
        objectArray: props.recentViewedProducts
      }
    }
    if (
      props.dataName === 'Newest' ||
      props.dataName === 'Flash' ||
      props.dataName === 'Deals' ||
      props.dataName === 'Featured' ||
      props.dataName === 'Vendors'
    ) {
      if (
        props.tabArray !== undefined &&
        props.tabArray !== null &&
        props.tabArray.toString() !== 'NaN'
      ) {
        return {
          objectArray: props.tabArray
        }
      } else {
        return {
          objectArray: []
        }
      }
    }
    return null
  }

  /// //////////////////////////////////
  componentWillUnmount () {
    this.mounted = false
    this.state.objectArray = []
  }

  /// //////////////////////////////
  componentDidMount () {
    this.state.catArray = this.props.stateData.cartItems.allCategories
    this.setState({})
    
    this.mounted = true
    if (this.props.dataName === 'Flash' && this.props.tabArray !== undefined) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (this.props.dataName === 'Newest' && this.props.tabArray !== undefined) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (this.props.dataName === 'Deals' && this.props.tabArray !== undefined) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (
      this.props.dataName === 'Featured' &&
      this.props.tabArray !== undefined
    ) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (
      this.props.dataName === 'Vendors' &&
      this.props.tabArray !== undefined
    ) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }

    if (this.props.dataName === 'Releated') {
      this.setState({
        SpinnerTemp: true
      })
      this.getReleated()
    }
    if (this.props.dataName === 'RecentlyViewed') {
      this.setState({
        SpinnerTemp: true
      })
      this.getRecentlyViewed()
    }
  }

  getRecentlyViewed = () => {
    const json = this.props.recentViewedProducts
    this.getRecentData(json, true, true)
  }

  getReleated = async () => {
    try {
      const json2 = await WooComFetch.getReleatedProducts(
        this.props.relatedIdsArray,
        this.props.productsArguments
      )
      if (json2 !== undefined && json2 !== null && json2.toString() !== 'NaN') {
        this.newMethod2(json2, true, false)
      } else {
        this.newMethod2([], true, false)
      }
    } catch (err) {
    }
  }

  getData = (j, temp, re) => {
    this.state.objectArray = []
    this.state.objectArray = j
    if (this.mounted) {
      this.setState({
        isLoading: false,
        SpinnerTemp: false,
        recent: re,
        loading: false,
        timeValue: 400
      })
    }
  }

  getRecentData = (j, temp, re) => {
    if (this.mounted) {
      this.setState({
        isLoading: false,
        SpinnerTemp: false,
        recent: re,
        objectArray: j
      })
    }
  }

  newMethod2 (j, temp, recent) {
    this.getData(j, temp, recent)
  }

  navPageFun = item => {
    const string = item
    const newString = string.replace(/\s+/g, '') // "thiscontainsspaces"
    this.props.navigation.navigate(newString)
  }

  navPv = (btn) =>{
    this.setState({activeBtn: btn})
  }


  render () {
    let { loading, timeValue } = this.state
    if (this.state.objectArray.length > 0 && loading === false) {
      loading = false
      timeValue = 400
    } else {
      loading = true
      timeValue = 400
    }

    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity style={{
                          width: 75,
                          height: 31,
                          backgroundColor: this.state.activeBtn ==1 ?"rgba(74,144,226,1)":"rgba(114,130,145,1)",
                          borderWidth: 1,
                          borderColor: this.state.activeBtn ==1 ?"rgba(74,144,226,1)":"rgba(114,130,145,1)",
                          borderRadius: 16,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => this.navPv(1)}
                        >
          <Text style={{
                fontFamily: "roboto-regular",
                color: this.state.activeBtn ==1 ?"rgba(255,255,255,1)":"rgba(69,52,82,1)",
                fontSize: 16,
                fontWeight: "bold"
              }}>0-25</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
                            width: 75,
                            height: 31,
                            backgroundColor: this.state.activeBtn ==2 ?"rgba(74,144,226,1)":"rgba(114,130,145,1)",
                            borderRadius: 16,
                            marginLeft: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => this.navPv(2)}
                          >
          <Text style={{
                fontFamily: "roboto-regular",
                color: this.state.activeBtn ==2 ?"rgba(255,255,255,1)":"rgba(69,52,82,1)",
                fontSize: 16,
                fontWeight: "bold"
              }}>25-50</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
                            width: 75,
                            height: 31,
                            backgroundColor: this.state.activeBtn ==3 ?"rgba(74,144,226,1)":"rgba(114,130,145,1)",
                            borderRadius: 16,
                            marginLeft: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => this.navPv(3)}
                          >
          <Text style={{
                fontFamily: "roboto-regular",
                color: this.state.activeBtn ==3 ?"rgba(255,255,255,1)":"rgba(69,52,82,1)",
                fontSize: 16,
                fontWeight: "bold"
              }}>50-100</Text>
        </TouchableOpacity>
          <TouchableOpacity style={{
                            width: 75,
                            height: 31,
                            backgroundColor: this.state.activeBtn ==4 ?"rgba(74,144,226,1)":"rgba(114,130,145,1)",
                            borderRadius: 16,
                            marginLeft: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => this.navPv(4)}
                          >
                    <Text style={{
                        fontFamily: "roboto-regular",
                        color: this.state.activeBtn ==4 ?"rgba(255,255,255,1)":"rgba(69,52,82,1)",
                        fontSize: 16,
                        fontWeight: "bold"
                      }}>100+</Text>
        </TouchableOpacity>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    height: 31,
    flexDirection: "row",
    flex: 1,
    marginRight: 8,
    marginLeft: 32,
    marginTop: 16
  },
  buttonDeActive: {
    fontFamily: "roboto-regular",
    color: "rgba(69,52,82,1)",
    fontSize: 16,
    fontWeight: "bold"
  },
});

const getLanguage = (state) => state.Config.languageJson2['Shop More']
const getCartButton = (state) => state.Config.cartButton
const getRecent = (state) => JSON.parse(JSON.stringify(state.cartItems.recentViewedProducts))
const getCardStyle = (state) => state.Config.card_style
const getProductsArguments = (state) => state.Config.productsArguments
const getWishListProducts = (state) => JSON.parse(JSON.stringify(state.cartItems.wishListProducts))
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const getCartButtonProducts = createSelector(
  [getCartButton],
  (getCartButton) => {
    return getCartButton
  }
)
const getWishListProductsFun = createSelector(
  [getWishListProducts],
  (getWishListProducts) => {
    return getWishListProducts
  }
)
const getRecentProducts = createSelector(
  [getRecent],
  (getRecent) => {
    return getRecent
  }
)
const getProductsArgumentsFun = createSelector(
  [getProductsArguments],
  (getProductsArguments) => {
    return getProductsArguments
  }
)
const getCardStyleFun = createSelector(
  [getCardStyle],
  (getCardStyle) => {
    return getCardStyle
  }
)

const mapStateToProps = state => {
  return {
    recentViewedProducts: getRecentProducts(state),
    productsArguments: getProductsArgumentsFun(state),
    card_style: getCardStyleFun(state),
    cartButton: getCartButtonProducts(state),
    language: getLanguageFun(state),
    wishListProducts: getWishListProductsFun(state),
    stateData: state

  }
}

export default connect(mapStateToProps, null)(ShopPvList)
