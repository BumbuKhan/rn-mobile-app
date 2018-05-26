import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, StatusBar} from 'react-native';
import {ListItem, Icon, FormInput, Button} from 'react-native-elements';
import {connect} from 'react-redux';

import axios from '../../helpers/axios';
import {logIn} from '../../actions';

class EditProfileScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('screens:my account:edit profile:title'),
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name="chevron-left"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                /* this only styles the title/text (font, color etc.)  */
                color: 'white'
            },
            headerStyle: {
                /* this will style the header, but does NOT change the text */
                backgroundColor: '#496FC2'
            }
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
        barStyle: 'light-content'
    };

    _setCurPasswordModalVisible(visible) {
        this.setState({
            curPasswordModalVisible: visible
        });

        const barStyle = (visible) ? 'dark-content' : 'light-content';
        this.setState({barStyle});
    }

    _setNewPasswordModalVisible(visible) {
        this.setState({
            newPasswordModalVisible: visible
        });

        const barStyle = (visible) ? 'dark-content' : 'light-content';
        this.setState({barStyle});
    }

    _checkPassword = () => {
        const {t} = this.props.screenProps;

        this.setState({
            curEditingField: {
                ...this.state.curEditingField,
                loading: true
            }
        });

        // making an HTTP request to /validate
        const authStr = `Bearer ${this.props.user.token.access_token}`;

        axios
            .post(`/me/password_validate`,
                {password: this.state.curEditingField.value},
                {headers: {Authorization: authStr}})
            .then((_response) => {
                const response = _response.data;

                // turning off loading spinner
                this.setState({
                    curEditingField: {
                        ...this.state.curEditingField,
                        loading: false,
                        value: ''
                    }
                });

                const data = response.data;

                if (!response.success) {
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
                    this._setCurPasswordModalVisible(false);

                    // and opening another modal window in order to receive a brand new password from user
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            placeholder: t("common:new password"),
                            value: '',
                            buttonText: t("common:save")
                        }
                    });

                    // displaying 'new password' modal
                    this._setNewPasswordModalVisible(true);
                }
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
                        {cancelable: false}
                    );

                    // turning off loading spinner
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            loading: false,
                        }
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
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
        const newPassword = this.state.curEditingField.value;

        const authStr = `Bearer ${this.props.user.token.access_token}`;

        axios
            .put('/me/password_change',
                {password: newPassword},
                {headers: {Authorization: authStr}})
            .then((_response) => {
                const response = _response.data;
                const {data} = response;

                if (!response.success) {
                    throw new Error('Something went wrong, please try later');
                }

                // data has new auth data that need to be injected into Redux store
                /*
                {
                  "access_token": "eyJ0eXAiOiJ...9IirT6aF3FtfVEl-GOg",
                  "expires_in": 3600,
                  "token_type": "bearer",
                }
                */

                const newUserData = {
                    ...this.props.user,
                    token: data
                };

                this.props.logIn(newUserData);
            })
            .then((passwordChanged) => {
                // turning off loading spinner
                this.setState({
                    curEditingField: {
                        ...this.state.curEditingField,
                        loading: false
                    }
                });

                this._setNewPasswordModalVisible(false);

                // on IOS we should wait for modal window to close (approx. 1 sec) before rising alert
                // otherwise you might encounter strange behaviour
                setTimeout(() => {
                    Alert.alert(
                        t("common:success"),
                        t("screens:my account:edit profile:your password has been successfully changed"),
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            },
                        ],
                        {cancelable: false}
                    );
                }, 1000);
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
                        {cancelable: false}
                    );

                    // turning off loading spinner
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            loading: false,
                        }
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error);
                }
            })
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle={this.state.barStyle}
                />

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
                                this._setCurPasswordModalVisible(false)
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

                            {(this.state.curEditingField.error.length) ?
                                <View style={styles.modalFieldContainer}>
                                    <Text style={styles.modalFieldError}>{this.state.curEditingField.error || ''}</Text>
                                </View>
                                :
                                <View></View>
                            }
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
                                this._setNewPasswordModalVisible(false)
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

                            this._setCurPasswordModalVisible(true);
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

export default connect(mapStateToProps, {logIn})(EditProfileScreen);