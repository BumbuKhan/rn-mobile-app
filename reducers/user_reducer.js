import {LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, POPULATE_USER_DATA_FROM_ASYNC_STORAGE} from '../actions/types';

const INITIAL_STATE = null;

export default authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.payload;

        case LOGIN_FAIL:
            return INITIAL_STATE;

        case LOG_OUT:
            return INITIAL_STATE;

        case POPULATE_USER_DATA_FROM_ASYNC_STORAGE:
            return action.payload;

        default:
            return state;
    }
}