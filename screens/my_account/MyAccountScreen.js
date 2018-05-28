import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {Header, Icon, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

import {Menu, ListItemTitle} from '../../components/common';
import {logOut} from '../../actions';
import languages from '../../helpers/languages';
import axios from '../../helpers/axios';

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

                            // updating redux store
                            this.props.logOut();

                            // and finally calling appropriate API endpoint
                            /*const authStr = `Bearer ${this.props.user.token.access_token}`;

                            axios.post('/logout', {}, {headers: {Authorization: authStr}})
                                .then((response) => {
                                    //console.log(response);
                                })*/
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
                    statusBarProps={{
                        barStyle: 'light-content'
                    }}
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
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.listItemMT]}
                        onPress={() => this.props.navigation.navigate('EditProfile')}
                    />

                    <ListItemTitle
                        title={t('screens:my account:language title')}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={languages[this.props.user.language]}
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => this.props.navigation.navigate('ChooseLanguage')}
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
    console.log('user', user);
    return {user, settings};
}

export default connect(mapStateToProps, {logOut})(MyAccountScreen);