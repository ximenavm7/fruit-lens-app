import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import analyzeFruitImage from '../utils/analyzeFruitImage';

const ProcessingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;

  // Recetas predefinidas para cada fruta
  const recipesByFruit = {
    Apple: ['Apple pie', 'Apple smoothie', 'Caramel apples'],
    Banana: ['Banana bread', 'Banana smoothie', 'Banana pancakes'],
    Orange: ['Orange juice', 'Orange honey lemon slices', 'Orange pie'],
    // Agrega más frutas si es necesario
  };

  useEffect(() => {
    const processImage = async () => {
      try {
        const { predictions, processedImageUrl } = await analyzeFruitImage(imageUri);

        // Verificar si hay predicciones
        if (!predictions || predictions.length === 0) {
          navigation.navigate('ErrorResults', { error: 'No fruit was detected in the image' });
          return;
        }

        // Tomar la primera predicción
        const prediction = predictions[0];

        // Verificar si tiene la clave 'class'
        if (!prediction.class || !prediction.confidence) {
          navigation.navigate('ErrorResults', { error: 'Invalid prediction format received from the model' });
          return;
        }

        // Extraer fruit y status desde la clave 'class' (ejemplo: "Apple Fresh")
        const [fruit, status] = prediction.class.split(' ');
        if (!fruit || !status) {
          navigation.navigate('ErrorResults', { error: 'Could not parse fruit type or status from prediction' });
          return;
        }

        // Asignar daysLeft según el estado
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
            daysLeft = 'N/A'; // Para estados desconocidos
        }

        // Obtener recetas basadas en el tipo de fruta (o un valor por defecto si no hay recetas)
        const recipes = recipesByFruit[fruit] || ['No recipes available'];

        // Calcular className como la concatenación de fruit y status
        const className = `${fruit} & ${status}`;

        // Asegurarse de que imageUri sea una cadena válida
        const finalImageUri = processedImageUrl && typeof processedImageUrl === 'string' ? processedImageUrl : imageUri;

        // Preparar los datos para FruitResultsScreen
        const result = {
          imageUri: finalImageUri,
          fruit,
          status,
          className,
          daysLeft,
          recipes,
        };

        // Imprimir los datos para depuración
        console.log('Datos pasados a FruitResultsScreen:', result);

        navigation.navigate('FruitResults', result);
      } catch (error) {
        console.error('Error processing the image:', error.message);
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