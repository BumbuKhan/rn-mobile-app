import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import {connect} from 'react-redux';

import i18n from '../locales/i18n';
import {setCurLang} from '../actions/settings_actions';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            // if this app is running at the very first time the settings will be equal to NULL
            // in this case i18next package will setup system lang as default
            // otherwise app's language will be restore from the AsyncStorage
            let settings = await AsyncStorage.getItem('settings');

            if (settings) {
                // 'settings' is a json string
                const curLang = JSON.parse(settings).curLang;

                i18n.changeLanguage(curLang);
            }

            // checking whether the user is authenticated
            const user = await AsyncStorage.getItem('user');

            // if authenticate, then navigating him to the application's home screen
            // otherwise showing signin screen
            this.props.navigation.navigate(user ? 'App' : 'Auth');
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

export default connect(null, {setCurLang})(AuthLoadingScreen);