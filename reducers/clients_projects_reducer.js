import {
    FETCH_CLIENTS_PROJECTS_PENDING,
    FETCH_CLIENTS_PROJECTS_RESOLVED,
    FETCH_CLIENTS_PROJECTS_REJECTED
} from '../actions/types';

const INITIAL_STATE = {
    pending: false,
    items: [],
    error: null
};

export default clientsProjectsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_PROJECTS_PENDING:
            return {
                ...state,
                pending: true,
                items: []
            }

        case FETCH_CLIENTS_PROJECTS_RESOLVED:
            return {
                ...state,
                pending: false,
                items: action.payload
            }

        case FETCH_CLIENTS_PROJECTS_REJECTED:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}