import { Button, View } from 'react-native'
import React from 'react'

import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';
import UserSettingsStyles from '../styles/UserSettingsStyles';
const ProfileScreen = () => {
    
  return (
    <View style={UserSettingsStyles.ProfileScreenContainer}>
      <UserInfo/>
      <LogoutButton/>
      
    </View>
  )
}

export default ProfileScreen

