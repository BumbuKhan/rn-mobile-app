import {ADD_PROJECT} from '../actions/types';

const INITIAL_STATE = [];

export default projectsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return [...state, action.payload];

        default:
            return state;
    }
}