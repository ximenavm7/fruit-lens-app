import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const ScannerScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('back');
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    } else if (!permission.granted) {
      alert('Camera permission is required to scan fruits.');
      navigation.navigate('Home');
    }
  }, [permission, requestPermission, navigation]);

  const takePicture = async () => {
    if (cameraRef.current && isScanning) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        setIsScanning(false);

        const manipulatedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 1000 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        navigation.navigate('Processing', { imageUri: manipulatedImage.uri });
      } catch (error) {
        console.error('Error taking photo:', error);
        navigation.navigate('ErrorResults');
      }
    }
  };

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

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  if (!permission.granted) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraType}
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={require('../assets/logo.png')} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        <Text style={styles.scanningText}>Scanning...</Text>

        <TouchableOpacity onPress={pickImage} style={styles.galleryButton}>
          <Image source={require('../assets/gallery-icon.png')} style={styles.galleryIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
          style={styles.flipButton}
        >
          <MaterialIcons name="flip-camera-ios" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={takePicture} style={styles.scanButton}>
          <MaterialIcons name="camera" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 5,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 5,
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
    color: '#4CAF50',
  },
  scanningText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D9534F',
    textAlign: 'center',
  },
  galleryButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 10,
  },
  galleryIcon: {
    width: 30,
    height: 30,
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    right: 80,
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 10,
  },
  scanButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 10,
  },
});

export default ScannerScreen;