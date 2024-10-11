import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  entrada: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  recuadro: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    flex: 1,
    height: 'fit-content',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
    position: 'relative',
  },

  textoContenedor: {
    flex: 1,
    justifyContent: 'flex-start', // Asegura que el texto se alinee al inicio
  },

  item: {
    fontSize: 20,
    lineHeight: 24, // Ajusta el espaciado para mejor legibilidad
    marginRight: 50, // Asegúrate de que haya espacio para el botón
  },

  logo: {
    width: 60,
    height: 60,
  },

  mas: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
  },

  eliminarBoton: {
    position: 'absolute',
    top: 10, // Distancia desde la parte superior
    right: 10, // Distancia desde la derecha
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },

  eliminarlogo: {
    width: 32,
    height: 32,
  },

  tachado: {
    textDecorationLine: 'line-through', // Esto aplica el tachado
  },
});

export default styles;