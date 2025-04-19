import * as FileSystem from 'expo-file-system';

// Replace with your actual Roboflow API key
const API_KEY = "8gyDNXONTpiXI6Dd0Z52";
const API_URL = "https://serverless.roboflow.com";
const MODEL_ID = "fruits-quality-jhcct/1";

const analyzeFruitImage = async (imageUri) => {
  try {
    // Convert image to base64
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Prepare the body for the API request
    const body = new FormData();
    body.append('file', {
      uri: imageUri,
      name: 'your_image.jpg',
      type: 'image/jpeg',
    });

    // Send to Roboflow API
    const response = await fetch(`${API_URL}/${MODEL_ID}?api_key=${API_KEY}`, {
      method: 'POST',
      body: body,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.predictions; // Returns array of predictions
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

export default analyzeFruitImage;