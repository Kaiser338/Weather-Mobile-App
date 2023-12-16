import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const WeatherScreen = ({ route }) => {
  const [weatherData, setWeatherData] = useState(null);
  const { location } = route.params;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=e115ad270b394ab184d144754231612&q=${location}&aqi=no`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View>
          <Text>{`${t('Location')}: ${weatherData.location.name}`}</Text>
          <Text>{`${t('Temperature')}: ${weatherData.current.temp_c}°C`}</Text>
          <Text>{`${t('Condition')}: ${weatherData.current.condition.text}`}</Text>
          <Text>{`${t('WindSpeed')}: ${weatherData.current.wind_kph} kph`}</Text>
          <Text>{`${t('Humidity')}: ${weatherData.current.humidity}%`}</Text>
          <Text>{`${t('Pressure')}: ${weatherData.current.pressure_mb} mb`}</Text>
        </View>
      ) : (
        <Text>{t('Loading')}</Text>
      )}
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
