import { AsyncStorage } from 'react-native';

export async function authHeader() {
    let persistedData = await AsyncStorage.getItem('persist:root');

    persistedData = JSON.parse(persistedData);
    const user = JSON.parse(persistedData.user);

    if (user && user.token.access_token) {
        return {
            headers: { 'Authorization': 'Bearer ' + user.token.access_token }
        };
    } else {
        return {};
    }
}