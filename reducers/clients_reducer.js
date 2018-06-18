import {
    FETCH_CLIENTS_PENDING,
    FETCH_CLIENTS_RESOLVED,
    FETCH_CLIENTS_REJECTED
} from '../actions/types';

const INITIAL_STATE = {
    pending: false,
    fetched: false,
    items: [],
    error: null
};

export default clientsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_PENDING:
            return {
                ...state,
                pending: true,
                fetched: false,
                items: []
            }

        case FETCH_CLIENTS_RESOLVED:
            return {
                ...state,
                pending: false,
                fetched: true,                
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