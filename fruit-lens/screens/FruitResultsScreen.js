import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FruitResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fruit, image, status, daysLeft, recipes } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Botón "Go Back" con icono */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={require('../assets/logo.png')} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        {/* Imagen de la fruta */}
        <Image source={image} style={styles.image} />

        {/* Nombre de la fruta */}
        <Text style={styles.title}>{fruit}</Text>

        {/* Caja con la información del estado */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>State: {status}</Text>
          <Text style={styles.infoText}>Time left: {daysLeft} days</Text>
          <Text style={styles.infoText}>Recipes:</Text>
          {recipes.map((recipe, index) => (
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