import {LOG_OUT, LOGIN_SUCCESS} from './types';

export const logIn = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
};

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};