import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, AsyncStorage, Alert} from 'react-native';
import {Header, Icon, Avatar, ListItem} from 'react-native-elements';

import Menu from '../components/Menu';
import ListItemTitle from '../components/ListItemTitle';
import ListItemDescription from '../components/ListItemDescription';

export default class MyAccountScreen extends Component {
    static navigationOptions = {
        title: 'My Account',
        drawerIcon: ({tintColor}) => {
            return <Icon
                name="person"
                color={tintColor}
            />
        }
    };

    signOut = () => {
        try {
            Alert.alert(
                'Please confirm',
                'Are you sure you want to sign out?',
                [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: async () => {
                            await AsyncStorage.removeItem('authToken');
                            this.props.navigation.navigate('Auth');
                        }},
                ],
                { cancelable: false }
            )
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: 'My Account', style: {color: '#fff', fontSize: 20}}}
                />
                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>
                    <ListItem
                        title="John Doe"
                        subtitle="john.doe@gmail.com"
                        subtitleStyle={{
                            fontSize: 16
                        }}
                        avatar={<Avatar
                            rounded
                            large
                            source={{uri: "https://randomuser.me/api/portraits/men/67.jpg"}}
                            containerStyle={{
                                marginLeft: 5
                            }}
                        />}
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.listItemMT]}
                        titleStyle={{
                            fontSize: 22
                        }}
                        onPress={() => alert('Navigating to the edit profile screen')}
                    />

                    <ListItemTitle
                        title="LANGUAGE"
                    />
                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="English"
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => alert('Changing Language')}
                    />
                    <ListItemDescription
                        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam leo, varius vel mattis ut.'
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.listItemMT]}
                        title="Sign Out"
                        hideChevron={true}
                        titleStyle={[styles.listItemTitleStyle, {color: 'red'}]}
                        onPress={this.signOut}
                    />
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
    },

    listItemBorder: {
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },

    listItemMT: {
        marginTop: 30
    },

    listItemTitleStyle: {
        fontSize: 18
    }
});