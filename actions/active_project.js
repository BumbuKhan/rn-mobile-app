import {TOGGLE_ACTIVE_PROJECT_TYPE} from './types';

export const toggleType = (type) => {
    return {
        type: TOGGLE_ACTIVE_PROJECT_TYPE,
        payload: type
    }
};