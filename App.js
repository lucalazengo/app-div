import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Login from './src/pages/Login'
import MapScreen from './src/pages/mapscreen'
import Home from './src/pages/home'
import TravelReportForm from './src/components/TravelReportForm'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="TravelReportForm" component={TravelReportForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
