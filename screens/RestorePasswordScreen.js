import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';

export default class RestorePasswordScreen extends Component {
    static navigationOptions = {
        title: 'Restore Password'
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Restoring the password...</Text>
                <Button
                    title="Back to login screen"
                    onPress={() => this.props.navigation.navigate('SignIn')}
                />
            </View>
        );
    }
}