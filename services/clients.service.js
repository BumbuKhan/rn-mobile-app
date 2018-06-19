import { getAuthHeaders } from '../helpers';
import { CLIENTS } from '../helpers/api_endpoints';

export const clientsService = {
    getClients
};

async function getClients() {
    const headers = await getAuthHeaders();

    const requestOptions = {
        method: 'GET',
        headers
    };

    return fetch(CLIENTS, requestOptions).then(handleResponse);

}

function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log('unauthorised...');
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}