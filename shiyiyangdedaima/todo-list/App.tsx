import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  };

  const addTask = () => {
    if (inputText.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
        priority: 'medium'
      };
      saveTasks([...tasks, newTask]);
      setInputText('');
    }
  };

  const deleteTask = (taskId: string) => {
    saveTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="输入新任务"
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="添加" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => {
  const updatedTasks = tasks.map(task => 
    task.id === item.id ? {...task, completed: !task.completed} : task
  );
  saveTasks(updatedTasks);
}}>
  <Text style={[styles.taskText, item.completed && styles.completedText]}>
    {item.text}
    <Text style={styles[item.priority]}>{'  '}{item.priority}</Text>
  </Text>
</TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  high: {
    color: 'red',
    fontSize: 12,
  },
  medium: {
    color: 'orange',
    fontSize: 12,
  },
  low: {
    color: 'green',
    fontSize: 12,
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    color: 'red',
    fontSize: 20,
  },
});
