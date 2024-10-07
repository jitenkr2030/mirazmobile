import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Switch, Alert } from 'react-native';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Check the perimeter', completed: false },
    { id: '2', title: 'Report any suspicious activity', completed: false },
    { id: '3', title: 'Complete daily logs', completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now().toString(), title: newTaskTitle.trim(), completed: false },
      ]);
      setNewTaskTitle(''); // Reset the input field after adding
    } else {
      Alert.alert('Error', 'Task title cannot be empty.'); // Provide feedback for empty input
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>

      {/* Task Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          accessibilityLabel="Enter new task"
          accessibilityHint="Type the title of the task you want to add"
        />
        <Button title="Add Task" onPress={addTask} />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Switch
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
              accessibilityLabel={`Mark ${item.title} as ${item.completed ? 'incomplete' : 'complete'}`}
            />
            <Text style={item.completed ? styles.completed : styles.taskTitle}>
              {item.title}
            </Text>
            <Button title="Delete" onPress={() => deleteTask(item.id)} color="#f44336" />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  completed: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskManagement;

