import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// TypeScript interfaces
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onDelete }) => (
  <View style={styles.todoItem}>
    <TouchableOpacity 
      style={styles.todoText} 
      onPress={() => onToggle(item.id)}
    >
      <Text style={[styles.todoTitle, item.completed && styles.completedTodo]}>
        {item.completed ? '✅' : '⭕'} {item.text}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.deleteButton}
      onPress={() => onDelete(item.id)}
    >
      <Text style={styles.deleteText}>🗑️</Text>
    </TouchableOpacity>
  </View>
);

export default function TabTwoScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React Native with TypeScript', completed: true },
    { id: 2, text: 'Understand Expo Router', completed: false },
    { id: 3, text: 'Master Safe Area Handling', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addTodo = useCallback((): void => {
    if (newTodo.trim()) {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text: newTodo.trim(), completed: false }
      ]);
      setNewTodo('');
      setModalVisible(false);
    }
  }, [newTodo]);

  const toggleTodo = useCallback((id: number): void => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number): void => {
    Alert.alert(
      'Delete Todo',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => setTodos(prev => prev.filter(todo => todo.id !== id)) 
        }
      ]
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>📝 Todo List Demo</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList<Todo>
          data={todos}
          keyExtractor={(item: Todo) => item.id.toString()}
          renderItem={({ item }: { item: Todo }) => (
            <TodoItem 
              item={item} 
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          style={styles.todoList}
          contentContainerStyle={styles.listContent}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Todo</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter todo text..."
                value={newTodo}
                onChangeText={setNewTodo}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.primaryButton]}
                  onPress={addTodo}
                >
                  <Text style={[styles.modalButtonText, styles.primaryButtonText]}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10, // Extra spacing from top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  todoList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Space for tab bar
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoText: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c757d',
  },
  primaryButtonText: {
    color: 'white',
  },
});