import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Math.random().toString(), name: newTask }]);
      setNewTask('');
    }
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite uma nova tarefa"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />
      <Button title="Adicionar" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={item.completed ? styles.completedTask : null}>
              {item.name}
            </Text>
            {!item.completed && (
              <>
                <Button title="Concluído" onPress={() => completeTask(item.id)} />
                <Button title="Excluir" onPress={() => deleteTask(item.id)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
});