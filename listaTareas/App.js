//Importaciones de la aplicación para que funcionen todos los componentes.
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles/AppStyles';

export default function App() {
  //Estas cuatro declaraciones de useState son para poder hacer las funcionalidades especificas del programa
  const [texto, setTexto] = useState(''); // Estado para recoger e texto escrito 
  const [lista, setLista] = useState([]); // Estado para guardar las listas de texto
  const [colores, setColores] = useState({}); // Estado para el cambio de color
  const [completadas, setCompletadas] = useState({}); // Estado para tareas completadas

  //Primera funcion AgregaTarea para poder guarda una tarea en la lista y que no sea vacía
  const AgregaTarea = () => {
    if (texto.trim()) {
      setLista([...lista, { key: Date.now().toString(), value: texto }]);
      setTexto('');
    }
  };

  //Segunda funcion EliminaTarea para poder eliminar una tarea de la lista
  const EliminaTarea = (key) => {
    setLista(lista.filter(item => item.key !== key));
    // Eliminar color y estado de completado asociados para que cuando se elimine la tarea estos dos también
    const newColores = { ...colores };
    const newCompletadas = { ...completadas };
    delete newColores[key];
    delete newCompletadas[key];
    setColores(newColores);
    setCompletadas(newCompletadas);
  };

  //Tercera funcion CambiaColor para poder cambiar el color de la tarea
  const CambiaColor = (key) => {
    setColores(prevColores => ({
      ...prevColores,
      //Operación ternaria para el cambio de color
      [key]: prevColores[key] === 'rgb(232,223,70)' ? 'white' : 'rgb(232,223,70)',
    }));
    // Cambiar estado de completado
    setCompletadas(prevCompletadas => ({
      ...prevCompletadas,
      [key]: !prevCompletadas[key], // Alterna entre verdadero y falso
    }));
  };

  //Aqui renderizo el item completo que es la tarea en si en el que se encuentra el botón de eliminar y el texto de la tarea.
  const renderItem = ({ item }) => (
    //Primer componente TouchableOpacity para que cuando se seleccione el recuadro de la tarea cambie de color y se tache
    <TouchableOpacity onPress={() => CambiaColor(item.key)} style={[styles.recuadro, { backgroundColor: colores[item.key] || 'white' }]}>
      {/* Meto el texto en un componente View para poder darle estilo y no se solape el botón de eliminar y el texto */}
      <View style={styles.textoContenedor}>
        <Text style={[styles.item, completadas[item.key] && styles.tachado]}>{item.value}</Text>
      </View>

      {/* Boton de eliminar */}
      <TouchableOpacity onPress={() => EliminaTarea(item.key)} style={styles.eliminarBoton}>
        <Image source={require('./assets/images/menos.png')} style={styles.eliminarlogo} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.content}>
      <Text style={styles.titulo}>Lista de Tareas</Text>

      {/* Componente TextInput para que el usuario pueda escribir una nueva tarea */}
      <TextInput
        style={styles.entrada}
        placeholder="Escribe una tarea"
        value={texto}
        onChangeText={setTexto}
      />

      {/* Componente FlatList para que renderiza la lista de tareas */}
      <FlatList
        data={lista}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      {/* Boton para agregar tareas una vez escritas */}
      <TouchableOpacity onPress={AgregaTarea} style={styles.mas}>
        <Image source={require('./assets/images/mas.png')} style={styles.logo} />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
