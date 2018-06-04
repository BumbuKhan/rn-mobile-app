import {
    ADD_PROJECT,
    REMOVE_PROJECT
} from './types';

export const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        payload: project
    }
};

export const deleteProject = (id) => {
    return {
        type: REMOVE_PROJECT,
        payload: id
    }
};
