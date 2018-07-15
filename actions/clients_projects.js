import { Alert } from 'react-native';
import { clientsService } from '../services';
import { authHeader } from '../helpers';

import {
    FETCH_CLIENT_PROJECTS_PENDING,
    FETCH_CLIENT_PROJECTS_RESOLVED,
    FETCH_CLIENT_PROJECTS_REJECTED,
    SELECT_CLIENT_PROJECT
} from './types';

export const fetchClientsProjects = () => {
    console.log('fetching clients projects...');

    return (dispatch) => {
        // turning on loading spinner
        dispatch(fetchClientsProjectsPending());

        clientsService.getClientsProjects()
            .then(
                clientsProjects => {
                    let { data } = clientsProjects;

                    // formatting received data
                    data = data.map((project) => {
                        console.log(project);
                        return {
                            admin_notes: project.admin_notes,
                            category_id: project.category_id,
                            created_at: project.created_at,
                            deadline_at: project.deadline_at,
                            taxonomy_id: project.taxonomy_id,
                            user_notes: project.user_notes,
                            id: project.id,
                            client_id: project.client_id,
                            searchKey: project.id,
                            searchStr: project.name
                        }
                    });

                    // sending fetched data to redux store
                    dispatch(fetchClientsProjectsResolved(data));
                },
                error => {
                    // something went wrong...
                    dispatch(fetchClientsProjectsRejected(error));
                }
            )
    }

    // for displaying a loading spinner
    function fetchClientsProjectsPending() { return { type: FETCH_CLIENT_PROJECTS_PENDING } }

    // will be dispatched when error
    function fetchClientsProjectsRejected(err) { return { type: FETCH_CLIENT_PROJECTS_REJECTED, payload: err } }

    // will be dispatched when success
    function fetchClientsProjectsResolved(data) { return { type: FETCH_CLIENT_PROJECTS_RESOLVED, payload: data } }
}

export const selectProject = (project) => {
    return {
        type: SELECT_CLIENT_PROJECT,
        payload: project
    }
}