import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ListItemTitle extends Component {
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
        padding: 20,
        paddingBottom: 5
    },
    text: {
        color: 'grey'
    }
});