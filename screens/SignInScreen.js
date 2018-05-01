import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';

export default class SignInScreen extends Component {
    handleSignIn = async () => {
        // TODO: do an HTTP request to auth endpoint

        // if successfully authenticated then remember it
        await AsyncStorage.setItem('authToken', 'some super secret token');

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
                <Button
                    title="Sign up here"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}