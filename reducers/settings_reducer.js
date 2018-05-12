import {TOGGLE_CUR_LANG, POPULATE_USER_SETTINGS_FROM_ASYNC_STORAGE} from '../actions/types';

const INITIAL_STATE = null;

export default curLangReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_CUR_LANG:
            return {...state, curLang: action.payload};

        case POPULATE_USER_SETTINGS_FROM_ASYNC_STORAGE:
            return action.payload;

        default:
            return state;
    }
}