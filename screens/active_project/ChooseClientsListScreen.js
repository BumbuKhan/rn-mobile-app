import React, {Component} from 'react';
import {View, StyleSheet, Alert, Text, StatusBar, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import SearchList, {HighlightableText} from '@unpourtous/react-native-search-list/library';
import Touchable from '@unpourtous/react-native-search-list/library/utils/Touchable'

import demoList from './data';

const rowHeight = 50;

export default class ChooseClientListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            //title: screenProps.t('screens:active project:choose client:title')
            title: 'Choose client',
            header: false
        }
    };

    state = {
        dataSource: demoList
    };

    // custom render row
    _renderRow = (item, sectionID, rowID, highlightRowFunc, isSearching) => {
        return (
            <Touchable onPress={() => {
                Alert.alert('Clicked!', `sectionID: ${sectionID}; item: ${item.searchStr}`,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true})
            }}>
                <View key={rowID} style={{flex: 1, marginLeft: 20, height: rowHeight, justifyContent: 'center'}}>
                    {/*use `HighlightableText` to highlight the search result*/}
                    <HighlightableText
                        matcher={item.matcher}
                        text={item.searchStr}
                        textColor={'#000'}
                        hightlightTextColor={'#0069c0'}
                    />
                    <Text style={{color: 'gray', fontSize: 11}}>{item.address}</Text>
                </View>
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
                <Text style={{color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10}}>Please search
                    again</Text>
            </View>
        )
    };

    _renderBackButton = () => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.goBack();
            }}>
                <Icon
                    name="chevron-left"
                    color="white"
                    size={35}
                />
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchList
                    data={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderEmptyResult={this._renderEmptyResult}
                    renderBackButton={this._renderBackButton}
                    renderEmpty={this._renderEmpty}
                    rowHeight={rowHeight}
                    toolbarBackgroundColor={'#2196f3'}
                    title='Pick a client     '
                    cancelTitle='Cancel'
                    onClickBack={() => {
                    }}
                    searchListBackgroundColor={'#2196f3'}
                    searchBarToggleDuration={300}
                    searchInputBackgroundColor={'#0069c0'}
                    searchInputBackgroundColorActive={'#6ec6ff'}
                    searchInputPlaceholderColor={'#FFF'}
                    searchInputTextColor={'#FFF'}
                    searchInputTextColorActive={'#000'}
                    searchInputPlaceholder='Search'
                    sectionIndexTextColor={'#6ec6ff'}
                    searchBarBackgroundColor={'#2196f3'}
                />
                <StatusBar
                    backgroundColor='#F00'
                    barStyle='light-content'
                />

            </View>
        )
    }

    /*render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView>

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.mt30]}
                        title="Client 1"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={false}
                        onPress={() => {}}
                        rightIcon={<Icon name='check'/>}
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="Client 2"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={true}
                        onPress={() => {}}
                        rightIcon={<Icon name='check'/>}
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="Client 1"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={true}
                        onPress={() => {}}
                        rightIcon={<Icon name='check'/>}
                    />

                </ScrollView>
            </View>
        );
    }*/
}


const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },
    listItemBorder: {
        borderTopWidth: 1
    },
    listItemTitleStyle: {
        fontSize: 18
    },
    mt30: {
        marginTop: 30
    }
});