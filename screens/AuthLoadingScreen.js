import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import {connect} from 'react-redux';

import {populateData} from '../actions/user_actions';
import {populateSettings} from '../actions/settings_actions';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            // clearing out all AsyncStorage...
            // TODO: remove this line of code on production!
            //await AsyncStorage.clear(); // do not use this statement it causes crashes
            await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);

            // checking whether the user is authenticated
            const user = await AsyncStorage.getItem('user'); // will be a JSON string OR null

            // if authenticate, then navigating him to the application's home screen
            // otherwise showing signin screen
            if (user) {
                // user already authenticated...

                // populating user's data from AsyncStorage to Redux store
                const userData = JSON.parse(user);
                this.props.populateData(userData);

                // fetching user's settings, curLang in particular
                const settings = await AsyncStorage.getItem('settings');

                // populating settings data from AsyncStorage to Redux store
                const settingsData = JSON.parse(settings);

                this.props.populateSettings(settingsData);

                this.props.navigation.navigate('App');
            } else {
                // not authenticated... taking him to appropriate screen
                this.props.navigation.navigate('Auth');
            }
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

function mapStateToProps(state) {
    return state;
}

export default connect(null, {populateData, populateSettings})(AuthLoadingScreen);