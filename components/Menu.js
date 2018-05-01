import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Menu extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('DrawerOpen');
                }}
            >
                <Icon
                    name="menu"
                    color="white"
                />
            </TouchableOpacity>
        );
    }
}