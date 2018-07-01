import { getAuthHeaders } from '../helpers';
import { CLIENTS_PROJECTS } from '../helpers/api_endpoints';

export const clientsService = {
    getProjectTasks,
};

async function getProjectTasks(project_id) {
    const headers = await getAuthHeaders();

    const requestOptions = {
        method: 'GET',
        headers
    };

    return fetch(`${CLIENTS_PROJECTS}/${project_id}/jobs`, requestOptions).then(handleResponse);

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