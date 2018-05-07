import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';

import i18n from '../locales/i18n';

export default class ChooseLanguageScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('screens:my account:choose language:title')
        }
    };

    state = {
        curLang: null
    };

    componentWillMount = async () => {
        let curLang = await AsyncStorage.getItem('curLang');
    };

    setupLanguage = (lang) => {
        i18n.changeLanguage(lang, (err, t) => {
            if (err) {
                console.log(err);
            } else {
                // saving to the AsyncStorage
                AsyncStorage.setItem('curLang', lang);
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
                        onPress={() => this.setupLanguage('en')}
                        rightIcon={{name: 'check'}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('languages:de')}
                        hideChevron={true}
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => this.setupLanguage('de')}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('languages:ru')}
                        hideChevron={true}
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => this.setupLanguage('ru')}
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
        fontSize: 18
    }
});