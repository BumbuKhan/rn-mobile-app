import moment from 'moment';
import {
    ADD_PROJECT,
    REMOVE_PROJECT
} from '../actions/types';

const INITIAL_STATE = [];

export default projectsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            const now = moment().unix();
            action.payload.modifiedAt = now;

            return [...state, action.payload];

        case REMOVE_PROJECT:
            const _projects = [...state];

            return _projects.filter((project) => {
                return project.id != action.payload;
            });

        default:
            return state;
    }
}