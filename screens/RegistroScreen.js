import React from 'react' 
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native'
import useForm from '../hooks/useForm'

export default ({ navigation }) => {

  const initialState = {
    "username": "",
    "nombres": "",
    "apellidos": "",
    "dni": "",
    //"fecha_de_nacimiento": "",
    "email": "",
    "celular": "",
    "departamento": "",
    "lugar_colegiatura": "",
    "numero_colegiatura": "",
    //"curriculum_vitae": "",
    "descripcion": "",
    "password": "",
  }

  const onSubmit = values => {
    fetch('http://192.168.1.39:1337/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if(!response.statusCode){
        return Alert.alert(
          'Éxito',
          'Gracias por registrarse en el aplicativo Firma Venturo, en unos momentos uno de nuestros asistentes se comunicará con usted'
        )
      }
      Alert.alert(
        'Error',
        'Error al registrarse'
      )
    })
  }
  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)
  return(
    <View style={styles.container}>
      <Text
      onPress={() => navigation.navigate('Registro2')}
      >
        Registrarme
      </Text>

      <TextInput 
        value={inputs.username}
        onChangeText={subscribe('username')}
        placeholder='Usuario'
      />

      <TextInput
        value={inputs.nombres}
        onChangeText={subscribe('nombres')}
        placeholder='Nombres'
      />

      <TextInput 
        value={inputs.apellidos}
        onChangeText={subscribe('apellidos')}
        placeholder='Apellidos'
      />

      <TextInput 
        value={inputs.dni}
        onChangeText={subscribe('dni')}
        placeholder='DNI'
      />

      <TextInput 
        value={inputs.email}
        onChangeText={subscribe('email')}
        placeholder='Email'
      />

      <TextInput 
        value={inputs.celular}
        onChangeText={subscribe('celular')}
        placeholder='Celular'
      />

      <TextInput 
        value={inputs.departamento}
        onChangeText={subscribe('departamento')}
        placeholder='Departamento'
      />

      <TextInput 
        value={inputs.lugar_colegiatura}
        onChangeText={subscribe('lugar_colegiatura')}
        placeholder='Lugar de Colegiatura'
      />

      <TextInput 
        value={inputs.numero_colegiatura}
        onChangeText={subscribe('numero_colegiatura')}
        placeholder='Número de colegiatura'
      />

      <TextInput 
        value={inputs.descripcion}
        onChangeText={subscribe('descripcion')}
        placeholder='Descripción'
      />

      <TextInput 
        value={inputs.password}
        onChangeText={subscribe('password')}
        placeholder='Contraseña'
        secureTextEntry={true}
      />

      <Button
        title='Registrarme'
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