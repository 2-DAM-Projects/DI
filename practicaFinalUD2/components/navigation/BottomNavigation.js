import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function BottomNavigation({ activeTab = 'home', onTabPress }) {
  const tabs = [
    { id: 'home', icon: 'home-outline' },
    { id: 'user', icon: 'pulse-outline' },
    { id: 'calendar', icon: 'calendar-outline' },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.navItem}
          onPress={() => onTabPress && onTabPress(tab.id)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeTab === tab.id ? '#000' : '#666'}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        key={'stadistics'}
        style={styles.navItem}
        onPress={() => onTabPress && onTabPress('stadistics')}
      >
          <Entypo
              name = 'sound-mix'
              size={24}
              color={activeTab ==='stadistics'? '#000' : '#666'}
            />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 8,
  },
});