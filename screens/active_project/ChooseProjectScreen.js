import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import SearchList from '@unpourtous/react-native-search-list/library';
import Touchable from '@unpourtous/react-native-search-list/library/utils/Touchable'

const rowHeight = 50;

class ChooseProjectScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: 'Choose Project',
            header: false
        }
    };

    state = {
        projects: []
    };

    componentDidMount = () => {
        this.props.fetchClientsProjects();
    }

    componentWillReceiveProps = (props) => {
        const projects = props.projects.items.filter((project) => {
            // return project.client_id == this.props.navigation.state.params.clientId;
            return project.client_id == 761;
        });

        this.setState({
            projects
        });
    }

    // custom render row
    _renderRow = (item, sectionID, rowID, highlightRowFunc, isSearching) => {
        let containerStyle = [styles.listItem, styles.listItemBorder];

        if (item !== this.state.projects.length - 1) {
            containerStyle.push(styles.listItemNoBorderBottom);
        }

        return (
            <Touchable>
                <ListItem
                    key={item.id}
                    title={item.searchStr}
                    titleStyle={styles.listItemTitleStyle}
                    containerStyle={containerStyle}
                    hideChevron={rowID !== 180} /* TODO: will be compared with the redux store  */
                    rightIcon={<Icon name='check' />}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                />
            </Touchable>
        )
    };

    // render empty view when datasource is empty
    _renderEmpty = () => {
        return (
            <View style={styles.emptyDataSource}>
                {(this.props.projects.pending) ?
                    <View style={{
                        marginTop: 20
                    }}>
                        <ActivityIndicator
                            size="small"
                        />
                    </View> :
                    <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Projects</Text>}
            </View>
        )
    };

    // render empty result view when search result is empty
    _renderEmptyResult = (searchStr) => {
        return (
            <View style={styles.emptySearchResult}>
                <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Result For <Text
                    style={{ color: '#171a23', fontSize: 18 }}>{searchStr}</Text></Text>
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
                <StatusBar
                    barStyle='light-content'
                />
                <SearchList
                    data={this.state.projects}
                    renderRow={this._renderRow}
                    hideSectionList={true}
                    renderEmptyResult={this._renderEmptyResult}
                    renderBackButton={this._renderBackButton}
                    renderEmpty={this._renderEmpty}
                    rowHeight={rowHeight}
                    toolbarBackgroundColor={'#496FC2'}
                    title={`Projects      `}
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

function mapStateToProps({ clientsProjects }) {
    return {
        projects: clientsProjects
    }
}

export default connect(mapStateToProps, actions)(ChooseProjectScreen);