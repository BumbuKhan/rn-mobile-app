import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert} from 'react-native';
import {ListItem, Icon, FormInput, Button} from 'react-native-elements';
import {connect} from 'react-redux';

import axios from '../helpers/axios';

class EditProfileScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('screens:my account:edit profile:title')
        }
    };

    state = {
        curPasswordModalVisible: false,
        curEditingField: {
            name: '',
            value: '',
            placeholder: '',
            keyboardType: 'default',
            secureTextEntry: false, // is needed only for password field in order to hide entering symbols
            buttonText: '',
            loading: false,
            error: ''

        },

        newPasswordModalVisible: false,
        showNewPassword: false
    };

    setCurPasswordModalVisible(visible) {
        this.setState({
            curPasswordModalVisible: visible
        });
    }

    setNewPasswordModalVisible(visible) {
        this.setState({
            newPasswordModalVisible: visible
        });
    }

    _checkPassword = () => {
        console.log('checking password...');
        const {t} = this.props.screenProps;

        this.setState({
            curEditingField: {
                ...this.state.curEditingField,
                loading: true
            }
        });

        // making an HTTP request to /validate
        const authStr = `Bearer ${this.props.user.token.access_token}`;

        // TODO: GET method most likely will be replaced with POST
        axios
            .get(`/validate?password=${this.state.curEditingField.value}`, {headers: {Authorization: authStr}})
            .then((response) => {
                // turning off loading spinner
                this.setState({
                    curEditingField: {
                        ...this.state.curEditingField,
                        loading: false,
                        value: ''
                    }
                });

                const data = response.data;

                if (data.message === 'Invalid') {
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            error: t("common:incorrect password")
                        }
                    });
                } else {
                    // clearing out error
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            error: ''
                        }
                    });

                    // closing this modal
                    this.setCurPasswordModalVisible(false);

                    // and opening another modal window in order to receive a brand new password from user
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            placeholder: t("common:new password"),
                            value: '',
                            buttonText: t("common:save")
                        }
                    });

                    this.setNewPasswordModalVisible(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    _updatePassword = () => {
        this.setState({
            curEditingField: {
                ...this.state.curEditingField,
                loading: true
            }
        });

        const {t} = this.props.screenProps;
        const authStr = `Bearer ${this.props.user.token.access_token}`;
        const newPassword = this.state.curEditingField.value;

        axios
            .post('/change/password', {password: newPassword}, {headers: {Authorization: authStr}})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={styles.container}>
                {<Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.curPasswordModalVisible}>

                    <View style={styles.modalContainer}>
                        <View style={{
                            alignSelf: 'flex-start',
                            paddingLeft: 15
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setCurPasswordModalVisible(false)
                            }}>
                                <Icon
                                    name='close'
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalFormInputContainer}>
                            <FormInput
                                value={this.state.curEditingField.value}
                                placeholder={this.state.curEditingField.placeholder}
                                inputStyle={{fontSize: 22, color: 'black'}}
                                autoFocus={true}
                                secureTextEntry
                                onChangeText={(value) => {
                                    this.setState({
                                        curEditingField: {
                                            ...this.state.curEditingField,
                                            value
                                        }
                                    });
                                }}
                            />

                            {this.state.curEditingField.error.length && (<View style={styles.modalFieldContainer}>
                                <Text style={styles.modalFieldError}>{this.state.curEditingField.error}</Text>
                            </View>)}
                        </View>

                        <View style={{
                            marginTop: 20
                        }}>
                            <Button
                                title={this.state.curEditingField.buttonText}
                                buttonStyle={{
                                    backgroundColor: '#496FC2',
                                }}
                                borderRadius={3}
                                textStyle={{
                                    fontSize: 18
                                }}
                                onPress={() => {
                                    this._checkPassword()
                                }}
                                loading={this.state.curEditingField.loading}
                                disabled={this.state.curEditingField.loading || this.state.curEditingField.value.length < 6}
                            />
                        </View>
                    </View>
                </Modal>}

                {<Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.newPasswordModalVisible}>

                    <View style={styles.modalContainer}>
                        <View style={{
                            alignSelf: 'flex-start',
                            paddingLeft: 15
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setNewPasswordModalVisible(false)
                            }}>
                                <Icon
                                    name='close'
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalFormInputContainer}>
                            <FormInput
                                value={this.state.curEditingField.value}
                                placeholder={this.state.curEditingField.placeholder}
                                inputStyle={{fontSize: 22, color: 'black'}}
                                autoFocus={true}
                                secureTextEntry={this.state.curEditingField.secureTextEntry}
                                onChangeText={(value) => {
                                    this.setState({
                                        curEditingField: {
                                            ...this.state.curEditingField,
                                            value
                                        }
                                    });
                                }}
                            />

                            <View style={[styles.modalFieldContainer, {
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }]}>
                                <View>
                                    <Text>{t("common:password min requirement")}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            curEditingField: {
                                                ...this.state.curEditingField,
                                                secureTextEntry: !this.state.curEditingField.secureTextEntry
                                            }
                                        });
                                    }}>
                                        <Text>{
                                            (this.state.curEditingField.secureTextEntry) ? t("common:show password") : t("common:hide password")
                                        }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 20
                        }}>
                            <Button
                                title={this.state.curEditingField.buttonText}
                                buttonStyle={{
                                    backgroundColor: '#496FC2',
                                }}
                                borderRadius={3}
                                textStyle={{
                                    fontSize: 18
                                }}
                                onPress={() => {
                                    this._updatePassword()
                                }}
                                loading={this.state.curEditingField.loading}
                                disabled={this.state.curEditingField.loading || this.state.curEditingField.value.length < 6}
                            />
                        </View>
                    </View>
                </Modal>}

                <ScrollView>

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemMT, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:first name')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitleStyle={styles.listItemSubtitleStyle}
                        subtitle={this.props.user.name}
                        hideChevron={true}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:email')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitle={this.props.user.email}
                        subtitleStyle={styles.listItemSubtitleStyle}
                        hideChevron={true}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:password')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="********"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={(<Icon name='edit' size={20} color='gray'/>)}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    ...this.state.curEditingField,
                                    value: '',
                                    placeholder: t('screens:my account:edit profile:current password'),
                                    secureTextEntry: true,
                                    buttonText: t("common:continue")
                                }
                            });

                            this.setCurPasswordModalVisible(true);
                        }}
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
        fontSize: 15,
        color: 'grey'
    },

    listItemSubtitleStyle: {
        fontSize: 20,
        color: 'black'
    },

    modalContainer: {
        marginTop: 35
    },

    modalFormInputContainer: {
        marginTop: 40
    },

    modalFieldContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5
    },

    modalFieldError: {
        color: 'red'
    }
});

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps)(EditProfileScreen);