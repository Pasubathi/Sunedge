import React from 'react'
import { Icon } from 'native-base'
import { View, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import theme from '../common/Theme.style'
import SyncStorage from 'sync-storage'
const MenuIcon = props =>
  (
    <TouchableOpacity
      onPress={() => {
        props.navigation.openDrawer()
      }}>
      <View
        style={{
          alignItems: 'center'
        }}>
        <View
          style={[
            { padding: 3 },
            Platform.OS === 'android' ? styles.iconContainer : null
          ]}>
            <View style={styles.row}>
                <Icon
                  style={{
                    paddingLeft: 6,
                    color: theme.headerIconsColor,
                    fontSize: 22
                  }}
                  name='md-menu'
                />
                <Image
                          source={require("../../assets/images/logo.png")}
                          resizeMode="contain"
                          style={styles.image}
                        ></Image>
            </View>
        </View>
      </View>
     
    </TouchableOpacity>
  )

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 6,
    marginRight: 5,
  },
  row:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: 28,
    height: 28,
    left:10,
  },
})
export default MenuIcon

