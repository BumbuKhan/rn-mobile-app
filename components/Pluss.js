import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Plus extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <Icon
                    name="add"
                    color="white"
                />
            </TouchableOpacity>
        );
    }
}