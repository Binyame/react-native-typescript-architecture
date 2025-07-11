import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom hook with TypeScript
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
};

// Interface for concepts
interface Concept {
  id: number;
  title: string;
  description: string;
  example: string;
}

export default function HomeScreen() {
  const { count, increment, decrement, reset } = useCounter(0);

  const concepts: Concept[] = [
    {
      id: 1,
      title: 'TypeScript Interfaces',
      description: 'Define the shape of objects with type safety.',
      example: 'interface User { id: number; name: string; }'
    },
    {
      id: 2,
      title: 'Typed State',
      description: 'useState with explicit types for better development.',
      example: 'useState<string>("")'
    },
    {
      id: 3,
      title: 'Safe Area Handling',
      description: 'Proper spacing for status bar and device notches.',
      example: 'useSafeAreaInsets() from react-native-safe-area-context'
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        {/* Clear Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🏠 Home Tab</Text>
          <Text style={styles.subtitle}>React Native + TypeScript Learning</Text>
        </View>
        
        {/* Counter Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Counter Demo</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Count: {count}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={decrement}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={increment}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Concepts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Key Concepts</Text>
          {concepts.map(concept => (
            <View key={concept.id} style={styles.conceptCard}>
              <Text style={styles.conceptTitle}>{concept.title}</Text>
              <Text style={styles.conceptDescription}>{concept.description}</Text>
              <Text style={styles.conceptExample}>Example: {concept.example}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#495057',
  },
  counterContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#212529',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  resetButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  conceptCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#212529',
  },
  conceptDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20,
  },
  conceptExample: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'Courier',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
  },
});