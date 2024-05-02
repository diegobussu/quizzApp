import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const startQuizz = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={require('../assets/img/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to the Quizz App !</Text>
          <Text style={styles.subtitle}>Are you ready to challenge your knowledge ?</Text>
          <TouchableOpacity style={styles.button} onPress={startQuizz}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 24, 
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: '#007bff', 
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 2, 
    marginBottom: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
