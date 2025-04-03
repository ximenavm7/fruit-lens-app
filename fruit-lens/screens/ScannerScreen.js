import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const ScannerScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions(); // Hook para manejar permisos
  const [cameraType, setCameraType] = useState('back'); // 'back' o 'front'
  const [isScanning, setIsScanning] = useState(true);

  // Solicitar permisos de la cámara al montar el componente
  useEffect(() => {
    if (!permission) {
      // Permisos aún no han sido solicitados
      requestPermission();
    } else if (!permission.granted) {
      alert('Camera permission is required to scan fruits.');
      navigation.navigate('Home');
    }
  }, [permission, requestPermission, navigation]);

  // Función para tomar una foto y simular la detección de frutas
  const takePicture = async () => {
    if (cameraRef.current && isScanning) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        // Aquí procesamos la foto con visión artificial más adelante
        // Por ahora, simulamos una detección
        const detectedFruit = {
          fruit: 'Apple',
          image: require('../assets/manzana.png'),
          status: 'Ripe',
          daysLeft: 5,
          recipes: ['Apple pie', 'Apple slices', 'Apple juice'],
        };

        setIsScanning(false); // Detener el escaneo tras la detección
        navigation.navigate('FruitResults', detectedFruit);
      } catch (error) {
        console.error('Error taking photo:', error);
        navigation.navigate('ErrorResults');
      }
    }
  };

  // Si no hay permisos, mostrar mensaje
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
        facing={cameraType} // Usar 'facing' en lugar de 'type'
      />
      <View style={styles.innerContainer}>
        {/* Botón "Go Back" */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={require('../assets/logo.png')} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        {/* Texto "Scanning..." */}
        <Text style={styles.scanningText}>Scanning...</Text>

        {/* Botón para abrir la galería */}
        <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.galleryButton}>
          <Image source={require('../assets/gallery-icon.png')} style={styles.galleryIcon} />
        </TouchableOpacity>

        {/* Botón para cambiar el tipo de cámara (trasera/frontal) */}
        <TouchableOpacity
          onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
          style={styles.flipButton}
        >
          <MaterialIcons name="flip-camera-ios" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Botón para tomar la foto */}
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