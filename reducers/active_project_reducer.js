import {TOGGLE_ACTIVE_PROJECT_TYPE} from '../actions/types';

const INITIAL_STATE = {
    type: 'STN'
};

export default activeProjectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_ACTIVE_PROJECT_TYPE:
            return {...state, type: action.payload};

        default:
            return state;
    }
}