import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function Form() {
  const navigation = useNavigation();


  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para lidar com o login
    // Por exemplo: validação de login e senha

    // Navegar para outra tela se o login for bem-sucedido
    navigation.navigate('TravelReportForm');
  };
  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu login Sigaa"
          keyboardType="default"
        />

        <Text style={styles.formLabel}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha siga"
          keyboardType="default"
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.textbuttonEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
