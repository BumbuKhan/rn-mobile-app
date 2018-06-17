import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import SearchList from '@unpourtous/react-native-search-list/library';
import Touchable from '@unpourtous/react-native-search-list/library/utils/Touchable'

import axios from '../../helpers/axios';
import { Menu } from '../../components/common';
import { CLIENTS } from '../../helpers/api_endpoints';

const rowHeight = 50;

class ChooseClientListScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: screenProps.t('drawer menu:clients'),
            drawerIcon: ({ tintColor }) => {
                return <Icon
                    name="group"
                    color={tintColor}
                />
            },
            header: null // hiding the default StackNavigator header since we have our own
        }
    };

    state = {
        dataSource: [],
        loading: false
    };

    componentDidMount = () => {
        const { t } = this.props.screenProps;

        this.setState({
            loading: true
        });

        // making an HTTP request to GET:/api/clients endpoint
        axios
            .get(CLIENTS)
            .then((_response) => {
                this.setState({
                    loading: false
                });

                const response = _response.data;
                const { data } = response;

                /*
                'data' looks like this:
                {
                    "address": "2864 Mario Mountains Suite 603 Caspermouth, MN 10576",
                    "company_name": "Altenwerth, Koelpin and Torphy",
                    "created_at": "2018-06-14 19:24:04",
                    "email": null,
                    "fax": null,
                    "first_name": "Vance",
                    "id": 999,
                    "info": "Alice thought ...ced that they.",
                    "last_name": "Fisher",
                    "tel": null,
                    "updated_at": "2018-06-14 19:24:04",
                    "website": null,
                }
                */

                if (!response.success) {
                    throw new Error('Something went wrong, please try later');
                }

                // formatting data
                const clients = data.map((client) => {
                    return {
                        id: client.id,
                        searchKey: client.id,
                        searchStr: client.company_name,
                        address: client.address
                    }
                });

                // pushing fetched data to redux store
                this.props.updateClients(clients);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                } else if (error.request) {
                    // No internet connection...
                    Alert.alert(
                        t("common:no internet connection"),
                        t("common:please make sure that you have got an internet connection"),
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            },
                        ],
                        { cancelable: false }
                    );

                    // turning off loading spinner
                    this.setState({
                        loading: false
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error);
                }
            })
    }

    // custom render row
    _renderRow = (item, sectionID, rowID, highlightRowFunc, isSearching) => {
        let containerStyle = [styles.listItem, styles.listItemBorder];

        if (item !== this.state.dataSource.length - 1) {
            containerStyle.push(styles.listItemNoBorderBottom);
        }

        return (
            <Touchable>
                <ListItem
                    key={item.searchKey}
                    title={item.searchStr}
                    titleStyle={styles.listItemTitleStyle}
                    subtitle={item.address}
                    subtitleStyle={{
                        fontSize: 16
                    }}
                    containerStyle={containerStyle}
                    onPress={() => {
                        this.props.navigation.navigate('ProjectsList', {
                            headerTitle: item.searchStr
                        });
                    }}
                />
            </Touchable>
        )
    };

    // render empty view when datasource is empty
    _renderEmpty = () => {
        return (
            <View style={styles.emptyDataSource}>
                {(this.state.loading) ?
                    <View style={{
                        marginTop: 20
                    }}>
                        <ActivityIndicator
                            size="small"
                        />
                    </View> :
                    <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Content </Text>}
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
            <View style={{
                paddingLeft: 15
            }}>
                <Menu {...this.props} />
            </View>
        )
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle='light-content'
                />
                <SearchList
                    data={this.props.clients}
                    hideSectionList={true}
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

function mapStateToProps({ clients }) {
    return {
        clients
    }
}

export default connect(mapStateToProps, actions)(ChooseClientListScreen);