import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import BirthdayScreen from '../../screens/BirthdayScreen'
import MenuIcon from '../../common/MenuIcon'
import NewestScreen from '../../navigation/Stacks/Newest'
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator({
  BirthdayScreen: {
    screen: BirthdayScreen,
    navigationOptions: ({ navigation }) => ({
      gestureEnabled: true,
      headerLeft: () => <MenuIcon navigation={navigation} />
    })
  },
  NewestScreen: {
    screen: NewestScreen,
    navigationOptions: () => ({
      gestureEnabled: false
    })
  }
})
HomeStackNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}
export default HomeStackNavigator
