import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ErrorResultsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Botón "Go Back" con icono */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={require('../assets/logo.png')} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        {/* Imagen de error */}
        <Image source={require('../assets/error-icon.png')} style={styles.image} />

        {/* Mensaje de error */}
        <Text style={styles.errorText}>Oops!</Text>
        <Text style={styles.description}>Something went wrong with the fruit...</Text>
        <Text style={styles.description}>Please try again</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50', // Fondo verde
    padding: 5,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D9534F',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#D9534F',
  },
});

export default ErrorResultsScreen;
