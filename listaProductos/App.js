import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles/AppStyles';

const Stack = createNativeStackNavigator();

// Pantalla de Detalles del Producto
const DetalleProducto = ({ route }) => {
  const { producto } = route.params; // Obtenemos el producto pasado como parámetro

  return (
    <View style={styles.content}>
      <Text style={styles.titulo}>{producto.title}</Text>
      <Image source={{ uri: producto.image }} style={styles.imagenProducto} />
      <Text style={styles.precio}>${producto.price.toFixed(2)}</Text>
      <Text>{producto.description}</Text>
    </View>
  );
};

// Pantalla Principal con la lista de productos
const ListaProductos = ({ navigation }) => {
  const [lista, setLista] = useState([]); 
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setLista(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const renderProducto = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('Detalles', { producto: item })} // Navegamos a la pantalla de detalles
    >
      <Image source={{ uri: item.image }} style={styles.imagenProducto} />
      <Text style={styles.textoItem}>{item.title}</Text>
      <Text style={styles.precio}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.content}>
      <Text style={styles.titulo}>Lista de Productos</Text>

      {loading ? (
        <Text>Cargando productos...</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProducto}
        />
      )}
    </View>
  );
};

// Componente principal de la aplicación
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Productos">
        <Stack.Screen name="Productos" component={ListaProductos} />
        <Stack.Screen name="Detalles" component={DetalleProducto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
