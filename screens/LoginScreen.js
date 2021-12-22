import React from 'react' 
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native'
import useForm from '../hooks/useForm'

export default ({ navigation }) => {

  const initialState = {
    "identifier": "",
    "password": "",
  }

  const onSubmit = values => {
    fetch('http://192.168.1.39:1337/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(response => {
      if(!response.statusCode){
        return Alert.alert(
          'Éxito',
          'Bienvenido/a a la aplicación de la firma Venturo'
        )
      }
      Alert.alert(
        'Error',
          'Usuario o contraseña Incorrecta',
      )
    })
  }


  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)
  return(
    <View style={styles.container}>
      <Text
      onPress={() => navigation.navigate('Registro2')}
      >
        Inicia Sesión
      </Text>
      <TextInput 
        value={inputs.email}
        onChangeText={subscribe('identifier')}
        placeholder='Email'
      />
      <TextInput 
        value={inputs.email}
        onChangeText={subscribe('password')}
        placeholder='Contraseña'
        secureTextEntry={true}
      />
      <Button
        title='Iniciar Sesión'
        onPress={handleSubmit}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
})