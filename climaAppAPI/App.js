import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

function Datos(setDatos) {
  axios
    .get('https://www.el-tiempo.net/api/json/v2/provincias/41/municipios/41091')
    .then(response => {
      setDatos(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export default function App() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    Datos(setDatos);
  }, []);

  return (
    <View style={styles.container}>
      {datos && <Text>{datos.municipio.NOMBRE}</Text>}
      {datos && <Text>{datos.temperatura_actual}ºC</Text>}
      {datos && <Text>{datos.stateSky.description}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24aecf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
