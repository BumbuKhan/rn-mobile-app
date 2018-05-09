import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import {logIn} from '../actions/user_actions';

class SignInScreen extends Component {
    handleSignIn = async () => {
        // TODO: do an HTTP request to auth endpoint
        const user = {
            name: 'Gurban',
            email: 'qurban.qurbanov93@gmail.com',
        };

        // if successfully authenticated then remember it
        await AsyncStorage.setItem('user', JSON.stringify(user));

        // and navigate user to the app's home screen
        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Sign in form goes here...</Text>
                <Button
                    title="Sign in"
                    onPress={this.handleSignIn}
                />
                <Text>-------------------------</Text>
                <Button
                    title="Restore password"
                    onPress={() => this.props.navigation.navigate('RestorePassword')}
                />
            </View>
        );
    }
}

export default connect(null, {logIn})(SignInScreen);