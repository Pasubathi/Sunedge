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
import WooComFetch from '../common/WooComFetch'
import { connect } from 'react-redux'
import Loader from 'react-native-easy-content-loader'
import themeStyle from './Theme.style'
const WIDTH = Dimensions.get('window').width

class CategoryListView extends Component {
  mounted = false
  constructor (props) {
    super(props)
    this.state = {
      objectArray: [],
      isLoading: true,
      SpinnerTemp: false,
      recent: false,
      loading: false,
      timeValue: 400,
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
       <View style={styles.container}>
        <View style={styles.scrollArea}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
                <View style={styles.rectRow}>
                    <TouchableOpacity onPress={()=>this.navPageFun('NETWORK')} >
                      <View style={styles.rect}>
                         <Text style={styles.myNetwork}>My Network</Text>
                        <Image
                          source={require("../../assets/images/user-networ.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={()=>this.navPageFun('VOUCHERS')}>
                      <View style={styles.rect}>
                        <Text style={styles.myNetwork}>My Vouchers</Text>
                        <Image
                          source={require("../../assets/images/tag.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navPageFun('BONUS')} >
                      <View style={styles.rect}>
                        <Text style={styles.myNetwork}>My Bonus</Text>
                        <Image
                          source={require("../../assets/images/bonus.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navPageFun('MYORDERS')}>
                      <View style={styles.rect}>
                        <Text style={styles.myNetwork}>My Orders</Text>
                        <Image
                          source={require("../../assets/images/orders.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navPageFun('PAYMENT')}>
                       <View style={styles.rect}>
                        <Text style={styles.myNetwork}>Make Payment</Text>
                        <Image
                          source={require("../../assets/images/orders.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navPageFun('TRAINING')} >
                       <View style={styles.rect}>
                        <Text style={styles.myNetwork}>My Training</Text>
                        <Image
                          source={require("../../assets/images/reading.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                </View>
          </ScrollView>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 167,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollArea_contentContainerStyle: {
    height: 167,
  },
  rect: {
   width: 119,
    height: 130,
    backgroundColor: "#ffff",
    borderColor: "#000000",
    elevation: 4,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  myNetwork: {
    color: themeStyle.textColor,
    marginTop: 89,
    fontSize: themeStyle.mediumSize,
  },
  image: {
    width: 43,
    height: 43,
    marginTop: -87,
  },
  rectRow: {
    height: 130,
    flexDirection: "row",
    flex: 1,
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
    wishListProducts: getWishListProductsFun(state)
  }
}

export default connect(mapStateToProps, null)(CategoryListView)
