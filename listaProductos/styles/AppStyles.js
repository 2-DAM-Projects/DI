import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  imagenProducto: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  textoItem: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  precio: {
    fontSize: 18,
    color: '#888',
    marginTop: 5,
  },
  detalle: {
  padding: 20,
  alignItems: 'center',
},

});

export default styles;
