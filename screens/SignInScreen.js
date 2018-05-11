import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {FormInput, Text, Button} from 'react-native-elements';

import {populateData} from '../actions/user_actions';
import axios from '../helpers/axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

class SignInScreen extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    };

    handleSignIn = async () => {
        let _this = this;

        this.setState({
            loading: true
        });

        axios.post('/login', {
            email: this.state.email, // qurban.qurbanov93@gmail.com
            password: this.state.password // 12345678
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                alert('Incorrect email or password');

                _this.setState({
                    password: '',
                    loading: false
                });
            });

        /*
        const user = {
            name: 'Gurban',
            email: 'qurban.qurbanov93@gmail.com',
        };

        // if successfully authenticated then remember it
        await AsyncStorage.setItem('user', JSON.stringify(user));

        // populating user's data from AsyncStorage to Redux store
        this.props.populateData(user);

        // and navigate user to the app's home screen
        this.props.navigation.navigate('App');*/
    };

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView>
                    <Text h1 style={[styles.mx20, {
                        marginTop: 40,
                        marginBottom: 15,
                        fontWeight: 'bold'
                    }]}>Log in</Text>

                    <FormInput
                        value={this.state.email}
                        placeholder="Email"
                        inputStyle={styles.inputStyle}
                        containerStyle={[styles.containerStyle, {marginBottom: 15}]}
                        keyboardType="email-address"
                        onChangeText={(value) => {
                            this.setState({
                                email: value
                            });
                        }}
                    />

                    <FormInput
                        value={this.state.password}
                        placeholder="Password"
                        secureTextEntry
                        inputStyle={styles.inputStyle}
                        containerStyle={[styles.containerStyle, {marginBottom: 25}]}
                        onChangeText={(value) => {
                            this.setState({
                                password: value
                            });
                        }}
                    />

                    <Button
                        title={(!this.state.loading) ? "Log in" : ""}
                        fontWeight="bold"
                        backgroundColor="#4663E5"
                        borderRadius={3}
                        onPress={this.handleSignIn}
                        textStyle={{
                            fontSize: 20
                        }}
                        loading={this.state.loading}
                        disabled={this.state.loading}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mx20: {
        marginLeft: 20,
        marginRight: 20
    },

    my20: {
        marginTop: 20,
        marginBottom: 20
    },

    inputStyle: {
        height: 50,
        fontSize: 20
    },

    containerStyle: {
        height: 50,
        borderBottomColor: '#999',
    }
});

export default connect(null, {populateData})(SignInScreen);