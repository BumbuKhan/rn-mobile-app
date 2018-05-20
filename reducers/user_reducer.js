import {LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, TOGGLE_CUR_LANG} from '../actions/types';

const INITIAL_STATE = null;

export default userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.payload;

        case LOGIN_FAIL:
            return INITIAL_STATE;

        case LOG_OUT:
            return INITIAL_STATE;

        case TOGGLE_CUR_LANG:
            return {...state, language: action.payload};

        default:
            return state;
    }
}