import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import {ListItem, Icon, FormInput, Button, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';

class EditProfileScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('screens:my account:edit profile:title')
        }
    };

    /*state = {
        modalVisible: false,
        curEditingField: {
            name: '',
            value: '',
            placeholder: '',
            keyboardType: 'default'
        }
    };*/

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={styles.container}>
                {/*<Modal
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
                                title={t('common:save')}
                                buttonStyle={{
                                    backgroundColor: '#496FC2',
                                }}
                                textStyle={{
                                    fontSize: 18
                                }}
                                onPress={() => {
                                }}
                            />
                        </View>
                    </View>
                </Modal>*/}

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
                        /*rightIcon={(<Icon name='edit' size={20} color='gray'/>)}*/
                        /*onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: 'John',
                                    placeholder: t('screens:my account:edit profile:first name'),
                                    keyboardType: 'default'
                                }
                            });

                            this.setModalVisible(true);
                        }}*/
                    />

                    {/*<ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:last name')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="Doe"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={(<Icon name='edit' size={20} color='gray'/>)}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: 'Doe',
                                    placeholder: t('screens:my account:edit profile:last name'),
                                    keyboardType: 'default'
                                }
                            });

                            this.setModalVisible(true);
                        }}
                    />*/}

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:email')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitle={this.props.user.email}
                        subtitleStyle={styles.listItemSubtitleStyle}
                        hideChevron={true}
                    />

                    {/*<ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:phone number')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="+123 432 5675 56"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={(<Icon name='edit' size={20} color='gray'/>)}
                        onPress={() => {
                            this.setState({
                                curEditingField: {
                                    value: '+123 432 5675 56',
                                    placeholder: t('screens:my account:edit profile:phone number'),
                                    keyboardType: 'phone-pad'
                                }
                            });

                            this.setModalVisible(true);
                        }}
                    />*/}

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title={t('screens:my account:edit profile:password')}
                        titleStyle={styles.listItemTitleStyle}
                        subtitle="********"
                        subtitleStyle={styles.listItemSubtitleStyle}
                        rightIcon={(<Icon name='edit' size={20} color='gray'/>)}
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
    },
});

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps)(EditProfileScreen);