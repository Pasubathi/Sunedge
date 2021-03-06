import React, { PureComponent } from 'react'
import { View, Text, Platform } from 'react-native'
import { Icon } from 'native-base'
import { UIActivityIndicator } from 'react-native-indicators'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { connect } from 'react-redux'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import CategoryFlatList from '../common/CategoriesFlatList'
import themeStyle from '../common/Theme.style'
import BottomNav from '../common/BottomNav'
import SyncStorage from 'sync-storage'
class Brand extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: "Brands",
      headerTintColor: themeStyle.headerTintColor,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      headerStyle: {
        backgroundColor: themeStyle.primary
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleAlign: 'center'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      activityIndicatorTemp: true
    }
  }

  componentDidMount () {
    this.setState({ activityIndicatorTemp: false })
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson2.Categories
    })
  //  console.log('Category List',this.props.cartItems2.cartItems.allCategories)
  }

  render () {
    return this.state.activityIndicatorTemp ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }}>
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View style={{
        flex: 1,
        paddingBottom: SyncStorage.get('bottom') ? 50 : 0,
        backgroundColor: themeStyle.backgroundColor

      }}>
        {SyncStorage.get('bottom') ? (
          <BottomNav
            active={2}
            home={
              this.props.cartItems2.Config.homePage === 1
                ? 'Home1Screen'
                : this.props.cartItems2.Config.homePage === 2
                  ? 'Home2Screen'
                  : this.props.cartItems2.Config.homePage === 3
                    ? 'Home3Screen'
                    : this.props.cartItems2.Config.homePage === 4
                      ? 'Home4Screen'
                      : this.props.cartItems2.Config.homePage === 5
                        ? 'Home5Screen'
                        : this.props.cartItems2.Config.homePage === 6
                          ? 'Home6Screen'
                          : this.props.cartItems2.Config.homePage === 7
                            ? 'Home7Screen'
                            : this.props.cartItems2.Config.homePage === 8
                              ? 'Home8Screen'
                              : this.props.cartItems2.Config.homePage === 9
                                ? 'Home9Screen'
                                : 'Home10Screen'
            }></BottomNav>
        ) : null}
        {this.props.cartItems2.cartItems.categories.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center'
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
                alignSelf: 'center'
              }}>
              <Icon
                name={'logo-dropbox'}
                style={{ color: 'gray', fontSize: 80 }}
              />

              <Text style={{ fontSize: themeStyle.largeSize + 2, color: themeStyle.textColor }}>
                {this.props.cartItems2.Config.languageJson2['No Products Found']}
              </Text>
            </View>
          </View>
        ) : (
          <CategoryFlatList
            dataSource={this.props.cartItems2.cartItems.categories}
            products={this.props.cartItems2.Config.languageJson2.Products}
            allCategories={this.props.cartItems2.cartItems.allCategories}
            props={this.props}
            noOfCol={1}
            categoryPage={3}
            separator={true}
          />
        )}
      </View>
    )
  }
}
/// ///////////////////////////////////////////////
const mapStateToProps = state => ({
  cartItems2: state
})
/// //////////////////////////////////////////
export default connect(mapStateToProps, null)(Brand)
