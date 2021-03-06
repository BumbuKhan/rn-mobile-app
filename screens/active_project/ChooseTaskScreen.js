import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchList, { HighlightableText } from '@unpourtous/react-native-search-list/library';
import Touchable from '@unpourtous/react-native-search-list/library/utils/Touchable'

const rowHeight = 50;

class ChooseTaskScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            //title: screenProps.t('screens:active project:choose client:title')
            title: 'Choose Task',
            header: false
        }
    };

    componentDidMount = () => {
        this.props.fetchProjectTasks(this.props.currentProject.id);
    }

    // custom render row
    _renderRow = (item, sectionID, rowID, highlightRowFunc, isSearching) => {
        return (
            <Touchable onPress={() => {
                Alert.alert('Clicked!', `sectionID: ${sectionID}; item: ${item.searchStr}`,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true })
            }}>
                <View key={rowID} style={{ flex: 1, marginLeft: 20, height: rowHeight, justifyContent: 'center' }}>
                    {/*use `HighlightableText` to highlight the search result*/}
                    <HighlightableText
                        matcher={item.matcher}
                        text={item.searchStr}
                        textColor={'#000'}
                        hightlightTextColor={'#0069c0'}
                    />
                    <Text style={{ color: 'gray' }}>{item.details}</Text>
                </View>
            </Touchable>
        )
    };

    // render empty view when datasource is empty
    _renderEmpty = () => {
        return (
            <View style={styles.emptyDataSource}>
                <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Content </Text>
            </View>
        )
    };

    // render empty result view when search result is empty
    _renderEmptyResult = (searchStr) => {
        return (
            <View style={styles.emptySearchResult}>
                <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Result For <Text
                    style={{ color: '#171a23', fontSize: 18 }}>{searchStr}</Text></Text>

                <Divider style={{
                    marginTop: 10
                }} />

                <View style={{
                    alignSelf: 'center',
                    marginTop: 10
                }}>
                    <TouchableOpacity>

                        <Text style={{
                            color: '#0069c0',
                            fontSize: 18
                        }}><Icon
                                name="add"
                                color="#0069c0"
                                size={16}
                            /> Add it as a new task</Text>
                    </TouchableOpacity>
                </View>
                {/*<Text style={{color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10}}>Please search
                    again</Text>*/}
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
            <View style={{ flex: 1 }}>
                <SearchList
                    data={this.props.tasks.items}
                    renderRow={this._renderRow}
                    renderEmptyResult={this._renderEmptyResult}
                    renderBackButton={this._renderBackButton}
                    renderEmpty={this._renderEmpty}
                    rowHeight={rowHeight}
                    toolbarBackgroundColor={'#496FC2'}
                    title='Pick a Task     '
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
        borderTopWidth: 1
    },
    listItemTitleStyle: {
        fontSize: 18
    },
    mt30: {
        marginTop: 30
    }
});

function mapStatetToProps({ tasks, activeProject: { currentProject }}) {
    return {
        tasks,
        currentProject
    }
}

export default connect(mapStatetToProps, actions)(ChooseTaskScreen);