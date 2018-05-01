import React, {Component} from 'react';
import {View, Button, AsyncStorage} from 'react-native';

export default class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Sign in'
    };

    _signInAsync = async () => {
        await AsyncStorage.setItem('authToken', 'some secret token');
        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button
                    title="Sign me in"
                    onPress={this._signInAsync}
                />
                <Button
                    title="Restore password"
                    onPress={() => this.props.navigation.navigate('RestorePassword')}
                />
            </View>
        );
    }
}