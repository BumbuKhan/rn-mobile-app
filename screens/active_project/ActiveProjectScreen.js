import {Font} from 'expo';
import React, {Component} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Header, Icon, Button, CheckBox, Text, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import moment from 'moment';

import {Menu, Plus, ListItemDescription} from '../../components/common';
import * as actions from '../../actions';

let blinkTimer;

class ActiveProjectScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:active project'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="timer"
                    color={tintColor}
                />
            }
        }
    };

    state = {
        fontLoaded: false,
        projectTypeModalVisible: false,
        isTimerSemicolonVisible: true
    };

    async componentDidMount() {
        await Font.loadAsync({
            'digital-7-italic': require('../../assets/fonts/digital-7-italic.ttf')
        });

        this.setState({fontLoaded: true});
    }

    componentWillReceiveProps = (props) => {
        if (props.activeProject.isTimerActive) {
            this._initBlinkTimer();
        } else {
            this._removeBlinkTimer();
        }
    };

    componentWillUnmount = () => {
        // removing all timers...
        this._removeBlinkTimer();
    };

    _initBlinkTimer = () => {
        // user has started time tracking
        // we should init setInterval in order to add blink effect to timer's semicolon (00:01)
        blinkTimer = setInterval(() => {
            this.setState({
                isTimerSemicolonVisible: !this.state.isTimerSemicolonVisible
            });
        }, 1000);
    };

    _removeBlinkTimer = () => {
        if (blinkTimer) {
            clearInterval(blinkTimer);
        }

        // user has stopped time tracking, so making semicolon visible
        this.setState({
            isTimerSemicolonVisible: true
        });
    };

    setProjectTypeModalVisible(visible) {
        this.setState({
            projectTypeModalVisible: visible
        });
    }

    renderTimer = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        return (
            <View style={[styles.mt30]}>
                <View style={[styles.timerWrapper]}>
                    <View>
                        {
                            this.state.fontLoaded ? (
                                <Text style={styles.timerText}>
                                    00
                                    <Text style={((this.state.isTimerSemicolonVisible)? styles.colorBlack: styles.colorWhite)}>:</Text>
                                    00
                                </Text>
                            ) : null
                        }
                    </View>
                    <View style={[styles.timerButtonWrapper]}>
                        <TouchableOpacity onPress={() => this.props.toggleTimer(!this.props.activeProject.isTimerActive)}>
                            <Icon
                                name={(this.props.activeProject.isTimerActive) ? "pause-circle-outline" : "play-circle-outline"}
                                size={65}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ListItemDescription
                    title="You can close the app while timer is running. I'll persist everything, promise!"
                />
                <Text>startedAt: {this.props.activeProject.startedAt}</Text>
                <Text>vastedTime: {this.props.activeProject.vastedTime}</Text>
            </View>
        );
    };

    renderProjectType = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        return (
            <View style={[styles.mt30]}>
                <ListItem
                    hideChevron={true}
                    rightTitle={this.props.activeProject.type}
                    title="Project's type"
                    titleStyle={[styles.listItemTitleStyle]}
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                />
            </View>
        );
    };

    renderRemoveProjectBtn = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View style={[styles.mt30]}>
                <Button
                    title={t('screens:active project:remove project button text')}
                    buttonStyle={{
                        backgroundColor: '#F04747',
                    }}
                    borderRadius={3}
                    textStyle={{
                        fontSize: 18
                    }}
                    onPress={() => {
                        Alert.alert(
                            t('screens:active project:remove project confirm title'),
                            t('screens:active project:remove project confirm description'),
                            [
                                {
                                    text: t('common:cancel'),
                                    onPress: () => {
                                    }, style: 'cancel'
                                },
                                {
                                    text: t('common:ok'),
                                    onPress: () => {
                                        this.props.removeProject()
                                    }
                                },
                            ],
                            {cancelable: false}
                        )
                    }}
                />
            </View>)
    };

    renderNoActiveProjectText = () => {
        if (this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View>
                <Text style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    color: '#999'
                }}>{t('screens:active project:no active project text 1')}</Text>

                <Text style={{
                    alignSelf: 'center',
                    color: '#999'
                }}>{t('screens:active project:no active project text 2')}</Text>
            </View>
        );
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{flex: 1}}>

                /* Project type modal start */
                {<Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.projectTypeModalVisible}>

                    <View style={styles.modalContainer}>
                        <View style={{
                            alignSelf: 'flex-start',
                            paddingLeft: 15
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setProjectTypeModalVisible(false)
                            }}>
                                <Icon
                                    name='close'
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={styles.modalHeader}>
                                <Text h3>{t("screens:active project:project type modal title")}</Text>
                            </View>

                            <View style={[styles.modalCheckboxWrapper, {borderTopWidth: 1, borderTopColor: '#e0e0e0'}]}>
                                <CheckBox
                                    title='STN'
                                    checked={this.props.activeProject.type === 'STN'}
                                    iconType='material'
                                    checkedIcon="radio-button-checked"
                                    uncheckedIcon="radio-button-unchecked"
                                    checkedColor="#496FC2"
                                    containerStyle={styles.modalCheckboxContainer}
                                    onPress={() => {
                                        this.props.toggleType('STN');
                                    }}
                                />
                                <View style={styles.modalCheckboxSubtitleContainer}>
                                    <Text
                                        style={styles.modalCheckboxSubtitle}>{t("common:stn job type description")}</Text>
                                </View>
                            </View>

                            <View style={styles.modalCheckboxWrapper}>
                                <CheckBox
                                    title='BTN'
                                    checked={this.props.activeProject.type === 'BTN'}
                                    iconType='material'
                                    checkedIcon="radio-button-checked"
                                    uncheckedIcon="radio-button-unchecked"
                                    checkedColor="#496FC2"
                                    containerStyle={styles.modalCheckboxContainer}
                                    onPress={() => {
                                        this.props.toggleType('BTN');
                                    }}
                                />
                                <View style={styles.modalCheckboxSubtitleContainer}>
                                    <Text
                                        style={styles.modalCheckboxSubtitle}>{t("common:btn job type description")}</Text>
                                </View>
                            </View>

                            <View style={styles.modalCheckboxWrapper}>
                                <CheckBox
                                    title='ATN'
                                    checked={this.props.activeProject.type === 'ATN'}
                                    iconType='material'
                                    checkedIcon="radio-button-checked"
                                    uncheckedIcon="radio-button-unchecked"
                                    checkedColor="#496FC2"
                                    containerStyle={styles.modalCheckboxContainer}
                                    onPress={() => {
                                        this.props.toggleType('ATN');
                                    }}
                                />
                                <View style={styles.modalCheckboxSubtitleContainer}>
                                    <Text
                                        style={styles.modalCheckboxSubtitle}>{t("common:atn job type description")}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            marginTop: 35,
                            marginLeft: 10,
                            marginRight: 10
                        }}>
                            <Button
                                title={t("screens:active project:create project")}
                                buttonStyle={{
                                    backgroundColor: '#496FC2',
                                }}
                                borderRadius={3}
                                textStyle={{
                                    fontSize: 18
                                }}
                                onPress={() => {
                                    this.props.createProject();
                                    this.setProjectTypeModalVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </Modal>}
                /* Project type modal   end */

                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:active project'), style: {color: '#fff', fontSize: 20}}}
                    rightComponent={(!this.props.activeProject.isCreated) ? <Plus onPress={() => {
                        this.setProjectTypeModalVisible(true);
                    }}/> : null}
                />
                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>
                    {this.renderTimer()}
                    {this.renderProjectType()}
                    {this.renderNoActiveProjectText()}

                    {this.renderRemoveProjectBtn()}
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
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
    },
    listItemBorder: {
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },
    listItemTitleStyle: {
        fontSize: 18
    },
    mt30: {
        marginTop: 30
    },

    timerWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    timerText: {
        fontFamily: 'digital-7-italic',
        fontSize: 50,
        fontWeight: 'bold'
    },
    colorWhite: {
        color: 'white'
    },
    colorBlack: {
        color: 'black'
    }
});

function mapStateToProps({activeProject}) {
    return {activeProject}
}

export default connect(mapStateToProps, actions)(ActiveProjectScreen);