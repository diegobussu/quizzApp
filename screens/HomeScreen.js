import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('9'); // Default category id for General Knowledge

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        setCategories(data.trivia_categories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const startQuiz = () => {
    navigation.navigate('Quiz', { difficulty, category: selectedCategory });
  };

  return (
    <View>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      {categories.length > 0 && (
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {categories.map(category => (
            <Picker.Item key={category.id} label={category.name} value={category.id.toString()} />
          ))}
        </Picker>
      )}
      <Button title="Start Quiz" onPress={startQuiz} />
    </View>
  );
};

export default HomeScreen;
