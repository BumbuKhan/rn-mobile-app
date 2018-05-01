import {LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/types';

const INITIAL_STATE = {
    token: null
};

export default authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {token: action.payload};

        case LOGIN_FAIL:
            return INITIAL_STATE;

        default:
            return state;
    }
}