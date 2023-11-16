import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import axios from 'axios'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Form() {
  const navigation = useNavigation()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [isMotorista, setIsMotorista] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://20b8-189-84-116-107.ngrok-free.app/api/motoristas/login',
        {
          usuario,
          senha,
        },
      )

      console.log(response.data)
      const { token, motorista } = response.data
      await AsyncStorage.setItem('token', token)

      const userData = JSON.stringify(motorista)
      await AsyncStorage.setItem('userData', userData)

      setSuccessMessage('Login realizado com sucesso!')
      setErrorMessage('')
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
      setSuccessMessage('')
    }
  }

  const handleMotorista = () => {
    setIsMotorista(true)
  }

  const handlePassageiro = () => {
    setIsMotorista(false)
  }

  return (
    <View>
      <Animatable.View
        animation="fadeInDown"
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}
      >
        <Icon name="bus-outline" size={100} color="#510E16" />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#510E16',
            paddingLeft: 10,
          }}
        >
          Bem-vindo ao Divtrans
        </Text>
      </Animatable.View>
      <View style={styles.formContext}>
        <View style={styles.form}>
          {!isMotorista ? (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={handleMotorista}
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#510E16',
                  padding: 15,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="car-outline" size={60} color="#510E16" />
                <Text style={styles.buttonText}>Sou Motorista</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePassageiro}
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#000',
                  padding: 15,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="person-outline" size={60} color="#000" />
                <Text style={styles.buttonText}>Sou Passageiro</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Animatable.View animation="fadeInUp" style={styles.form}>
              <Text style={styles.formLabel}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira seu login Sigaa"
                keyboardType="default"
                onChangeText={(text) => setUsuario(text)}
              />

              <Text style={styles.formLabel}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira sua senha siga"
                keyboardType="default"
                secureTextEntry
                onChangeText={(text) => setSenha(text)}
              />

              <TouchableOpacity
                onPress={handleLogin}
                style={styles.buttonEntrar}
              >
                <Button
                  title="Entrar"
                  titleStyle={{ color: '#510E16', fontSize: 20 }}
                  buttonStyle={{ backgroundColor: '#fff', borderRadius: 8 }}
                />
              </TouchableOpacity>
            </Animatable.View>
          )}

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {successMessage !== '' && (
            <Text style={styles.successText}>{successMessage}</Text>
          )}
        </View>
      </View>
    </View>
  )
}
