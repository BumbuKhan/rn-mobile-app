import {
    TOGGLE_ACTIVE_PROJECT_TYPE,
    CREATE_ACTIVE_PROJECT,
    REMOVE_ACTIVE_PROJECT,
    ACTIVE_PROJECT_TOGGLE_TIMER
} from '../actions/types';

const INITIAL_STATE = {
    type: 'STN',
    isCreated: false,
    isTimerActive: true
};

export default activeProjectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_ACTIVE_PROJECT_TYPE:
            return {...state, type: action.payload};

        case CREATE_ACTIVE_PROJECT:
            return {...state, isCreated: true};

        case REMOVE_ACTIVE_PROJECT:
            return INITIAL_STATE;

        case ACTIVE_PROJECT_TOGGLE_TIMER:
            return {...state, isTimerActive: action.payload};

        default:
            return state;
    }
}