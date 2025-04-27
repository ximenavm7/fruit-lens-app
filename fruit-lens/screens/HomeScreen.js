import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { FullWindowOverlay } from 'react-native-screens';

const HomeScreen = ({ navigation }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        'Se necesita acceso a la galería para seleccionar fotos.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      exif: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1000 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      navigation.navigate('Processing', { imageUri: manipulatedImage.uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Fruit-lens</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Scanner')}
          style={styles.button}
        >
          Tap to start scanning
        </Button>
        <Button
          mode="contained"
          onPress={pickImage}
          style={styles.button}
        >
          Use image from gallery
        </Button>
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
    paddingVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 100,
  },
  button: {
    width: '70%',
    marginVertical: 30,
    backgroundColor: '#d9534f',
  },
});

export default HomeScreen;