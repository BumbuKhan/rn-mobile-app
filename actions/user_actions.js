import {LOG_OUT, LOGIN_SUCCESS} from './types';
import {AsyncStorage} from "react-native";

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