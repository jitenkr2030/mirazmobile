import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: newMessage }]);
      setNewMessage(''); // Clear the input after sending
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        keyExtractor={item => item.id}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
  },
});

export default Chat;

