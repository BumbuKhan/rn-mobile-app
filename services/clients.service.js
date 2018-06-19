function handleResponse(response) {
    return response.json().then(data => {
        if (!response.success) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                console.log('Unauthenticated');
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}