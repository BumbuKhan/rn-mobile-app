import {
    FETCH_CLIENT_PROJECTS_PENDING,
    FETCH_CLIENT_PROJECTS_RESOLVED,
    FETCH_CLIENT_PROJECTS_REJECTED
} from '../actions/types';

const INITIAL_STATE = {
    pending: false,
    items: [],
    error: null
};

export default projectTasksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CLIENT_PROJECTS_PENDING:
            return {
                ...state,
                pending: true,
                items: []
            }

        case FETCH_CLIENT_PROJECTS_RESOLVED:
            const items = action.payload.map((task) => ({
                id: task.id,
                searchStr: task.name,
                details: task.name,
            }));

            return {
                ...state,
                pending: false,
                items
            }

        case FETCH_CLIENT_PROJECTS_REJECTED:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}