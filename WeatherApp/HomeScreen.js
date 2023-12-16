import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { Orientation } from 'expo-screen-orientation';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);
  const [customLocation, setCustomLocation] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    loadLocations();
    lockScreenOrientation();
  }, []);

  const lockScreenOrientation = () => {
    Dimensions.addEventListener('change', () => {
      if (Dimensions.get('window').height > Dimensions.get('window').width) {
        Orientation.lockAsync(Orientation.PORTRAIT);
      } else {
        Orientation.lockAsync(Orientation.PORTRAIT_UP);
      }
    });
  };

  const loadLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem('locations');
      if (storedLocations !== null) {
        setLocations(JSON.parse(storedLocations));
      }
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const saveLocations = async (updatedLocations) => {
    try {
      await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));
    } catch (error) {
      console.error('Error saving locations:', error);
    }
  };

  const addLocation = (newLocation) => {
    const updatedLocations = [...locations, newLocation];
    setLocations(updatedLocations);
    saveLocations(updatedLocations);
    navigation.navigate('Weather', { location: newLocation });
  };

  const removeLocation = (locationToRemove) => {
    const updatedLocations = locations.filter(
      (location) => location !== locationToRemove
    );
    setLocations(updatedLocations);
    saveLocations(updatedLocations);
  };

  const handleCustomLocation = () => {
    if (customLocation.trim() !== '') {
      const locationExists = locations.includes(customLocation.trim());

      if (!locationExists) {
        addLocation(customLocation.trim());
        setCustomLocation('');
      } 
    }
  };

  return (
    <View style={styles.container}>
      <Text>{t('ChooseLocation')}</Text>
      {locations.map((loc) => (
        <View key={loc} style={styles.locationItem}>
           <Button title={loc} onPress={() => navigation.navigate('Weather', { location: loc })} />
          <Button title={t('Remove')} onPress={() => removeLocation(loc)} />
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder={t('EnterCustomLocation')}
        value={customLocation}
        onChangeText={(text) => setCustomLocation(text)}
      />
      <Button title={t('AddCustomLocation')} onPress={handleCustomLocation} />
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  locationItem:{
    display: 'flex',
    flexDirection: 'row',
  }
});
