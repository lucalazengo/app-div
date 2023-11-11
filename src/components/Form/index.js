import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';

export default function Form() {
  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para lidar com o login
    // Por exemplo:navegação para outra tela, etc.
    console.log('Botão Entrar pressionado!');
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
        />
        
        <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.textbuttonEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
