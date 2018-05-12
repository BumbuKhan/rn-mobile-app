import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

import {setCurLang} from '../actions/settings_actions';

class ChooseLanguageScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('screens:my account:choose language:title')
        }
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
                        hideChevron={this.props.settings.curLang !== 'en'}
                        onPress={() => this.props.setCurLang('en')}
                        rightIcon={{name: 'check'}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('languages:de')}
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={this.props.settings.curLang !== 'de'}
                        onPress={() => this.props.setCurLang('de')}
                        rightIcon={{name: 'check'}}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('languages:ru')}
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={this.props.settings.curLang !== 'ru'}
                        onPress={() => this.props.setCurLang('ru')}
                        rightIcon={{name: 'check'}}
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

function mapStateToProps({settings}) {
    return {settings};
}

export default connect(mapStateToProps, {setCurLang})(ChooseLanguageScreen);