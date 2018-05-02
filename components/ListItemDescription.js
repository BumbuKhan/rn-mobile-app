import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ListItemDescription extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5
    },
    text: {
        color: 'grey'
    }
});