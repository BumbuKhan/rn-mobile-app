import {AsyncStorage} from 'react-native';
import axios from 'axios';

import {LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, POPULATE_USER_DATA_FROM_ASYNC_STORAGE} from './types';
import {AUTH} from '../services/api_endpoints';

export const logIn = (login, password) => {
    // since this action will take some none zero amount of time
    // we'll wrap it to the function so redux-thunk middleware will take care of the rest
    return async function (dispatch) {

        // let's see if user has already been authenticated
        let user = await AsyncStorage.getItem('user');

        if (user) {
            // yep!, authenticated :-), dispatching a success login action
            dispatch({
                type: LOGIN_SUCCESS,
                payload: JSON.parse(user)
            });
        } else {
            // not authenticated yet :-(, trying to log him in
            await doLogin(login, password, dispatch);
        }
    }
};

// helper function to log the user in
const doLogin = async (login, password, dispatch) => {
    // making a post request to auth endpoint...
    let response = await axios.post(AUTH, {
        login,
        password
    });

    if (!response.success) {
        // authentication failed, incorrect login or password, most likely...
        return dispatch({
            type: LOGIN_FAIL,
            payload: response.message
        });
    }

    // if we've reached this line of code then everything is ok - user has been successfully signed in

    // NOTE: 'data' & 'user' keys will be agreed with the backend developers who are responsible for API endpoints
    //const user = response.data.user;

    // WARNING! JUST FOR NOW IMITATING HTTP RESPONSE...
    const user = {
        name: 'Gurban',
        email: 'qurban.qurbanov93@gmail.com',
    };

    // saving token to the AsyncStorage so user wont be asked to enter his credentials every time the app is launched
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // NOTE: we terminate 'user' once the user signs out

    // and finally dispatching success action
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    });
};

export const logOut = () => {
    // since this action will take some none zero amount of time
    // we'll wrap it to the function so redux-thunk middleware will take care of the rest
    return async function (dispatch) {
        await AsyncStorage.setItem('user', '');

        dispatch({
            type: LOG_OUT
        });
    }
};

export const populateData = (data) => {
    return {
        type: POPULATE_USER_DATA_FROM_ASYNC_STORAGE,
        payload: data
    };
};