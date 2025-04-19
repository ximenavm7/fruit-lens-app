import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Platform } from 'react-native';

// Replace with your actual Roboflow API key
const API_KEY = "8gyDNXONTpiXI6Dd0Z52"; // Your API key
const API_URL = "https://serverless.roboflow.com/fruits-quality-jhcct/1";

const analyzeFruitImage = async (imageUri) => {
  try {
    let base64Image;

    if (Platform.OS === 'web') {
      // On web (not used since you're focusing on phone app)
      base64Image = imageUri.split(',')[1];
      if (!base64Image) {
        throw new Error('Invalid image data URL');
      }
    } else {
      // On native, convert the image file to base64
      base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

    // Send to Roboflow API using axios
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

    return response.data.predictions; // Return predictions
  } catch (error) {
    console.error('Error analyzing image:', error.message);
    throw error;
  }
};

export default analyzeFruitImage;