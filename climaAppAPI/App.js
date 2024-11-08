import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const provincias = {
  Almería: { codigo: '04', municipio: '04013' },
  Cádiz: { codigo: '11', municipio: '11012' },
  Córdoba: { codigo: '14', municipio: '14021' },
  Granada: { codigo: '18', municipio: '18087' },
  Huelva: { codigo: '21', municipio: '21041' },
  Jaén: { codigo: '23', municipio: '23050' },
  Málaga: { codigo: '29', municipio: '29067' },
  Sevilla: { codigo: '41', municipio: '41091' },
};

const iconos = {
  "Cielo despejado": require('./assets/icons/despejado.png'),
  "Poco nuboso": require('./assets/icons/poco_nuboso.png'),
  "Cubierto": require('./assets/icons/nuboso.png'),
  "Muy nuboso": require('./assets/icons/muy_nuboso.png'),
  "Nubes altas": require('./assets/icons/nubes_altas.png'),
  "Cubierto con lluvia": require('./assets/icons/lluvia.png'),
  "Cubierto con lluvia escasa": require('./assets/icons/lluvia.png'),
  "Nuboso con lluvia escasa": require('./assets/icons/lluvia.png'),
  "Nuboso con lluvia": require('./assets/icons/lluvia.png'),
  "Muy nuboso con tormenta": require('./assets/icons/tormenta.png'),
  "Intervalos nubosos con tormenta y lluvia escasa": require('./assets/icons/tormenta.png'),
  "Cubierto con tormenta": require('./assets/icons/tormenta.png'),
};

export default function App() {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [provincia, setProvincia] = useState('');

  const fetchDatos = async () => {
    if (!provincias[provincia]) {
      Alert.alert('Error', 'Provincia no válida. Ingresa una provincia de Andalucía.');
      return;
    }

    const { codigo, municipio } = provincias[provincia];
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.el-tiempo.net/api/json/v2/provincias/${codigo}/municipios/${municipio}`
      );
      setDatos(response.data);
    } catch (err) {
      if (!err.response) {
        setError('Problema de conexión. Verifica tu conexión a internet.');
      } else if (err.response.status === 404) {
        setError('No se encontró la ciudad en la API.');
      } else {
        setError('Error al cargar los datos.');
      }
    } finally {
      setLoading(false);
    }
  };

  const icono = datos ? iconos[datos.stateSky.description] : null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Ingresa la provincia"
        onChangeText={(text) => setProvincia(text)}
        value={provincia}
        placeholderTextColor="#a9b1c7"
      />
      <TouchableOpacity style={styles.button} onPress={fetchDatos}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={fetchDatos}>
        <Text style={styles.buttonText}>Actualizar Clima</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {datos && (
        <View style={styles.card}>
          <Text style={styles.city}>{datos.municipio.NOMBRE}</Text>
          <Text style={styles.temperature}>{datos.temperatura_actual}ºC</Text>
          <Text style={styles.description}>{datos.stateSky.description}</Text>
          {icono && <Image source={icono} style={styles.icon} />}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#0d9be7', // Fondo principal en azul
    alignItems: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#0b8bc7', // Azul ligeramente más oscuro para diferenciarlo del fondo
  },
  button: {
    backgroundColor: '#ffffff', // Botón en blanco para contrastar
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: '#b3e0f7', // Azul claro para el botón de actualización
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#0d9be7', // Texto en azul para un contraste llamativo
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  error: {
    fontSize: 16,
    color: '#ff4c4c', // Rojo para el mensaje de error
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff', // Tarjeta en blanco para resaltar la información
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000', // Sombra para dar profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para sombra en Android
  },
  city: {
    fontSize: 24,
    color: '#0d9be7', // Azul de fondo para uniformidad en los títulos
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    color: '#0b8bc7', // Azul ligeramente más oscuro para resaltar la temperatura
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: '#0d9be7', // Color principal para la descripción
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
});