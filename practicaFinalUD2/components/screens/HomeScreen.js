import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  const staticItem = {
    image: require('../../assets/images/principal.png'),
    title: 'Track your Active Lifestyle',
    subtitle: 'Find your way to the perfect body',
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselItem}>
        <Image source={staticItem.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.txt1}>{staticItem.title}</Text>
        <Text style={styles.txt2}>{staticItem.subtitle}</Text>
      </View>

      {/* Puntos naranjas estáticos */}
      <View style={styles.paginationDots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Stadistics')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 180,
  },
  image: {
    width: 1300,
    height: 500,
    marginBottom: 30,
  },
  txt1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  txt2: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc', // Color gris para los puntos inactivos
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6600', // Color naranja para el punto activo
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
