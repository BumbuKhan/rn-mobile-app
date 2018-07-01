import { Alert } from 'react-native';
import { tasksService } from '../services';
import { authHeader } from '../helpers';

import {
    FETCH_PROJECT_TASKS_PENDING,
    FETCH_PROJECT_TASKS_RESOLVED,
    FETCH_PROJECT_TASKS_REJECTED
} from './types';

export const fetchProjectTasks = (project_id) => {
    console.log('fetching project tasks...');

    return (dispatch) => {
        // turning on loading spinner
        dispatch(fetchProjectTasksPending());

        tasksService.getProjectTasks(project_id)
            .then(
                tasks=> {
                    let { data } = tasks;

                    console.log('fetched tasks', data);

                    // sending fetched data to redux store
                    dispatch(fetchProjectTasksResolved(data));
                },
                error => {
                    // something went wrong...
                    dispatch(fetchProjectTasksRejected(error));
                }
            )
    }

    // for displaying a loading spinner
    function fetchProjectTasksPending() { return { type: FETCH_PROJECT_TASKS_PENDING } }

    // will be dispatched when error
    function fetchProjectTasksRejected(err) { return { type: FETCH_PROJECT_TASKS_REJECTED, payload: err } }

    // will be dispatched when success
    function fetchProjectTasksResolved(data) { return { type: FETCH_PROJECT_TASKS_RESOLVED, payload: data } }
}
