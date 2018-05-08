import {AsyncStorage} from 'react-native';

import {TOGGLE_CUR_LANG, SIGN_OUT} from './types';
import i18n from '../locales/i18n';

export const setCurLang = (lang) => {
    // since this action will take some none zero amount of time
    // we'll wrap it to the function so redux-thunk middleware will take care of the rest
    return async function (dispatch) {
        // getting whatever sits in settings
        const settings = await AsyncStorage.getItem('settings');

        // replacing 'curLang' key
        let newSettings = {...JSON.parse(settings), curLang: lang};

        // saving settings back to AsyncStorage
        await AsyncStorage.setItem('settings', JSON.stringify(newSettings));

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