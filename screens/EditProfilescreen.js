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

        }
    };

    setCurPasswordModalVisible(visible) {
        this.setState({
            curPasswordModalVisible: visible
        });
    }

    _checkPassword = () => {
        this.setState({
            curEditingField: {
                ...this.state.curEditingField,
                loading: true
            }
        });

        // making an HTTP request to /validate
        const authStr = `Bearer ${this.props.user.token.access_token}`;

        // console.log(authStr);
        // console.log(`/validate?password=${this.state.curEditingField.value}`);

        axios
            .get(`/validate?password=${this.state.curEditingField.value}`, {headers: {Authorization: authStr}})
            .then((response) => {
                this.setState({
                    curEditingField: {
                        ...this.state.curEditingField,
                        loading: false
                    }
                });

                const data = response.data;

                console.log(data.message);

                if (data.message == 'Invalid') {
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            error: 'Incorrect password'
                        }
                    });
                } else {
                    // clearing out error, closing this modal and receiving a brand new password from user
                    this.setState({
                        curEditingField: {
                            ...this.state.curEditingField,
                            error: ''
                        }
                    });

                    this.setCurPasswordModalVisible(false);
                }
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
                                errorStyle={{color: 'red'}}
                                errorMessage='ENTER A VALID ERROR HERE'
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
                                <Text style={styles.modalFieldError}>Incorrect password</Text>
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

                <ScrollView>
                    {/*<View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 20,
                        marginTop: 30
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: 25,
                        }}>
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    t('screens:my account:sign out confirm title'),
                                    t('screens:my account:sign out confirm description'),
                                    [
                                        {
                                            text: t('common:cancel'),
                                            onPress: () => {
                                            },
                                            style: 'cancel'
                                        },
                                        {
                                            text: t('common:ok'),
                                            onPress: async () => {
                                                // making an HTTP request...
                                            }
                                        },
                                    ],
                                    {cancelable: false}
                                )
                            }}>
                                <Icon
                                    name='delete-forever'
                                    color='red'
                                />
                                <Text style={{
                                    color: 'red'
                                }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Avatar
                                large
                                rounded
                                source={{uri: "https://randomuser.me/api/portraits/men/67.jpg"}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingLeft: 25
                        }}>
                            <TouchableOpacity onPress={() => {
                            }}>
                                <Icon
                                    name='photo-camera'
                                />
                                <Text>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>*/}

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