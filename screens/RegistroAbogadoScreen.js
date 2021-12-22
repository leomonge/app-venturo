import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'

export default ({ navigation }) => {
  return(
    <View style={styles.container}>
      <Text
      onPress={() => navigation.navigate('Consulta')}
      >
        Esto es Registro Abogado
      </Text>
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