import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Alert, AsyncStorage} from 'react-native';
import {Header, Icon, Avatar, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

import {Menu, ListItemTitle, ListItemDescription} from '../components/common';
import {logOut} from '../actions/user_actions';

class MyAccountScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:my account'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="person"
                    color={tintColor}
                />
            },
            header: null // hiding the default StackNavigator header since we have our own
        }
    };

    _logOut = () => {
        const {t} = this.props.screenProps;

        try {
            Alert.alert(
                t('screens:my account:sign out confirm title'),
                t('screens:my account:sign out confirm description'),
                [
                    {
                        text: t('common:cancel'),
                        onPress: () => {
                        }, style: 'cancel'
                    },
                    {
                        text: t('common:ok'),
                        onPress: async () => {
                            // redirecting user to the Auth screen
                            this.props.navigation.navigate('Auth');

                            // waiting for actual logout
                            await this.props.logOut();
                        }
                    },
                ],
                {cancelable: false}
            )
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:my account'), style: {color: '#fff', fontSize: 20}}}
                />

                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>

                    <ListItem
                        title={this.props.user.name}
                        titleStyle={{
                            fontSize: 22
                        }}
                        subtitle={this.props.user.email}
                        subtitleStyle={{
                            fontSize: 16
                        }}
                        /*avatar={<Avatar
                            rounded
                            large
                            source={{uri: "https://randomuser.me/api/portraits/men/67.jpg"}}
                            containerStyle={{
                                marginLeft: 5
                            }}
                        />}*/
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.listItemMT]}
                        onPress={() => this.props.navigation.navigate('EditProfile')}
                    />

                    <ListItemTitle
                        title={t('screens:my account:language title')}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="English"
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => this.props.navigation.navigate('ChooseLanguage')}
                    />

                    <ListItemDescription
                        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam leo, varius vel mattis ut.'
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.listItemMT]}
                        title={t('screens:my account:sign out')}
                        titleStyle={[styles.listItemTitleStyle, {color: 'red'}]}
                        hideChevron={true}
                        onPress={this._logOut}
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

function mapStateToProps({user, settings}) {
    console.log(user);
    return {user, settings};
}

export default connect(mapStateToProps, {logOut})(MyAccountScreen);