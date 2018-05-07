import i18n from 'i18next';
import {AsyncStorage} from 'react-native';
import Expo, {DangerZone} from 'expo';
import en from './en.json';
import de from './de.json';
import ru from './ru.json';

const languageDetector = {
    type: 'languageDetector',
    async: true, // async detection
    detect: (cb) => {
        return DangerZone.Localization.getCurrentLocaleAsync()
            .then(async (lang) => {
                // checking the 'curLang' key in AsyncStorage, if it's empty - setting lang
                let curLang = await AsyncStorage.getItem('curLang');

                if (!curLang) {
                    AsyncStorage.setItem('curLang', curLang);
                }

                cb(lang);
            })
    },
    init: () => {
    },
    cacheUserLanguage: () => {
    }
};

i18n
    .use(languageDetector)
    .init({
        fallbackLng: 'en',
        // the translations
        resources: {
            en,
            de,
            ru,
            // have an initial namespace
            ns: ['translation'],
            defaultNS: 'translation',
            interpolation: {
                escapeValue: false
            }
        }
    });

export default i18n;