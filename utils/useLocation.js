import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    };

    getLocation();
    const locationInterval = setInterval(() => {
      getLocation();
    }, 10000); // Update location every 10 seconds

    return () => clearInterval(locationInterval); // Cleanup interval
  }, []);

  return { currentLocation };
};
