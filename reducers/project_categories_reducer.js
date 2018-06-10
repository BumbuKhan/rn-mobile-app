import {
    UPDATE_CATEGORIES
} from '../actions/types';

const INITIAL_STATE = [];

export default projectCategoriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES:
            return action.payload;

        default:
            return state;
    }
}