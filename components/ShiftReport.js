import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, FlatList } from 'react-native';

const ShiftReport = () => {
  const [shiftStart, setShiftStart] = useState(null);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [reports, setReports] = useState([]);
  const maxLength = 300; // Character limit for the incident description

  const clockIn = () => {
    setShiftStart(new Date());
    Alert.alert('Clock In', 'You have clocked in successfully.');
  };

  const clockOut = () => {
    if (!shiftStart) {
      Alert.alert('Error', 'You must clock in before clocking out.');
      return;
    }

    if (!incidentDescription.trim()) {
      Alert.alert('Error', 'Please provide an incident description before clocking out.');
      return;
    }

    const end = new Date();
    const duration = Math.floor((end - shiftStart) / 1000 / 60); // Duration in minutes
    const reportEntry = {
      description: incidentDescription,
      duration,
      shiftStart,
      shiftEnd: end,
    };
    setReports((prevReports) => [...prevReports, reportEntry]);
    Alert.alert('Clock Out', `You have clocked out. Shift duration: ${duration} minutes.`);
    setShiftStart(null); // Reset shiftStart after clocking out
    setIncidentDescription(''); // Clear the incident description
  };

  const submitReport = () => {
    if (incidentDescription.trim()) {
      Alert.alert('Incident Report Submitted', `Report: ${incidentDescription}`);
      setIncidentDescription(''); // Clear input after submission
    } else {
      Alert.alert('Error', 'Please enter a description');
    }
  };

  // Filter reports for the current month
  const currentMonthReports = reports.filter((report) => {
    const reportDate = new Date(report.shiftStart);
    const now = new Date();
    return (
      reportDate.getMonth() === now.getMonth() && 
      reportDate.getFullYear() === now.getFullYear()
    );
  });

  const renderReportItem = ({ item }) => (
    <View style={styles.reportItem}>
      <Text>{`Incident: ${item.description}`}</Text>
      <Text>{`Duration: ${item.duration} minutes`}</Text>
      <Text>{`Shift Start: ${item.shiftStart.toLocaleString()}`}</Text>
      <Text>{`Shift End: ${item.shiftEnd.toLocaleString()}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shift Reporting</Text>
      <TextInput
        style={styles.input}
        value={incidentDescription}
        onChangeText={setIncidentDescription}
        placeholder="Describe the incident..."
        multiline
        maxLength={maxLength}
        accessibilityLabel="Enter the incident description"
        accessibilityHint={`Maximum ${maxLength} characters`}
      />
      <Text style={styles.charCounter}>
        {`${incidentDescription.length}/${maxLength} characters`}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Clock In" onPress={clockIn} color="#4CAF50" />
        <Button title="Clock Out" onPress={clockOut} color="#f44336" disabled={!shiftStart} />
      </View>
      <Button title="Submit Incident Report" onPress={submitReport} />
      <Text style={styles.monthlyReportTitle}>Monthly Shift Reports:</Text>
      <FlatList
        data={currentMonthReports}
        renderItem={renderReportItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.reportsContainer}
        ListEmptyComponent={<Text>No shift reports for this month.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    height: 120,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Align input text at the top for multiline
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
  reportsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  monthlyReportTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  reportItem: {
    marginBottom: 10,
  },
});

export default ShiftReport;




