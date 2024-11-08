import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Image } from 'react-native';

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const shuffleCards = (initialCards) => {
    const deck = [...initialCards, ...initialCards];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck.map((card) => ({ ...card, isFlipped: false }));
  };

  const startGame = () => {
    const initialCards = [
      { id: 0, image: require('./assets/imagen1.jpg') },
      { id: 1, image: require('./assets/imagen2.png') },
      { id: 2, image: require('./assets/imagen3.jpeg') },
      { id: 3, image: require('./assets/imagen4.png') },
      { id: 4, image: require('./assets/imagen5.png') },
      { id: 5, image: require('./assets/imagen6.png') },
    ];
    setCards(shuffleCards(initialCards));
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setGameStarted(true);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      // Evitar bucles infinitos controlando las actualizaciones de estado
      if (cards[first].id === cards[second].id) {
        setMatchedPairs((prevMatchedPairs) => [...prevMatchedPairs, cards[first].id]);
      }

      setTimeout(() => setFlippedCards([]), 1000); // Vuelvo a ocultar las cartas después de 1 segundo
      setAttempts((prevAttempts) => prevAttempts + 1); // Incremento el conteo de intentos
    }
  }, [flippedCards]);

  // Mostrar alerta al completar el juego
  useEffect(() => {
    if (gameStarted && matchedPairs.length === 6) {
      Alert.alert('¡Felicitaciones!', `Has completado el juego en ${attempts} intentos`, [
        { text: 'Jugar de nuevo', onPress: startGame },
      ]);
    }
  }, [matchedPairs.length, gameStarted]);

  const handleCardPress = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index].id)) return;
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
  };

  const renderCard = (card, index) => {
    const isFlipped = flippedCards.includes(index);
    const isMatched = matchedPairs.includes(card.id);

    return (
      <TouchableOpacity
        key={index}
        style={[styles.card, isFlipped || isMatched ? styles.cardFlipped : styles.cardBack]}
        onPress={() => handleCardPress(index)}
        disabled={isFlipped || isMatched}
      >
        {isFlipped || isMatched ? (
          <Image source={card.image} style={[styles.cardImage, { width: '80%', height: '80%' }]} />
        ) : (
          <View style={styles.cardBack} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View style={styles.welcomeScreen}>
          <Text style={styles.title}>Juego de Memoria</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Comenzar Juego</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.attempts}>Intentos: {attempts}</Text>
            <TouchableOpacity style={styles.resetButton} onPress={startGame}>
              <Text style={styles.resetButtonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>{cards.map((card, index) => renderCard(card, index))}</View>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  attempts: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardBack: {
    backgroundColor: '#ddd',
    width: '100%',
    height: '100%'
  },
  cardFlipped: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  cardImage: {
    resizeMode: 'contain'
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});


export default App;
