

import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Platform } from 'react-native';

const API_KEY = "8gyDNXONTpiXI6Dd0Z52";
const API_URL = "https://serverless.roboflow.com/fruits-quality-jhcct/1";

const analyzeFruitImage = async (imageUri) => {
  try {
    let base64Image;

    if (Platform.OS === 'web') {
      base64Image = imageUri.split(',')[1];
      if (!base64Image) {
        throw new Error('Invalid image data URL');
      }
    } else {
      base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

    const response = await axios({
      method: "POST",
      url: API_URL,
      params: {
        api_key: API_KEY,
      },
      data: base64Image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Imprimir la respuesta completa para inspeccionar su formato
    console.log('Respuesta completa de Roboflow:', response.data);

    // Verificar el campo de la imagen procesada
    let processedImageUrl = response.data.visualization || response.data.image || null;
    if (processedImageUrl && typeof processedImageUrl !== 'string') {
      console.warn('processedImageUrl no es una cadena:', processedImageUrl);
      processedImageUrl = null; // Si no es una cadena, lo ponemos como null
    }

    // Retornar tanto las predicciones como la URL de la imagen procesada (si existe)
    return {
      predictions: response.data.predictions || [],
      processedImageUrl,
    };
  } catch (error) {
    console.error('Error analizando la imagen:', error.message);
    throw error;
  }
};

export default analyzeFruitImage;