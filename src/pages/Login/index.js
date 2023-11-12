import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Form from '../../components/Form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
  const [userData, setUserData] = useState(null)
  const navigation = useNavigation()

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData')
      if (value !== null) {
        setUserData(JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (userData) {
      navigation.navigate('Home')
    }
  }, [userData, navigation])

  return (
    <View>
      <Form />
    </View>
  )
}
