import { UPDATE_CLIENTS } from '../actions/types';

const INITIAL_STATE = [];

export default clientsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CLIENTS:
            return action.payload;

        default:
            return state;
    }
}