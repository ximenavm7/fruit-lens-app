import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import analyzeFruitImage from '../utils/analyzeFruitImage';

const ProcessingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;

  useEffect(() => {
    const processImage = async () => {
      try {
        const predictions = await analyzeFruitImage(imageUri);
        // Parse the top prediction
        if (!predictions || predictions.length === 0) {
          throw new Error('No fruit detected');
        }
        const topPrediction = predictions.reduce((prev, current) =>
          prev.confidence > current.confidence ? prev : current
        );
        const { class: className } = topPrediction;

        // Parse fruit and status from class (e.g., "Apple_Fresh" -> fruit: "Apple", status: "Fresh")
        const [fruit, status] = className.split('_');
        if (!fruit || !status) {
          throw new Error('Invalid prediction format');
        }

        // Determine daysLeft based on status
        let daysLeft;
        if (status.toLowerCase() === 'fresh' || status.toLowerCase() === 'semifresh') {
          daysLeft = '7+ days';
        } else if (status.toLowerCase() === 'rotten' || status.toLowerCase() === 'semirotten') {
          daysLeft = '2- days';
        } else {
          daysLeft = 'Unknown';
        }

        // Set recipes based on fruit
        let recipes = [];
        switch (fruit.toLowerCase()) {
          case 'apple':
            recipes = ['Apple pie', 'Apple juice', 'Apple strudel'];
            break;
          case 'banana':
            recipes = ['Banana bread', 'Banana smoothie', 'Banana pancakes'];
            break;
          case 'mango':
            recipes = ['Mango salsa', 'Mango smoothie', 'Mango sticky rice'];
            break;
          case 'melon':
            recipes = ['Melon salad', 'Melon smoothie', 'Melon sorbet'];
            break;
          case 'orange':
            recipes = ['Orange juice', 'Orange honey lemon slices', 'Orange pie'];
            break;
          case 'peach':
            recipes = ['Peach cobbler', 'Peach smoothie', 'Peach jam'];
            break;
          case 'pear':
            recipes = ['Pear tart', 'Pear salad', 'Pear compote'];
            break;
          default:
            recipes = ['Fruit salad', 'Smoothie', 'Juice']; // Default for unrecognized fruits
        }

        // Pass the parsed data to FruitResultsScreen
        navigation.navigate('FruitResults', {
          fruit: fruit.charAt(0).toUpperCase() + fruit.slice(1),
          status: status.charAt(0).toUpperCase() + status.slice(1),
          className: `${fruit}_${status}`, // Fruit & state as class
          daysLeft,
          recipes,
          imageUri, // Pass the captured image URI
        });
      } catch (error) {
        navigation.navigate('ErrorResults', { error: error.message });
      }
    };
    processImage();
  }, [imageUri, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ActivityIndicator size="large" color="#D9534F" />
        <Text style={styles.text}>Analyzing image...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#D9534F',
    fontWeight: 'bold',
  },
});

export default ProcessingScreen;