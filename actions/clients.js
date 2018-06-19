import { Alert } from 'react-native';
import axios from '../helpers/axios';
import { CLIENTS } from '../helpers/api_endpoints';
import { getClients } from '../services';
import { authHeader } from '../helpers';

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
            const response = await getClients();

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
        catch (error) {
            console.log('error while fetching clients...', error);

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    // unauthorized
                    // TODO: need to be implemented
                } else {
                    // server error...
                    Alert.alert(
                        'Something went wrong',
                        'Please try later',
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                }
            } else if (error.request) {
                // No internet connection...
                Alert.alert(
                    'No Internet Connection',
                    'Please male sure that you have got an Internet connection',
                    [
                        {
                            text: 'OK', onPress: () => {
                            }
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

            dispatch(fetchClientsRejected(error));
        }
    }
}