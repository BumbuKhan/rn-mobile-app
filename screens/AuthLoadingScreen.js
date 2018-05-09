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
            // clearing out all AsyncStorage...
            // TODO: remove this line of code on production!
            await AsyncStorage.clear();

            // checking whether the user is authenticated
            const user = await AsyncStorage.getItem('user'); // will be a JSON string OR null

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