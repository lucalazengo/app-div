import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Title from './src/components/Title'
import Login from './src/pages/Login';



export default function App () {
  return (
    <View style={styles.container}>
      <Title/>
     <Login/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
   
  },
});
