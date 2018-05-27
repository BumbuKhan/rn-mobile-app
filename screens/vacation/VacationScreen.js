import moment from 'moment';
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Modal, StatusBar, TouchableOpacity} from 'react-native';
import {Header, Icon, ListItem, Button, Text} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import Accordion from 'react-native-collapsible/Accordion';

import {Menu, ListItemDescription, ListItemTitle} from '../../components/common';

const REQUESTS = [
    {
        title: 'For not-paid walkaway',
        content: 'You have requested a walkaway from 2018-05-28 14:30 to 2018-05-28 17:00',
        response: {
            status: 'pending',
            reason: null
        }
    },
    {
        title: 'For vacation - 5 day(s)',
        content: 'You have requested a vacation from 2018-06-30 to 2018-07-05',
        response: {
            status: 'declined',
            reason: 'You are taking vacation too often!'
        }
    },
    {
        title: 'For vacation - 10 day(s)',
        content: 'You have requested a vacation from 2018-05-31 to 2018-06-10',
        response: {
            status: 'approved',
            reason: null
        }
    },
    {
        title: 'For paid walkaway',
        content: 'You have requested a walkaway from 2018-05-31 14:30 to 2018-05-31 17:00',
        response: {
            status: 'need-to-be-discussed',
            reason: null
        }
    }
];

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

        isRequestVacationModalVisible: false,
        vacationDateFrom: null,
        vacationDateTo: null,

        isRequestWalkawayModalVisible: false,
        walkawayDateFrom: null,
        walkawayDateTo: null,
        walkawayType: null, // ['paid', 'not-paid']
    };

    _setRequestVacationModalVisible(visible) {
        this.setState({
            isRequestVacationModalVisible: visible
        });

        const barStyle = (visible) ? 'dark-content' : 'light-content';
        this.setState({barStyle});
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    };

    _setRequestWalkawayModalVisible(visible) {
        this.setState({
            isRequestWalkawayModalVisible: visible
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

                <View style={{marginTop: 40, paddingLeft: 15, paddingRight: 15}}>
                    <Text h4>Requesting a vacation</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 20,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        width: '48%'
                    }}>
                        <Text style={styles.datePickerTitle}>From</Text>
                        <DatePicker
                            showIcon={false}
                            style={{width: '100%'}}
                            date={this.state.vacationDateFrom}
                            mode="date"
                            placeholder="Select start date"
                            format="YYYY-MM-DD"
                            minDate={moment().format("YYYY-MM-DD")}
                            maxDate={moment().add(1, 'year').format("YYYY-MM-DD")}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    borderColor: '#e0e0e0',
                                    borderRadius: 3
                                }
                            }}
                            onDateChange={(vacationDateFrom) => {
                                this.setState({vacationDateFrom})
                            }}
                        />
                    </View>

                    <View style={{
                        width: '48%'
                    }}>
                        <Text style={styles.datePickerTitle}>To</Text>
                        <DatePicker
                            showIcon={false}
                            style={{width: '100%'}}
                            date={this.state.vacationDateTo}
                            mode="date"
                            placeholder="Select end date"
                            format="YYYY-MM-DD"
                            minDate={moment().format("YYYY-MM-DD")}
                            maxDate={moment().add(1, 'year').format("YYYY-MM-DD")}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    borderColor: '#e0e0e0',
                                    borderRadius: 3
                                }
                            }}
                            onDateChange={(vacationDateTo) => {
                                this.setState({vacationDateTo})
                            }}
                        />
                    </View>
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

                {this._renderVacationHelperText()}
            </View>
        </Modal>);
    };

    _renderRequestWalkawayModal = () => {
        return (<Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isRequestWalkawayModalVisible}>

            <View style={styles.modalContainer}>
                <View style={{
                    alignSelf: 'flex-start',
                    paddingLeft: 15
                }}>
                    <TouchableOpacity onPress={() => {
                        this._setRequestWalkawayModalVisible(false);
                    }}>
                        <Icon
                            name='close'
                            color='black'
                        />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40, paddingLeft: 15, paddingRight: 15}}>
                    <Text h4>{`Requesting a ${this.state.walkawayType} walkaway`}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 20,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        width: '48%'
                    }}>
                        <Text style={styles.datePickerTitle}>From</Text>
                        <DatePicker
                            showIcon={false}
                            style={{width: '100%'}}
                            date={this.state.walkawayDateFrom}
                            mode="date"
                            placeholder="Select start date"
                            format="YYYY-MM-DD"
                            minDate={moment().format("YYYY-MM-DD")}
                            maxDate={moment().add(1, 'year').format("YYYY-MM-DD")}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    borderColor: '#e0e0e0',
                                    borderRadius: 3
                                }
                            }}
                            onDateChange={(walkawayDateFrom) => {
                                this.setState({walkawayDateFrom})
                            }}
                        />
                    </View>

                    <View style={{
                        width: '48%'
                    }}>
                        <Text style={styles.datePickerTitle}>To</Text>
                        <DatePicker
                            showIcon={false}
                            style={{width: '100%'}}
                            date={this.state.walkawayDateTo}
                            mode="date"
                            placeholder="Select end date"
                            format="YYYY-MM-DD"
                            minDate={moment().format("YYYY-MM-DD")}
                            maxDate={moment().add(1, 'year').format("YYYY-MM-DD")}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    borderColor: '#e0e0e0',
                                    borderRadius: 3
                                }
                            }}
                            onDateChange={(walkawayDateTo) => {
                                this.setState({walkawayDateTo});
                            }}
                        />
                    </View>
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

                {this._renderWalkawayHelperText()}
            </View>
        </Modal>);
    };

    _renderWalkawayHelperText = () => {
        let diff = 0;

        if (this.state.walkawayDateTo && this.state.walkawayDateFrom) {
            diff = moment(this.state.walkawayDateTo).diff(this.state.walkawayDateFrom, 'days');
        }

        if (!diff) {
            return;
        }

        return (
            <View style={{marginLeft: 15, marginRight: 15, marginTop: 15}}>
                <Text
                    style={{color: 'gray'}}>{`You are going to request a ${this.state.walkawayType} walkaway for ${diff} day(s)`}</Text>
            </View>
        );
    };

    _renderVacationHelperText = () => {
        let diff = 0;

        if (this.state.vacationDateFrom && this.state.vacationDateTo) {
            diff = moment(this.state.vacationDateTo).diff(this.state.vacationDateFrom, 'days');
        }

        if (!diff) {
            return;
        }

        return (
            <View style={{marginLeft: 15, marginRight: 15, marginTop: 15}}>
                <Text style={{color: 'gray'}}>You are going to request a vacation for {diff} day(s)</Text>
            </View>
        );
    };

    _renderRequests = () => {
        return (
            <View style={{
                marginBottom: 30
            }}>
                <ListItemTitle
                    title="REQUESTS"
                />
                <View style={styles.requestsWrapper}>

                    <Accordion
                        sections={REQUESTS}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        underlayColor="white"
                        onChange={(activeAccordeonIndex) => {
                            this.setState({
                                activeAccordeonIndex
                            });
                        }}
                    />

                </View>
            </View>
        );
    };

    _renderHeader = (section, index, isActive) => {
        let icon;

        if (section.response.status === 'pending') {
            // pending...
            icon = <Icon
                name="hourglass-empty"
                size={18}
                color="#496FC2"
            />;
        } else if (section.response.status === 'approved') {
            // approved
            icon = <Icon
                name="check"
                size={18}
                color="#0ec86c"
            />;
        } else if (section.response.status === 'declined') {
            // declined
            icon = <Icon
                name="check"
                size={18}
                color="red"
            />;
        } else {
            // need to be discussed
            icon = <Icon
                name="warning"
                size={18}
                color="#FDB657"
            />;
        }

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8
            }}>
                <View style={{
                    flex: 1
                }}>{icon}</View>

                <View style={{
                    flex: 10,
                    padding: 5
                }}>
                    <Text style={{
                        fontSize: 18
                    }}>{section.title}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Icon
                        name={(isActive)? 'keyboard-arrow-up': 'keyboard-arrow-down'}
                        size={20}
                        color="gray"
                    />
                </View>
            </View>
        );
    };

    _renderContent = (section) => {
        let status;

        if (section.response.status === 'pending') {
            // pending...
            status = <Text style={{
                color: '#496FC2'
            }}>Pending...</Text>;
        } else if (section.response.status === 'approved') {
            // approved
            status = <Text style={{
                color: '#0ec86c'
            }}>Approved!</Text>;
        } else if (section.response.status === 'declined') {
            // declined
            status = <Text style={{
                color: 'red'
            }}>Declined!</Text>;
        } else {
            status = <Text style={{
                color: '#FDB657'
            }}>Need to be discussed!</Text>;
        }

        return (
            <View style={{
                paddingLeft: 35,
                paddingRight: 35,
                paddingBottom: 10
            }}>
                <Text style={{
                    color: 'gray',
                    marginBottom: 10
                }}>{section.content}</Text>
                {status}
            </View>
        );
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
                            onPress={this.showActionSheet}
                        />
                    </View>

                    {this._renderRequests()}
                </ScrollView>

                {this._renderRequestVacationModal()}
                {this._renderRequestWalkawayModal()}

                <ActionSheet
                    title="Please, specify the type of the walkaway"
                    ref={o => this.ActionSheet = o}
                    options={['Paid walkaway', 'Not paid walkaway', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        const walkawayType = (index === 0) ? 'paid' : 'not-paid';

                        this.setState({
                            walkawayType
                        });

                        // rising walkaway modal...
                        this._setRequestWalkawayModalVisible(true);

                    }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    datePickerTitle: {
        fontSize: 16,
        paddingBottom: 4
    },
    requestBtnWrapper: {
        paddingLeft: 20,
        paddingRight: 20
    },
    requestsWrapper: {
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderRadius: 3
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