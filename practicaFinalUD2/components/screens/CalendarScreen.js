import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../navigation/BottomNavigation';

export default function CalendarScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Array de días de la semana
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Array de fechas para la vista semanal
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });

  // Eventos ejemplo
  const events = [
    {
      id: 1,
      time: '07:00 AM',
      title: 'Morning Swimming',
      duration: '45 min',
      type: 'swimming',
      color: '#E3F2FD'
    },
    {
      id: 2,
      time: '10:30 AM',
      title: 'Tennis Training',
      duration: '1 hour',
      type: 'tennis',
      color: '#F9FBE7'
    },
    {
      id: 3,
      time: '04:00 PM',
      title: 'Gym Session',
      duration: '1.5 hours',
      type: 'gym',
      color: '#FCE4EC'
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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <Text style={styles.monthText}>October 2024</Text>
        
        {/* Week Days */}
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Week Dates */}
        <View style={styles.weekDatesContainer}>
          {weekDates.map((date) => (
            <TouchableOpacity
              key={date.toISOString()}
              style={[
                styles.dateButton,
                selectedDate.toDateString() === date.toDateString() && styles.selectedDate
              ]}
              onPress={() => handleDateSelect(date)}
            >
              <Text style={[
                styles.dateText,
                selectedDate.toDateString() === date.toDateString() && styles.selectedDateText
              ]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Schedule Title */}
      <View style={styles.scheduleHeader}>
        <Text style={styles.scheduleTitle}>Your Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsContainer}>
        {events.map((event) => (
          <View key={event.id} style={[styles.eventCard, { backgroundColor: event.color }]}>
            <View style={styles.eventTime}>
              <Text style={styles.timeText}>{event.time}</Text>
              <Text style={styles.durationType}>{event.duration}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventType}>
                <Ionicons 
                  name={
                    event.type === 'swimming' ? 'water' : 
                    event.type === 'tennis' ? 'tennisball' : 'fitness'
                  } 
                  size={16} 
                  color="#666" 
                />
                <Text style={styles.eventTypeText}>{event.type}</Text>
              </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuButton: {
    padding: 4,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  monthText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  weekDatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#000',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  selectedDateText: {
    color: '#fff',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {
    padding: 4,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  eventTime: {
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  durationType: {
    fontSize: 12,
    color: '#666',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTypeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
});