import React from 'react';
import HomeScreen from './HomeScreen';
import WeatherScreen from './WeatherScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { Dimensions } from 'react-native';
import { Orientation } from 'expo-screen-orientation';

const Stack = createStackNavigator();

const App = () => {

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
                    options={{
                      screenOrientation: ['portrait', 'landscape'],
                    }} />
          <Stack.Screen name="Weather" component={WeatherScreen}
          options={{
            screenOrientation: ['portrait', 'landscape'],
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
