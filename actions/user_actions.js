import {LOG_OUT, POPULATE_USER_DATA_FROM_ASYNC_STORAGE} from './types';

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};

// this actionCreator is called when user signs in to his account
// we're taking all user's data from API and pushing them to the redux store after saving to the AsyncStorage
export const populateData = (data) => {
    return {
        type: POPULATE_USER_DATA_FROM_ASYNC_STORAGE,
        payload: data
    };
};