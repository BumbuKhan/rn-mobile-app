import {
    TOGGLE_ACTIVE_PROJECT_TYPE,
    CREATE_ACTIVE_PROJECT,
    REMOVE_ACTIVE_PROJECT,
    ACTIVE_PROJECT_TOGGLE_TIMER,
} from './types';

export const toggleType = (type) => {
    return {
        type: TOGGLE_ACTIVE_PROJECT_TYPE,
        payload: type
    }
};

export const createProject = () => {
    return {
        type: CREATE_ACTIVE_PROJECT
    }
};

export const removeProject = () => {
    return {
        type: REMOVE_ACTIVE_PROJECT
    }
};

export const toggleTimer = (state) => {
    return {
        type: ACTIVE_PROJECT_TOGGLE_TIMER,
        payload: state
    }
};