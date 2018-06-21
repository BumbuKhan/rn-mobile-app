import { Alert } from 'react-native';
import { clientsService } from '../services';
import { authHeader } from '../helpers';

import {
    FETCH_CLIENTS_PROJECTS_PENDING,
    FETCH_CLIENTS_PROJECTS_RESOLVED,
    FETCH_CLIENTS_PROJECTS_REJECTED
} from './types';

export const fetchClientsProjects = (clientId) => {
    console.log('fetching clients projects...');

    return (dispatch) => {
        // turning on loading spinner
        dispatch(fetchClientsProjectsPending());

        clientsService.getClientsProjects(clientId)
            .then(
                clientsProjects => {
                    let { data } = clientsProjects;

                    console.log('clientsProjects', clientsProjects);

                    // formatting received data
                    data = data.map((project) => {
                        return {
                            id: project.id,
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
    function fetchClientsProjectsPending() { return { type: FETCH_CLIENTS_PROJECTS_PENDING } }

    // will be dispatched when error
    function fetchClientsProjectsRejected(err) { return { type: FETCH_CLIENTS_PROJECTS_REJECTED, payload: err } }

    // will be dispatched when success
    function fetchClientsProjectsResolved(clientsProjects) { return { type: FETCH_CLIENTS_PROJECTS_RESOLVED, payload: clientsProjects } }
}
