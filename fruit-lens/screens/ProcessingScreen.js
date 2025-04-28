import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import analyzeFruitImage from '../utils/analyzeFruitImage';

const ProcessingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;

  const recipesByFruit = {
    Apple: ['Apple pie', 'Apple smoothie', 'Caramel apples'],
    Banana: ['Banana bread', 'Banana smoothie', 'Banana pancakes'],
    Orange: ['Orange juice', 'Orange honey lemon slices', 'Orange pie'],
    Pear: ['Pear salad', 'Pear & Ginger Sparkler', 'Cranberry Pear Tart'],
  };

  useEffect(() => {
    const processImage = async () => {
      try {
        const { predictions, processedImageUrl } = await analyzeFruitImage(imageUri);

        if (!predictions || predictions.length === 0) {
          navigation.navigate('ErrorResults', { error: 'No fruit was detected in the image' });
          return;
        }

        const prediction = predictions[0];

        if (!prediction.class || !prediction.confidence) {
          navigation.navigate('ErrorResults', { error: 'Invalid prediction format received from the model' });
          return;
        }

        const [fruit, status] = prediction.class.split(' ');
        if (!fruit || !status) {
          navigation.navigate('ErrorResults', { error: 'Could not parse fruit type or status from prediction' });
          return;
        }

        let daysLeft;
        switch (status.toLowerCase()) {
          case 'fresh':
            daysLeft = '7+ days';
            break;
          case 'semifresh':
            daysLeft = '3-5 days';
            break;
          case 'semirotten':
            daysLeft = '2 < days';
            break;
          case 'rotten':
            daysLeft = '0 days';
            break;
          default:
            daysLeft = 'N/A';
        }

        const recipes = recipesByFruit[fruit] || ['No recipes available'];
        const className = `${fruit} & ${status}`;
        const finalImageUri = processedImageUrl && typeof processedImageUrl === 'string' ? processedImageUrl : imageUri;

        const result = {
          imageUri: finalImageUri,
          fruit,
          status,
          className,
          daysLeft,
          recipes,
        };

        navigation.navigate('FruitResults', result);
      } catch (error) {
        navigation.navigate('ErrorResults', { error: error.message });
      }
    };

    processImage();
  }, [imageUri, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Processing image...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProcessingScreen;