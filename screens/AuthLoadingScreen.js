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

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            // clearing out all AsyncStorage...
            // TODO: remove this line of code on production!
            //await AsyncStorage.clear();

            // checking whether the user is authenticated
            const user = await AsyncStorage.getItem('user'); // will be a JSON string OR null

            // if authenticate, then navigating him to the application's home screen
            // otherwise showing signin screen
            if (user) {
                // populating user's data from AsyncStorage to Redux store
                const userData = JSON.parse(user);
                this.props.populateData(userData);

                this.props.navigation.navigate('App');
            } else {
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

export default connect(null, {populateData})(AuthLoadingScreen);