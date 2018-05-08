import {TOGGLE_CUR_LANG} from '../actions/types';

const INITIAL_STATE = null;

export default curLangReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_CUR_LANG:
            return action.payload;

        default:
            return state;
    }
}