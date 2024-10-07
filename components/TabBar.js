import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

const TabBar = ({ activeTab, setActiveTab, toggleDarkMode, onLogout, onNotificationPress, onPanicPress }) => {
  
  // Function to render each tab with icon and label
  const renderTab = (name, label, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Icon name={name} size={24} color={activeTab === label ? "#007BFF" : "gray"} />
      <Text style={[styles.tabText, { color: activeTab === label ? "#007BFF" : "gray" }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabBar}>
      {renderTab('bell', 'Notifications', onNotificationPress)}
      {renderTab('alert-triangle', 'Panic', onPanicPress)}
      {renderTab('log-out', 'Logout', onLogout)}
      {renderTab('moon', 'Toggle Dark Mode', toggleDarkMode)}
    </View>
  );
};

TabBar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNotificationPress: PropTypes.func.isRequired,
  onPanicPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f8f8f8',  // Adjust background based on the theme (can be dynamic)
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TabBar;




