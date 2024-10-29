import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../navigation/BottomNavigation';

export default function UserScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('user');
  const months = ['April', 'May', 'June', 'July', 'August'];
  const weekDays = ['M', 'T', 'S', 'F', 'T', 'S', 'W'];

  // Función para obtener un usuario aleatorio
  const fetchRandomUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const user = data.results[0];
      setUserData({
        name: `${user.name.first} ${user.name.last}`,
        location: user.location.country,
        avatar: user.picture.large
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  // Generar datos aleatorios para el gráfico
  const generateRandomHeights = () => {
    return weekDays.map(() => ({
      height: Math.random() * 100 + 20,
      color: ['#4CAF50', '#F44336', '#2196F3'][Math.floor(Math.random() * 3)]
    }));
  };

  const barData = generateRandomHeights();

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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image 
          source={{ uri: userData?.avatar }} 
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userData?.name}</Text>
        <Text style={styles.userLocation}>{userData?.location}</Text>
      </View>

      {/* Months Slider */}
      <View style={styles.monthsContainer}>
        {months.map((month, index) => (
          <Text 
            key={month} 
            style={[
              styles.month, 
              index === 0 && styles.activeMonth
            ]}
          >
            {month}
          </Text>
        ))}
      </View>

      {/* Statistics Section */}
      <View style={styles.statisticsContainer}>
        <View style={styles.statisticsHeader}>
          <Text style={styles.statisticsTitle}>Stadistics</Text>
          <TouchableOpacity style={styles.weekButton}>
            <Text style={styles.weekButtonText}>Week</Text>
            <Ionicons name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          {barData.map((bar, index) => (
            <View key={index} style={styles.barColumn}>
              <View 
                style={[
                  styles.bar, 
                  { height: bar.height, backgroundColor: bar.color }
                ]} 
              />
              <Text style={styles.barLabel}>{weekDays[index]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Metrics Cards */}
      <View style={styles.metricsContainer}>
        <View style={[styles.metricCard, { backgroundColor: '#E8F5E9' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="fitness" size={20} color="white" />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricTitle}>Training</Text>
            <Text style={styles.metricValue}>4.5 hours</Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: '#FCE4EC' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#E91E63' }]}>
            <Ionicons name="walk" size={20} color="white" />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricTitle}>Steps</Text>
            <Text style={styles.metricValue}>24 km per week</Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: '#E3F2FD' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#2196F3' }]}>
            <Ionicons name="flame" size={20} color="white" />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricTitle}>Calories</Text>
            <Text style={styles.metricValue}>8215 calories burned</Text>
          </View>
        </View>
      </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
  },
  monthsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 24,
  },
  month: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  activeMonth: {
    color: '#000',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  statisticsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statisticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statisticsTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  weekButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  weekButtonText: {
    marginRight: 4,
    fontSize: 14,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    marginBottom: 24,
  },
  barColumn: {
    alignItems: 'center',
    width: 30,
  },
  bar: {
    width: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
  },
  metricsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  metricInfo: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    color: '#666',
  },
});