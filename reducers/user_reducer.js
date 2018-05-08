import {LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT} from '../actions/types';

const INITIAL_STATE = null;

export default authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {token: action.payload};

        case LOGIN_FAIL:
            return INITIAL_STATE;

        case LOG_OUT:
            return INITIAL_STATE;

        default:
            return state;
    }
}