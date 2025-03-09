import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
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
                onPress={() => navigation.navigate('Gallery')}
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
    backgroundColor: '#4CAF50', // Fondo verde
    padding: 5,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center', // 🔹 Esto centra el contenido verticalmente
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
