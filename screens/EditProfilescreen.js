import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity} from 'react-native';
import {ListItem, Icon, FormInput, Button} from 'react-native-elements';

export default class EditProfileScreen extends Component {
    static navigationOptions = {
        title: 'Edit Profile'
    };

    state = {
        modalVisible: false,
        curEditingField: {
            value: '',
            placeholder: 'Default Placeholder',
            keyboardType: 'default'
        }
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={{
                            alignSelf: 'flex-start',
                            paddingLeft: 15
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(false)
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
                                keyboardType={this.state.curEditingField.keyboardType}
                                autoFocus={true}
                            />
                        </View>

                        <View style={{
                            marginTop: 20
                        }}>
                            <Button
                                title='Save'
                                buttonStyle={{
                                    backgroundColor: '#496FC2',
                                }}
                                textStyle={{
                                    fontSize: 18
                                }}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                </Modal>

                <ScrollView>
                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemMT, styles.listItemBorder]}
                        title="First Name"
                        titleStyle={styles.listItemTitleStyle}
                        subtitleStyle={styles.listItemSubtitleStyle}
                        subtitle="John"
                        rightIcon={{name: 'edit'}}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: 'John',
                                    placeholder: 'First Name',
                                    keyboardType: 'default'
                                }
                            });

                            this.setModalVisible(true);
                        }}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Last Name"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="Doe"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: 'Doe',
                                    placeholder: 'Last Name',
                                    keyboardType: 'default'
                                }
                            });

                            this.setModalVisible(true);
                        }}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Email"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="john.doe@gmail.com"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: 'john.doe@gmail.com',
                                    placeholder: 'Email',
                                    keyboardType: 'email-address'
                                }
                            });

                            this.setModalVisible(true);
                        }}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Phone Number"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="+123 432 5675 56"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: '+123 432 5675 56',
                                    placeholder: 'Phone Number',
                                    keyboardType: 'phone-pad'
                                }
                            });

                            this.setModalVisible(true);
                        }}
                    />

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Password"
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="********"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={{name: 'edit'}}
                        onPress={() => {
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
    }
});