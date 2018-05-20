import React, {Component} from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View
} from 'react-native';
import {connect} from 'react-redux';

import i18n from '../../locales/i18n';
import {logIn} from '../../actions';

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
            //await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);

            // trying to get user data from redux store...
            // redux store will be rehydrated due to redux-persist middleware
            const {user} = this.props;

            // if authenticate, then navigating him to the application's home screen
            // otherwise showing signin screen
            if (user) {
                // authenticated...

                // setting up app language
                i18n.changeLanguage(user.language);

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

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps, {logIn})(AuthLoadingScreen);