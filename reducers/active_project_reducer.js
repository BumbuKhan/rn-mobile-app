import moment from 'moment';

import {
    TOGGLE_ACTIVE_PROJECT_TYPE,
    CREATE_ACTIVE_PROJECT,
    REMOVE_ACTIVE_PROJECT,
    ACTIVE_PROJECT_TOGGLE_TIMER,
} from '../actions/types';

const INITIAL_STATE = {
    type: 'STN',
    isCreated: false,
    isTimerActive: false,
    startedAt: null, // UNIX timestamp (in seconds), when start button was pressed
    vastedTime: 0, // in seconds, counter for time
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
            const newState = {
                isTimerActive: action.payload
            };

            if (action.payload === true) {
                // user starts time tracking...
                // setting 'startedAt' to current timestamp
                newState.startedAt = moment().unix();
            } else {
                // user stops timer
                // calculating the amount of seconds from last start...
                const deltaSeconds = moment().unix() - state.startedAt;

                // and adding it to 'vastedTime'
                newState.vastedTime = state.vastedTime + deltaSeconds;

                // setting 'startedAt' to null
                newState.startedAt = null;
            }

            return {...state, ...newState};

        default:
            return state;
    }
}