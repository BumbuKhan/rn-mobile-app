import {AsyncStorage} from 'react-native';

import {TOGGLE_CUR_LANG} from './types';
import i18n from '../locales/i18n';

export const setCurLang = (lang) => {
    // since this action will take some none zero amount of time
    // we'll wrap it to the function so redux-thunk middleware will take kare of the rest
    return async function (dispatch) {

        // first of all we should save curLang to AsyncStorage
        await AsyncStorage.setItem('curLang', lang);

        // then do language toggling
        i18n.changeLanguage(lang, (err, t) => {
            if (err) {
                console.log(err);
            } else {
                // and finally dispatch an action
                dispatch({
                    type: TOGGLE_CUR_LANG,
                    payload: lang
                });
            }
        });
    }
};