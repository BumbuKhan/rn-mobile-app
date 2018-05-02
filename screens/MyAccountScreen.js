import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

import Menu from '../components/Menu';

export default class MyAccountScreen extends Component {
    static navigationOptions = {
        title: 'Settings'
    };

    render() {
        return (
            <View>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: 'Settings', style: {color: '#fff', fontSize: 20}}}
                />
            </View>
        );
    };
}