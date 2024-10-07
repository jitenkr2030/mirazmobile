import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Ensure PROVIDER_GOOGLE is imported if using Google Maps

const MapScreen = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  // Request location permission for Android
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasLocationPermission(true);
          } else {
            Alert.alert('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        setHasLocationPermission(true); // iOS automatically grants location access
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Screen</Text>
      {hasLocationPermission ? (
        <MapView
          provider={PROVIDER_GOOGLE} // Remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        />
      ) : (
        <Text style={styles.errorText}>Location permission is required to use the map.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});

export default MapScreen;




