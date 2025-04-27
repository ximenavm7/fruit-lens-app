import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FruitResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fruit, status, className, daysLeft, recipes, imageUri } = route.params;

  // Asegurarse de que recipes sea un arreglo
  const safeRecipes = Array.isArray(recipes) ? recipes : ['No recipes available'];

  // Verificar si imageUri es una cadena válida
  const isValidImageUri = typeof imageUri === 'string' && imageUri.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={require('../assets/logo.png')} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        {/* Display the processed image from Roboflow, or an error message if not available */}
        {isValidImageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.errorText}>Processed image not available</Text>
        )}

        {/* Display the fruit name */}
        <Text style={styles.title}>{fruit || 'Unknown'}</Text>

        {/* Info box with class, state, time left, and recipes */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Class: {fruit || 'Unknown'}</Text>
          <Text style={styles.infoText}>State: {status || 'Unknown'}</Text>
          <Text style={styles.infoText}>Time left: {daysLeft || 'N/A'}</Text>
          <Text style={styles.infoText}>Recipes:</Text>
          {safeRecipes.map((recipe, index) => (
            <Text key={index} style={styles.recipeText}>• {recipe}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
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
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#D9534F',
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9534F',
    marginTop: 20,
  },
  infoBox: {
    backgroundColor: '#D9534F',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginTop: 50,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default FruitResultsScreen;