import {LOG_OUT, LOGIN_SUCCESS, TOGGLE_CUR_LANG} from './types';
import {AsyncStorage} from "react-native";
import i18n from "../locales/i18n";

export const logIn = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
};

export const logOut = () => {
    return async function(dispatch) {
        // removing whole user key from the AsyncStorage
        await AsyncStorage.setItem('user', '');

        dispatch({
            type: LOG_OUT
        });
    }
};

export const setCurLang = (lang) => {
    // since this action will take some none zero amount of time
    // we'll wrap it to the function so redux-thunk middleware will take care of the rest
    return async function (dispatch) {
        i18n.changeLanguage(lang, (err, t) => {
            if (err) {
                console.log(err);
            } else {
                dispatch({
                    type: TOGGLE_CUR_LANG,
                    payload: lang
                });
            }
        });
    }
};