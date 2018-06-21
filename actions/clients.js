import { Alert } from 'react-native';
import { clientsService } from '../services';
import { authHeader } from '../helpers';

import {
    FETCH_CLIENTS_PENDING,
    FETCH_CLIENTS_RESOLVED,
    FETCH_CLIENTS_REJECTED
} from './types';

export const fetchClients = () => {
    console.log('fetching clients...');

    return (dispatch) => {
        // turning on loading spinner
        dispatch(fetchClientsPending());

        clientsService.getClients()
            .then(
                clients => {
                    let { data } = clients;

                    // formatting received data
                    data = data.map((client) => {
                        return {
                            id: client.id,
                            searchKey: client.id,
                            searchStr: client.company_name,
                            address: client.address
                        }
                    });

                    // sending fetched data to redux store
                    dispatch(fetchClientsResolved(data));
                },
                error => {
                    // something went wrong...
                    dispatch(fetchClientsRejected(error));
                }
            )
    }

    // for displaying a loading spinner
    function fetchClientsPending() { return { type: FETCH_CLIENTS_PENDING } }

    // will be dispatched when error
    function fetchClientsRejected(err) { return { type: FETCH_CLIENTS_REJECTED, payload: err } }

    // will be dispatched when success
    function fetchClientsResolved(data) { return { type: FETCH_CLIENTS_RESOLVED, payload: data } }
}
