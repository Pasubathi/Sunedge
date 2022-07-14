import React, { PureComponent } from 'react'
import Home1Screen from './Home1Screen'
import Home2Screen from './Home2Screen'
import Home3Screen from './Home3Screen'
import Home4Screen from './Home4Screen'
import Home5Screen from './Home5Screen'
import Home6Screen from './Home6Screen'
import Home7Screen from './Home7Screen'
import Home8Screen from './Home8Screen'
import Home9Screen from './Home9Screen'
import Home10Screen from './Home10Screen'
import { connect } from 'react-redux'
import theme from '../common/Theme.style'
import { CardStyleInterpolators } from 'react-navigation-stack'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
import { Platform } from 'react-native'
class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <MenuIcon navigation={navigation} />,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: theme.homeTitle,
    headerRight: () => <ShoppingCartIcon navigation={navigation} />,
    headerTitleAlign: 'center',
    headerTintColor: theme.headerTintColor,
    headerStyle: {
      backgroundColor: theme.primary
    },
	
    headerTitleStyle: {
      fontWeight: Platform.OS === 'android' ? 'bold' : 'normal'
    },
    headerForceInset: { top: 'never', vertical: 'never' },
    gestureEnabled: true
  })

  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.mystore.Config.languageJson2.Home
    })
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log("murugan Home :"+this.props.mystore.Config.homePage);
    return (
      <Home3Screen navigation={this.props.navigation} />
    )
  }
}
const mapStateToProps = state => ({
  mystore: state
})
export default connect(mapStateToProps, null)(Home)
