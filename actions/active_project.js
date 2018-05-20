import {TOGGLE_ACTIVE_PROJECT_TYPE, CREATE_ACTIVE_PROJECT} from './types';

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