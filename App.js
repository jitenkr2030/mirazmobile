import React, { useState, useEffect, useCallback } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/Chat';
import TasksScreen from './components/TaskManagement';
import IncidentsScreen from './components/IncidentReporting';
import ReportScreen from './components/ShiftReport';
import TabBar from './components/TabBar'; // Ensure the path is correct

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    username: '',
    password: ''
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('map'); // Manage active tab state

  const addNotification = useCallback((message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message }]);
  }, []);

  const handleLogin = () => {
    if (auth.username && auth.password) {
      setAuth((prev) => ({ ...prev, isAuthenticated: true }));
      Alert.alert("Login Successful", `Welcome, ${auth.username}`);
    } else {
      Alert.alert("Error", "Please enter valid credentials");
    }
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, username: '', password: '' });
    Alert.alert("Logout", "You have logged out successfully!");
  };

  const handlePanicPress = () => {
    Alert.alert("Panic Alert", "Emergency services have been notified."); // Placeholder logic
  };

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "You have no new notifications."); // Placeholder logic
  };

  useEffect(() => {
    if (darkMode) {
      // Logic to switch to dark mode
    } else {
      // Logic to switch to light mode
    }
  }, [darkMode]);

  return (
    <NavigationContainer>
      {!auth.isAuthenticated ? (
        <View style={styles.loginContainer}>
          {/* Add your logo here */}
          <Image
            source={require('./assets/logo.png')} // Path to your logo image
            style={styles.logo} // Styling for the logo
            resizeMode="contain" // Ensure the image scales properly
          />
          <Text style={styles.title}>Login</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Username" 
            value={auth.username} 
            onChangeText={(text) => setAuth((prev) => ({ ...prev, username: text }))} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry 
            value={auth.password} 
            onChangeText={(text) => setAuth((prev) => ({ ...prev, password: text }))} 
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      ) : (
        <View style={styles.container}>
          {/* Top Bar for Logout, Notifications, and Panic Button */}
          <View style={styles.topBar}>
            <TabBar 
              activeTab={activeTab} // Pass the active tab state
              setActiveTab={setActiveTab} // Set active tab function
              onLogout={handleLogout}
              onNotificationPress={handleNotificationPress}
              onPanicPress={handlePanicPress}
              toggleDarkMode={() => setDarkMode((prev) => !prev)} // Toggle dark mode
            />
          </View>

          <Tab.Navigator
            screenOptions={{
              headerShown: false, // Hide header for bottom tab navigator
            }}
          >
            <Tab.Screen name="Map">
              {(props) => <MapScreen {...props} setActiveTab={() => setActiveTab('map')} />}
            </Tab.Screen>
            <Tab.Screen name="Chat">
              {(props) => <ChatScreen {...props} setActiveTab={() => setActiveTab('chat')} />}
            </Tab.Screen>
            <Tab.Screen name="Tasks">
              {(props) => <TasksScreen {...props} setActiveTab={() => setActiveTab('tasks')} />}
            </Tab.Screen>
            <Tab.Screen name="Incidents">
              {(props) => <IncidentsScreen {...props} setActiveTab={() => setActiveTab('incidents')} />}
            </Tab.Screen>
            <Tab.Screen name="Reports">
              {(props) => <ReportScreen {...props} setActiveTab={() => setActiveTab('reports')} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 150,  // Adjust the size of the logo
    height: 150, // Adjust the size of the logo
    marginBottom: 20, // Add some space between the logo and title
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  topBar: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default App;






