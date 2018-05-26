import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, StatusBar, TouchableOpacity} from 'react-native';
import {Header, Icon, ListItem, Button} from 'react-native-elements';

import {Menu, ListItemDescription, ListItemTitle} from '../../components/common';

export default class ClientsListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:vacation'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="beach-access"
                    color={tintColor}
                />
            }
        }
    };

    state = {
        barStyle: 'light-content',
        isRequestVacationModalVisible: false
    };

    _setRequestVacationModalVisible(visible) {
        this.setState({
            isRequestVacationModalVisible: visible
        });

        const barStyle = (visible) ? 'dark-content' : 'light-content';
        this.setState({barStyle});
    }

    _renderRequestVacationModal = () => {
        return (<Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isRequestVacationModalVisible}>

            <View style={styles.modalContainer}>
                <View style={{
                    alignSelf: 'flex-start',
                    paddingLeft: 15
                }}>
                    <TouchableOpacity onPress={() => {
                        this._setRequestVacationModalVisible(false)
                    }}>
                        <Icon
                            name='close'
                            color='black'
                        />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40}}>

                </View>

                <View style={{
                    marginTop: 20
                }}>
                    <Button
                        title="Send Request"
                        buttonStyle={{
                            backgroundColor: '#0ec86c',
                        }}
                        borderRadius={3}
                        textStyle={{
                            fontSize: 18
                        }}
                        onPress={() => {

                        }}
                    />
                </View>
            </View>
        </Modal>);
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle={this.state.barStyle}
                />

                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:vacation'), style: {color: '#fff', fontSize: 20}}}
                />

                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>
                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.mt30]}
                        title="For Current Year"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron
                        rightTitle="20 day(s)"
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="From Previous Year"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron
                        rightTitle="5 day(s)"
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="Spent"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron
                        rightTitle="9 day(s)"
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="Left"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron
                        rightTitle="16 day(s)"
                    />

                    <View style={[styles.mt30]}>
                        <Button
                            disabled={false}
                            title="Request Vacation"
                            buttonStyle={{
                                backgroundColor: '#0ec86c',
                            }}
                            borderRadius={3}
                            textStyle={{
                                fontSize: 18
                            }}
                            onPress={() => {
                                this._setRequestVacationModalVisible(true);
                            }}
                        />
                    </View>

                    <View style={[styles.mt20]}>
                        <Button
                            disabled={false}
                            title="Request Walkaway"
                            buttonStyle={{
                                backgroundColor: '#496FC2',
                            }}
                            borderRadius={3}
                            textStyle={{
                                fontSize: 18
                            }}
                            onPress={() => {
                            }}
                        />
                    </View>

                    <ListItemTitle
                        title="REQUESTS"
                    />
                    <View style={styles.requestsWrapper}>
                        <View style={{
                            padding: 20
                        }}>
                            <Text style={{color: 'gray'}}>Your requests will appear here</Text>
                        </View>
                    </View>
                </ScrollView>

                {this._renderRequestVacationModal()}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    requestBtnWrapper: {
        paddingLeft: 20,
        paddingRight: 20
    },
    requestsWrapper: {
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20
    },
    modalContainer: {
        marginTop: 35
    },
    modalHeader: {
        marginTop: 30,
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20
    },
    modalCheckboxContainer: {
        borderWidth: 0,
        backgroundColor: "white",
        marginBottom: 0,
        paddingBottom: 0
    },
    modalCheckboxSubtitleContainer: {
        marginLeft: 55
    },
    modalCheckboxSubtitle: {
        color: 'gray'
    },
    modalCheckboxWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 10
    },

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
    },
    mt20: {
        marginTop: 20
    }
});