import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Header, Icon, Avatar} from 'react-native-elements';

import Menu from '../components/Menu';

export default class MyAccountScreen extends Component {
    static navigationOptions = {
        title: 'My Account',
        drawerIcon: ({tintColor}) => {
            return <Icon
                name="person"
                color={tintColor}
            />
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: 'My Account', style: {color: '#fff', fontSize: 20}}}
                />

                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>
                    <View style={{
                        marginTop: 30,
                        padding: 15,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: '#e0e0e0',
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                <View>
                                    <Avatar
                                        large
                                        rounded
                                        source={{uri: "https://randomuser.me/api/portraits/men/67.jpg"}}
                                    />
                                </View>

                                <View style={{
                                    flex: 1,
                                    justifyContent: 'space-around',
                                    paddingLeft: 20
                                }}>
                                    <Text
                                        style={{
                                            fontSize: 24
                                        }}>John Doe</Text>
                                    <Text style={{
                                        color: 'gray'
                                    }}>+934 895 23 3456</Text>
                                    <Text style={{
                                        color: 'gray'
                                    }}>john.doe@gmail.com</Text>
                                </View>

                                <View style={{
                                    justifyContent: 'center'
                                }}>
                                    <Icon
                                        name="chevron-right"
                                        color="grey"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        padding: 15,
                        paddingBottom: 10,
                        marginTop: 15
                    }}>
                        <Text style={{
                            color: '#999',
                            fontSize: 18
                        }}>Language</Text>
                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: '#e0e0e0',
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity>
                            <View style={{
                                padding: 15,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontSize: 18
                                }}>English</Text>
                                <View style={{
                                }}>
                                    <Icon
                                        name="chevron-right"
                                        color="grey"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        marginTop: 30,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: '#e0e0e0',
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity>
                            <View style={{
                                padding: 15
                            }}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 18
                                }}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    };
}