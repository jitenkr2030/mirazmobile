import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Footer = ({ navigation, activeTab }) => {
  const tabs = [
    { name: 'Map', route: 'Map', icon: 'map', color: '#4CAF50' }, // Green for Map
    { name: 'Chat', route: 'Chat', icon: 'chat', color: '#2196F3' }, // Blue for Chat
    { name: 'Tasks', route: 'Tasks', icon: 'check-circle', color: '#FF9800' }, // Orange for Tasks
    { name: 'Incidents', route: 'Incidents', icon: 'warning', color: '#F44336' }, // Red for Incidents
    { name: 'Report', route: 'Report', icon: 'description', color: '#9C27B0' }, // Purple for Report
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          onPress={() => navigation.navigate(tab.route)}
          style={[
            styles.button,
            activeTab === tab.route ? styles.activeButton : styles.inactiveButton,
          ]}
          accessibilityLabel={`Navigate to ${tab.name}`}
        >
          <MaterialIcons name={tab.icon} size={24} color={activeTab === tab.route ? '#fff' : tab.color} />
          <Text style={[
            styles.buttonText,
            activeTab === tab.route ? styles.activeButtonText : styles.inactiveButtonText,
          ]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50', // Green for active tab
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#fff', // White text for active button
  },
  inactiveButtonText: {
    color: '#333', // Dark text for inactive button
  },
});

export default Footer;



