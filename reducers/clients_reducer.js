import {
    FETCH_CLIENTS_PENDING,
    FETCH_CLIENTS_RESOLVED,
    FETCH_CLIENTS_REJECTED
} from '../actions/types';

const INITIAL_STATE = {
    pending: false,
    items: [],
    error: null
};

export default clientsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_PENDING:
            return {
                ...state,
                pending: true,
                items: []
            }

        case FETCH_CLIENTS_RESOLVED:
            return {
                ...state,
                pending: false,
                items: action.payload
            }

        case FETCH_CLIENTS_REJECTED:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}