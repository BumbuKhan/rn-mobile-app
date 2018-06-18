import axios from '../helpers/axios';
import { CLIENTS } from '../helpers/api_endpoints';

import {
    FETCH_CLIENTS_PENDING,
    FETCH_CLIENTS_RESOLVED,
    FETCH_CLIENTS_REJECTED
} from './types';

// for displaying a loading spinner
const fetchClientsPending = () => {
    return {
        type: FETCH_CLIENTS_PENDING
    }
}

// will be dispatched when error
const fetchClientsRejected = (err) => {
    return {
        type: FETCH_CLIENTS_REJECTED,
        payload: err
    }
}

// will be dispatched when success
const fetchClientsResolved = (clients) => {
    return {
        type: FETCH_CLIENTS_RESOLVED,
        payload: clients
    }
}

// making an HTTP request...
export const fetchClients = () => {
    console.log('fetching clients...');
    return async (dispatch) => {
        // turning on loading spinner
        dispatch(fetchClientsPending());

        // fetching data from the API
        try {
            const response = await axios.get(CLIENTS);
            let { data } = response.data;

            // formatting received data
            data = data.map((client) => {
                return {
                    id: client.id,
                    searchKey: client.id,
                    searchStr: client.company_name,
                    address: client.address
                }
            });

            dispatch(fetchClientsResolved(data));
        }
        catch (err) {
            dispatch(fetchClientsRejected(err));
        }
    }
}