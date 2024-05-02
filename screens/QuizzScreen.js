import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';

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
        setCategoryName(decodeURIComponent(selectedCategory.name)); // Décode le nom de la catégorie
      })
      .catch(error => console.error('Error : ', error));
  }, [category]);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then(response => response.json())
      .then(data => {
        const decodedQuestions = data.results.map(question => {
          const decodedQuestion = {
            ...question,
            question: decodeURIComponent(question.question), // Décode la question
            correct_answer: decodeURIComponent(question.correct_answer), // Décode la réponse correcte
            incorrect_answers: question.incorrect_answers.map(answer => decodeURIComponent(answer)) // Décode les réponses incorrectes
          };
          return decodedQuestion;
        });
        setQuestions(decodedQuestions);
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
          { text: 'OK', onPress: () => navigation.goBack() } // Rediriger l'utilisateur lorsque OK est appuyé
        ],
        { cancelable: false }
      );
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <View>
        <Text>{currentQuestion.question}</Text>
        {currentQuestion.incorrect_answers.map((answer, index) => (
          <Button key={index} title={answer} onPress={() => handleAnswer(answer)} />
        ))}
        <Button title={currentQuestion.correct_answer} onPress={() => handleAnswer(currentQuestion.correct_answer)} />
      </View>
    );
  };

  return (
    <View>
      <Text>Score : {score}</Text>
      <Text>Selected category : {categoryName}</Text>
      <Text>Selected difficulty : {difficulty}</Text>
      {questions.length > 0 && renderQuestion()}
    </View>
  );
};

export default QuizScreen;
