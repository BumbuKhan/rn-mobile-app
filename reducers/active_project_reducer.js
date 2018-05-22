import moment from 'moment';

import {
    TOGGLE_ACTIVE_PROJECT_TYPE,
    CREATE_ACTIVE_PROJECT,
    REMOVE_ACTIVE_PROJECT,
    ACTIVE_PROJECT_TOGGLE_TIMER,
    ACTIVE_PROJECT_UPDATE_TIMER
} from '../actions/types';

const INITIAL_STATE = {
    type: 'STN',
    isCreated: false,
    isTimerActive: false,
    // 'timers' key will have such structure:
    /*
        timers: [
            {
                startedAt: <UNIX timestamp>,
                stoppedAt: <UNIX timestamp>
            },
            ...
        ]
    */
    timers: [],
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
                // user starts time tracking - adding new object to state.timers
                let curTimers = [...state.timers];

                const newTimer = {
                    startedAt: moment().unix(),
                    stoppedAt: null // hasn't been stopped yet
                };

                curTimers.push(newTimer);
                newState.timers = curTimers;
            } else {
                // user stops timer - getting the last timer and updating it's 'stoppedAt' key
                let curTimers = [...state.timers];

                const lastTimer = curTimers[curTimers.length - 1];
                lastTimer.stoppedAt = moment().unix();

                newState.timers = curTimers;
            }

            return {...state, ...newState};

        case ACTIVE_PROJECT_UPDATE_TIMER:
            return state;

        default:
            return state;
    }
}