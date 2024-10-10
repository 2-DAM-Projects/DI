//Importaciones de la aplicación para que funcionen todos los componentes.
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles/AppStyles';

export default function App() {
  const [lista, setLista] = useState([]); 
  
  

  return (
    <View style={styles.content}>
      <Text style={styles.titulo}>Lista de Productos</Text>

      <StatusBar style="auto" />
    </View>
  );
}
