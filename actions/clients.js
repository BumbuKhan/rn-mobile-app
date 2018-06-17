import axios from '../helpers/axios';

import {
    UPDATE_CLIENTS
} from './types';

export const updateClients = (clients) => {
    return {
        type: UPDATE_CLIENTS,
        payload: clients
    }
}