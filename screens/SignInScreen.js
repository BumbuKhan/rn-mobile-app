import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class SignInScreen extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Sign in form goes here...</Text>
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