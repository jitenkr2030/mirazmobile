import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ActivityIndicator, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const IncidentReporting = () => {
  const [incidentDescription, setIncidentDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
  const maxLength = 300;

  const reportIncident = () => {
    if (incidentDescription.trim()) {
      if (incidentDescription.length <= maxLength) {
        setIsSubmitting(true);
        setTimeout(() => {
          // Simulate network request
          Alert.alert('Incident Reported', `Description: ${incidentDescription}`);
          if (selectedImage) {
            Alert.alert('Image Attached', `Image URI: ${selectedImage.uri}`);
          }
          setIncidentDescription(''); // Clear input after submission
          setSelectedImage(null); // Clear selected image
          setIsSubmitting(false);
        }, 1000);
      } else {
        Alert.alert('Error', `Description exceeds the maximum length of ${maxLength} characters`);
      }
    } else {
      Alert.alert('Error', 'Please enter a description');
    }
  };

  const clearDescription = () => {
    Alert.alert('Confirm Clear', 'Are you sure you want to clear the description?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setIncidentDescription(''); // Clear the description field
          setSelectedImage(null); // Clear selected image
        },
      },
    ]);
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0]); // Set the selected image
      }
    });
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0]); // Set the captured image
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incident Reporting</Text>

      {/* Button container for image actions at the top */}
      <View style={styles.imageButtonContainer}>
        <Button
          title="Take Photo"
          onPress={takePhoto}
          color="#4CAF50"
          accessibilityLabel="Open camera to take a photo"
        />
        <Button
          title="Upload Image"
          onPress={selectImage}
          color="#007BFF"
          accessibilityLabel="Select an image from the gallery"
        />
      </View>

      {/* Incident description input field */}
      <TextInput
        style={styles.input}
        value={incidentDescription}
        onChangeText={setIncidentDescription}
        placeholder="Describe the incident..."
        multiline
        maxLength={maxLength}
        editable={!isSubmitting}
        accessibilityLabel="Enter the incident description"
        accessibilityHint={`Maximum ${maxLength} characters`}
      />

      {/* Character Counter */}
      <Text style={styles.charCounter}>
        {`${incidentDescription.length}/${maxLength} characters`}
      </Text>

      {/* Display selected image if any */}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.imagePreview}
        />
      )}

      {/* Loading Indicator when submitting */}
      {isSubmitting && <ActivityIndicator size="large" color="#4CAF50" />}

      {/* Button container for submitting and clearing */}
      <View style={styles.buttonContainer}>
        <Button
          title="Report Incident"
          onPress={reportIncident}
          color="#4CAF50"
          disabled={!incidentDescription.trim() || isSubmitting}
          accessibilityLabel="Submit the incident report"
          accessibilityHint="Button is disabled if there is no description entered"
        />
        <Button
          title="Clear"
          onPress={clearDescription}
          color="#f44336"
          disabled={isSubmitting}
          accessibilityLabel="Clear the incident report input"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    height: 120,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  charCounter: {
    textAlign: 'right',
    marginBottom: 20,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default IncidentReporting;





