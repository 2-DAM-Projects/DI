import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../navigation/BottomNavigation';

export default function StadisticsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('stadistics');

  const activities = [
    {
      id: 1,
      title: 'Swimming',
      image: require('../../assets/images/swimming.png'),
      kcal: '430Kcal/hr',
      url: 'https://es.wikipedia.org/wiki/Nataci%C3%B3n' // Reemplaza con tu URL deseada
    },
    {
      id: 2,
      title: 'Playing Tennis',
      image: require('../../assets/images/tennis.png'),
      kcal: '430Kcal/hr',
      url: 'https://es.wikipedia.org/wiki/Tenis' // Reemplaza con tu URL deseada
    }
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'user':
        navigation.navigate('User');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'stadistics':
        navigation.navigate('Stadistics');
        break;
      case 'calendar':
        navigation.navigate('Calendar');
        break;
    }
  };

  const handleImagePress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error("An error occurred while opening the URL:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Find your{'\n'}<Text style={styles.titleBold}>activity</Text></Text>

      {/* Activity Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity>
        <Text style={[styles.filterText, styles.activeFilter]}>Popular</Text>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style={styles.filterText}>Moderate</Text>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style={styles.filterText}>Intensive</Text>
        </TouchableOpacity>
      </View>

      {/* Activity List */}
      <ScrollView 
        contentContainerStyle={styles.activityList}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <TouchableOpacity 
              onPress={() => handleImagePress(activity.url)}
              activeOpacity={0.8}
            >
              <Image 
                source={activity.image} 
                style={styles.activityImage} 
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityKcal}>
                <Ionicons name="flame" size={16} color="#FFA500" /> {activity.kcal}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuButton: {
    padding: 4,
  },
  title: {
    fontSize: 32,
    paddingHorizontal: 20,
    marginBottom: 24,
    lineHeight: 40,
  },
  titleBold: {
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 24,
  },
  filterText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  activeFilter: {
    color: '#000',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  activityList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  activityCard: {
    backgroundColor: '#FFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E0E0E0',
  },
  activityInfo: {
    padding: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  activityKcal: {
    fontSize: 14,
    color: '#666',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
  },
});