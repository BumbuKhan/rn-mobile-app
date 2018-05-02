import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class ChooseLanguageScreen extends Component {
    static navigationOptions = {
        title: 'Choose Language'
    };

    setupLanguage = (lang) => {
        alert(`${lang} is now an active language`);
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemMT, styles.listItemBorder]}
                        title="English"
                        subtitle="English"
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => this.setupLanguage('en')}
                        rightIcon={{name: 'check'}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="German"
                        subtitle="Deutsch"
                        hideChevron={true}
                        titleStyle={styles.listItemTitleStyle}
                        onPress={() => this.setupLanguage('de')}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Russian"
                        subtitle="Русский"
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