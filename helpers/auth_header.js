import { AsyncStorage } from 'react-native';

// use it for endpoints that require auth token
export async function getAuthHeaders() {
    let persistedData = await AsyncStorage.getItem('persist:root');

    persistedData = JSON.parse(persistedData);
    const user = JSON.parse(persistedData.user);

    if (user && user.token.access_token) {
        return {
            'Authorization': 'Bearer ' + user.token.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    } else {
        return {};
    }
}

// use it for endpoints that do not require auth token
export async function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}