import { AsyncStorage } from 'react-native';

export async function authHeader() {
    let persistedData = await AsyncStorage.getItem('persist:root');

    persistedData = JSON.parse(persistedData);
    const user = JSON.parse(authData.user);

    if (user && user.token.access_token) {
        return { 'Authorization': 'Bearer ' + user.token.access_token };
    } else {
        return {};
    }
}