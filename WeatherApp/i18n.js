import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl-pluralrules';

const resources = {
  en: {
    translation: require('./locales/en.json'),
  },
  pl: {
    translation: require('./locales/pl.json'),
  },
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        const selectedLanguage = storedLanguage || 'en';
  
        callback(selectedLanguage);
      } catch (error) {
        console.error('Error detecting language:', error);
        callback('en'); 
      }
    },
    init: () => {}, 
    cacheUserLanguage: async (lng) => {
      try {
        await AsyncStorage.setItem('language', lng);
      } catch (error) {
        console.error('Error caching user language:', error);
      }
    },
  };

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
