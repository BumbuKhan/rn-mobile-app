import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import {setCurLang} from '../../actions';
import axios from '../../helpers/axios';

class ChooseLanguageScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('screens:my account:choose language:title'),
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name="chevron-left"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                /* this only styles the title/text (font, color etc.)  */
                color: 'white'
            },
            headerStyle: {
                /* this will style the header, but does NOT change the text */
                backgroundColor: '#496FC2'
            }
        }
    };

    _setCurLang = (lang) => {
        this.props.setCurLang(lang);

        // trying to call API...
        const authStr = `Bearer ${this.props.user.token.access_token}`;

        axios
            .put('/me/language_change', {
                language: lang
            }, {headers: {Authorization: authStr}})
            .then((_response) => {
                const response = _response.data;

                //console.log(response);
            })
            .catch((error) => {
                // we don't do anything if something goes wrong...
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js

                    // No internet connection...
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
            });
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={styles.container}>
                <ScrollView>

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemMT, styles.listItemBorder]}
                        title={t('languages:en')}
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={this.props.user.language !== 'en'}
                        onPress={() => this._setCurLang('en')}
                        rightIcon={<Icon name='check'/>}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('languages:de')}
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={this.props.user.language !== 'de'}
                        onPress={() => this._setCurLang('de')}
                        rightIcon={<Icon name='check'/>}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('languages:ru')}
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={this.props.user.language !== 'ru'}
                        onPress={() => this._setCurLang('ru')}
                        rightIcon={<Icon name='check'/>}
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
        backgroundColor: 'white'
    },

    listItemBorder: {
        borderBottomColor: '#eaeaea',
    },

    listItemMT: {
        marginTop: 30
    },

    listItemTitleStyle: {
        fontSize: 18,
        lineHeight: 30
    }
});

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps, {setCurLang})(ChooseLanguageScreen);