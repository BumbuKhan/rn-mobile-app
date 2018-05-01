import React, {Component} from 'react';
import {View, Text, AsyncStorage, Button} from 'react-native';

export default class SettingsScreen extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Settings screen</Text>
            </View>
        );
    };
}