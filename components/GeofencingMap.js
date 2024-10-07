import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const GeofencingMap = () => {
  const [location, setLocation] = useState(null);
  const [geofenceRegion, setGeofenceRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // Using useCallback to memoize the getDistance function
  const getDistance = useCallback((lat, lon) => {
    const R = 6371e3; // radius of the earth in meters
    const φ1 = geofenceRegion.latitude * (Math.PI / 180);
    const φ2 = lat * (Math.PI / 180);
    const Δφ = (lat - geofenceRegion.latitude) * (Math.PI / 180);
    const Δλ = (lon - geofenceRegion.longitude) * (Math.PI / 180);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in meters
  }, [geofenceRegion]);

  useEffect(() => {
    if (location) {
      const distance = getDistance(location.latitude, location.longitude);
      if (distance > 100) { // Change to desired geofence radius in meters
        Alert.alert('You have exited the geofenced area!');
      }
    }
  }, [location, getDistance]); // Added getDistance to dependency array

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={geofenceRegion}
      >
        {location && (
          <Marker
            coordinate={location}
            title="You are here"
          />
        )}
        <Marker
          coordinate={geofenceRegion}
          title="Geofence Center"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default GeofencingMap;



