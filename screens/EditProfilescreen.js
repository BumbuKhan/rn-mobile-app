import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class EditProfileScreen extends Component {
    static navigationOptions = {
        title: 'Edit Profile'
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemMT, styles.listItemBorder]}
                        title="First Name"
                        titleStyle={styles.listItemTitleStyle}
                        subtitleStyle={styles.listItemSubtitleStyle}
                        subtitle="John"
                        rightIcon={{name: 'edit'}}
                        onPress={() => {}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Last Name"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="Doe"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Email"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="john.doe@gmail.com"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Phone Number"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="+123 432 5675 56"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Password"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="********"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {}}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    listItem: {
        backgroundColor: 'white',
    },

    listItemBorder: {
        borderBottomColor: '#eaeaea',
    },

    listItemMT: {
        marginTop: 30
    },

    listItemTitleStyle: {
        fontSize: 15,
        color: 'grey'
    },

    listItemSubtitleStyle: {
        fontSize: 20,
        color: 'black'
    }
});