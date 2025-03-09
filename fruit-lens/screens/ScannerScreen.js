import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScannerScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Redirigir a la pantalla de resultados después de 5 segundos
    const timer = setTimeout(() => {
        //const detectedFruit = null; // Simulación: IA no detectó una fruta
        const detectedFruit = true; // Simulación: IA detecta bien la fruta

        if (detectedFruit) {
            navigation.navigate('FruitResults', { // Envía datos dinámicos a la pantalla de resultados
                fruit: 'Apple',
                image: require('../assets/manzana.png'),
                status: 'Ripe',
                daysLeft: 5,
                recipes: ['Apple pie', 'Apple slices', 'Apple juice'],
            });
      /*navigation.navigate('FruitResults', {
        fruit: detectedFruit.name,
        image: require(`../assets/${detectedFruit.image}`),
        status: detectedFruit.status,
        daysLeft: detectedFruit.daysLeft,
        recipes: detectedFruit.recipes,
      });*/
    } else {
        navigation.navigate('ErrorResults');
      }
    }, 5000);;

    return () => clearTimeout(timer); // Limpia el temporizador si el usuario navega antes
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Botón "Go Back" con icono */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={require('../assets/logo.png')} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        {/* Texto "Scanning..." centrado */}
        <Text style={styles.scanningText}>Scanning...</Text>

        {/* Botón para abrir la galería en la esquina inferior izquierda */}
        <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.galleryButton}>
          <Image source={require('../assets/gallery-icon.png')} style={styles.galleryIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50', // Fondo verde
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
  scanningText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D9534F',
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
});

export default ScannerScreen;