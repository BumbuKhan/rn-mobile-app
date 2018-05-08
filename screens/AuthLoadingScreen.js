import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

import i18n from '../locales/i18n';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            // if this app is running at the very first time the curLang will be equal to NULL
            // in this case i18next package will setup system lang as default
            // otherwise app's language will be restore from the storage
            let curLang = await AsyncStorage.getItem('curLang');

            if (curLang) {
                i18n.changeLanguage(curLang);
            }

            // checking whether the user is authenticated
            const userToken = await AsyncStorage.getItem('authToken');

            // if authenticate, then navigating him to the application's home screen
            // otherwise showing signin screen
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}