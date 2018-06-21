import { getAuthHeaders } from '../helpers';
import { CLIENTS } from '../helpers/api_endpoints';

export const clientsService = {
    getClients,
    getClientsProjects
};

async function getClients() {
    const headers = await getAuthHeaders();

    const requestOptions = {
        method: 'GET',
        headers
    };

    return fetch(CLIENTS, requestOptions).then(handleResponse);

}

async function getClientsProjects(clientId) {
    const headers = await getAuthHeaders();

    const requestOptions = {
        method: 'GET',
        headers
    };

    return fetch(`${CLIENTS}/${clientId}/projects`, requestOptions).then(handleResponse);

}

function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log('unauthorised...');
                // TODO: call logOut action and navigate user to login screen
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}