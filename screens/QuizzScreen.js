import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const QuizScreen = ({ route, navigation }) => {
  const { difficulty, category } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        const selectedCategory = data.trivia_categories.find(cat => cat.id.toString() === category);
        setCategoryName(decodeURIComponent(selectedCategory.name));
      })
      .catch(error => console.error('Error : ', error));
  }, [category]);

  
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&encode=url3986&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then(response => response.json())
      .then(data => {
        if (data.results) { 
          const decodedQuestions = data.results.map(question => {
            const decodedQuestion = {
              ...question,
              question: decodeURIComponent(question.question),
              correct_answer: decodeURIComponent(question.correct_answer),
              incorrect_answers: question.incorrect_answers.map(answer => decodeURIComponent(answer))
            };
            return decodedQuestion;
          });
          setQuestions(decodedQuestions);
        } else {
          navigation.navigate('Home');
        }
      })
      .catch(error => console.error('Error : ', error));
  }, [difficulty, category]);
  
  




  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert(
        'Quizz Terminé',
        `Votre score est de ${score}/${questions.length}`,
        [
          { text: 'OK', onPress: () => navigation.navigate('Welcome') }
        ],
        { cancelable: false }
      );
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.incorrect_answers.map((answer, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(answer)}>
            <Text style={styles.buttonText}>{answer}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => handleAnswer(currentQuestion.correct_answer)}>
          <Text style={styles.buttonText}>{currentQuestion.correct_answer}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score : {score}</Text>
      <Text style={styles.category}>Selected category : {categoryName}</Text>
      <Text style={styles.difficulty}>Selected difficulty : {difficulty ? difficulty : "All"}</Text>
      <Text style={styles.questionCount}>{currentQuestionIndex + 1}/{questions.length}</Text>
      {questions.length > 0 && renderQuestion()}
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
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
  },
  difficulty: {
    fontSize: 16,
    marginBottom: 20,
  },
  questionContainer: {
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  }  
});

export default QuizScreen;