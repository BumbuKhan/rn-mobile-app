import React, {Component} from 'react';
import {View, StyleSheet, Alert, Text, StatusBar} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';

import SearchList from '@unpourtous/react-native-search-list/library';
import Touchable from '@unpourtous/react-native-search-list/library/utils/Touchable'

import {Menu} from '../../components/common';
import demoList from '../active_project/data_clients';

const rowHeight = 50;

export default class ChooseClientListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:clients'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="group"
                    color={tintColor}
                />
            },
            header: null // hiding the default StackNavigator header since we have our own
        }
    };

    state = {
        dataSource: demoList
    };

    // custom render row
    _renderRow = (item, sectionID, rowID, highlightRowFunc, isSearching) => {
        let containerStyle = [styles.listItem, styles.listItemBorder];

        if (item !== this.state.dataSource.length - 1) {
            containerStyle.push(styles.listItemNoBorderBottom);
        }

        return (
            <Touchable onPress={() => {
                Alert.alert('Clicked!', `sectionID: ${sectionID}; item: ${item.searchStr}`,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true})
            }}>
                <ListItem
                    key={rowID}
                    title={item.searchStr}
                    titleStyle={styles.listItemTitleStyle}
                    subtitle={item.address}
                    subtitleStyle={{
                        fontSize: 16
                    }}
                    containerStyle={containerStyle}
                    onPress={() => {
                        this.props.navigation.navigate('ProjectsList');
                    }}
                />
            </Touchable>
        )
    };

    // render empty view when datasource is empty
    _renderEmpty = () => {
        return (
            <View style={styles.emptyDataSource}>
                <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Content </Text>
            </View>
        )
    };

    // render empty result view when search result is empty
    _renderEmptyResult = (searchStr) => {
        return (
            <View style={styles.emptySearchResult}>
                <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Result For <Text
                    style={{color: '#171a23', fontSize: 18}}>{searchStr}</Text></Text>
            </View>
        )
    };

    _renderBackButton = () => {
        return (
            <View style={{
                paddingLeft: 15
            }}>
                <Menu {...this.props} />
            </View>
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                />
                <SearchList
                    data={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderEmptyResult={this._renderEmptyResult}
                    renderBackButton={this._renderBackButton}
                    renderEmpty={this._renderEmpty}
                    rowHeight={rowHeight}
                    toolbarBackgroundColor={'#496FC2'}
                    title='Clients      '
                    cancelTitle='Cancel'
                    onClickBack={() => {
                    }}
                    searchListBackgroundColor={'#496FC2'}
                    searchBarToggleDuration={300}
                    searchInputBackgroundColor={'#fff'}
                    searchInputBackgroundColorActive={'#fff'}
                    searchInputPlaceholderColor={'#30497f'}
                    searchInputTextColor={'#000'}
                    searchInputTextColorActive={'#000'}
                    searchInputPlaceholder='Search'
                    sectionIndexTextColor={'#496FC2'}
                    searchBarBackgroundColor={'#496FC2'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },
    listItemBorder: {
        borderBottomWidth: 1
    },
    listItemTitleStyle: {
        fontSize: 18
    },
    mt30: {
        marginTop: 30
    }
});