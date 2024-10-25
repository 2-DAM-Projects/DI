import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PoppinsText = (props = {}) => {
  // Nos aseguramos que props nunca sea undefined
  const { style, children } = props;
  
  // Creamos un array de estilos seguro
  const finalStyle = StyleSheet.flatten([
    styles.text,
    style || {} // Si style es undefined, usamos un objeto vacío
  ]);

  return (
    <Text style={finalStyle}>
      {children || ''}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
  },
});

export default PoppinsText;