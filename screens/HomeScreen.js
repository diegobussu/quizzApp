import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('9'); // Par défault on sélectionne la catégorie générale

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        setCategories(data.trivia_categories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const startQuizz = () => {
    navigation.navigate('Quizz', { difficulty, category: selectedCategory });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Difficulty :</Text>
      <Picker
        style={styles.picker}
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      {categories.length > 0 && (
        <>
          <Text style={styles.title}>Choose Category :</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {categories.map(category => (
              <Picker.Item key={category.id} label={category.name} value={category.id.toString()} />
            ))}
          </Picker>
        </>
      )}
      <Button title="Start Quizz" onPress={startQuizz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
});

export default HomeScreen;
