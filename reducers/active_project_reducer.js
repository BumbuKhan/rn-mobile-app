import moment from 'moment';

import {
    TOGGLE_ACTIVE_PROJECT_TYPE,
    CREATE_ACTIVE_PROJECT,
    REMOVE_ACTIVE_PROJECT,
    ACTIVE_PROJECT_TOGGLE_TIMER,
    ACTIVE_PROJECT_UPDATE_TIMER,
    ACTIVE_PROJECT_ADD_PHOTOS,
    ACTIVE_PROJECT_REMOVE_PHOTO,
    ACTIVE_PROJECT_CLEAN,
    REHYDRATE_PROJECT
} from '../actions/types';

const INITIAL_STATE = {
    id: null,
    type: null,
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
    vastedTime: 0, // in seconds, counter for time,
    /*
    'photos' is an array with such structure:
        [
            {
                "base64": "qwew876q6e7q87e6q...qweqweqwe"
                "height": 200,
                "width": 200,                                            
                "uri": "file:///Users/macbook/Library/Developer/Co...38218BE21AC.jpg"
            },
            ...
        ]
    */
    photos: [],
    createdAt: null,
    modifiedAt: null
};

export default activeProjectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_ACTIVE_PROJECT_TYPE:
            return { ...state, type: action.payload };

        case CREATE_ACTIVE_PROJECT:
            const now = moment().unix();

            const newProject = {
                ...state,
                id: getUniqueId(),
                isCreated: true,
                createdAt: now,
                modifiedAt: now
            };

            return newProject;

        // this case will be removed, most likely
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

            return { ...state, ...newState };

        case ACTIVE_PROJECT_UPDATE_TIMER:
            let _vastedTime = 0;

            // looping through all state.timers and calculating deltas between stoppedAt - startedAt
            state.timers.map((timer) => {
                let stoppedAt = (timer.stoppedAt) ? timer.stoppedAt : moment().unix();

                let deltaSeconds = stoppedAt - timer.startedAt;
                _vastedTime += deltaSeconds;
            });

            return { ...state, vastedTime: _vastedTime };

        case ACTIVE_PROJECT_ADD_PHOTOS:
            // getting existing photos...
            const existingPhotos = [...state.photos];

            // adding new portion to the existing...
            const newPhotos = [...existingPhotos, ...action.payload];

            // returning new state after merge
            return { ...state, photos: newPhotos };

        case ACTIVE_PROJECT_REMOVE_PHOTO:
            // getting existing photos...
            const photos = [...state.photos];

            // removing the specified photo
            const afterRemove = photos.filter((photo, i) => i !== action.payload);

            return { ...state, photos: afterRemove };

        case ACTIVE_PROJECT_CLEAN:
            // cleaning out the activeProject key in redux store
            return INITIAL_STATE;

        case REHYDRATE_PROJECT:
            return action.payload;
        default:
            return state;
    }
}

function getUniqueId() {
    const id = moment().unix();

    return id;
}