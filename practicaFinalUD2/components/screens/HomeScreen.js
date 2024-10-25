import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PoppinsText from '../font/PoppinsText';

export default function HomeScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const carouselItems = [
    {
      image: require('../../assets/images/principal.png'),
      title: 'Track your Active Lifestyle',
      subtitle: 'Find your way to the perfect body',
    },
    {
      image: require('../../assets/images/principal.png'),
      title: 'Stay Consistent',
      subtitle: 'Achieve your fitness goals step by step',
    },
    {
      image: require('../../assets/images/principal.png'),
      title: 'Push Your Limits',
      subtitle: 'Challenge yourself every day',
    }
  ];

  const renderItem = (props) => {
    const { item } = props;  // Destructuring seguro
    if (!item) return null;  // Protección extra

    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <PoppinsText style={styles.txt1}>{item.title}</PoppinsText>
        <PoppinsText style={styles.txt2}>{item.subtitle}</PoppinsText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={400}
        onSnapToItem={(index) => setActiveSlide(index)}
        useScrollView={true}
        layout={'default'}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Stadistics')}
      >
        <PoppinsText style={styles.buttonText}>Get Started</PoppinsText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  txt1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  txt2: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Bold',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6600',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
});