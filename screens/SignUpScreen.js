import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class SignUpScreen extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Sig up form goes here...</Text>
                <Button
                    title="Back to login screen"
                    onPress={() => this.props.navigation.navigate('SignIn')}
                />
            </View>
        );
    }
}