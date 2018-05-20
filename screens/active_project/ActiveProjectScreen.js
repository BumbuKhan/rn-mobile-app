import React, {Component} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Icon, Button, CheckBox, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import {Menu, Plus} from '../../components/common';
import {toggleType} from '../../actions';

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
        projectTypeModalVisible: false,
        activeProject: {

        }
    };

    setProjectTypeModalVisible(visible) {
        this.setState({
            projectTypeModalVisible: visible
        });
    }

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{flex: 1}}>

                /* Current password modal start */
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
                                <Text h3>Choose the type of the project you want to work on</Text>
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
                                    <Text style={styles.modalCheckboxSubtitle}>Dealing with steel</Text>
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
                                    <Text style={styles.modalCheckboxSubtitle}>Construction related job</Text>
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
                                    <Text style={styles.modalCheckboxSubtitle}>Repair of working machines</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            marginTop: 35,
                            marginLeft: 10,
                            marginRight: 10
                        }}>
                            <Button
                                title="Add project"
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
                    </View>
                </Modal>}
                /* Current password modal   end */

                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:active project'), style: {color: '#fff', fontSize: 20}}}
                    rightComponent={<Plus onPress={() => {
                        this.setProjectTypeModalVisible(true);
                    }}/>}
                />
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
    }
});

function mapStateToProps({activeProject}) {
    return {activeProject}
}

export default connect(mapStateToProps, {toggleType})(ActiveProjectScreen);