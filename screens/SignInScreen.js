import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Alert, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {FormInput, Text, Button} from 'react-native-elements';

import {logIn} from '../actions/user_actions';
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
        let userData = {}; // will be stored to AsyncStorage and redux store

        this.setState({
            loading: true
        });

        axios
            .post('/login', {
                email: this.state.email, // qurban.qurbanov93@gmail.com
                password: this.state.password // 12345678
            })
            .then(({data}) => {
                /*
                data has such structure:

                {
                  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...HC7DI0TF846rXJkb0i6o",
                  "expires_in": 3600,
                  "token_type": "bearer",
                }
                */

                // saving data to userData
                userData.token = data;

                // after getting auth token we should fetch user's data
                const authStr = `Bearer ${data.access_token}`;

                return axios.get('/me', {headers: {Authorization: authStr}});
            })
            .then(({data}) => {
                /*
                data has such structure:

                {
                  "id": 2,
                  "name": "Gurban",
                  "email": "qurban.qurbanov93@gmail.com",
                  "created_at": "2018-05-09 13:13:09",
                  "updated_at": "2018-05-09 13:13:09",
                }
                */

                // saving user's data to userData
                userData = {...userData, ...data};

                /*
                and now userData looks like:

                {
                    "token": Object {
                        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xODUuNjkuMTU0LjIzNVwvYXBpXC9sb2dpbiIsImlhdCI6MTUyNjAxMzE4OSwiZXhwIjoxNTI2MDE2Nzg5LCJuYmYiOjE1MjYwMTMxODksImp0aSI6ImZNYXJ5OGp0ZTZBUzJYMDUiLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.ztyftC3QiLCrHUyslHQ0jZCy4YjIFqBog8zJInTXr2c",
                        "expires_in": 3600,
                        "token_type": "bearer",
                    },
                    "id": 2,
                    "name": "Gurban",
                    "email": "qurban.qurbanov93@gmail.com",
                    "created_at": "2018-05-09 13:13:09",
                    "updated_at": "2018-05-09 13:13:09",
                }
                */

                // saving userData to AsyncStorage...
                return AsyncStorage.setItem('user', JSON.stringify(userData));
            })
            .then((savedToAsyncStorage) => {
                // pushing all user's data to redux store...
                _this.props.logIn(userData);

                // taking user to the main screen
                _this.props.navigation.navigate('App');
            })
            .catch((error) => {
                Alert.alert(
                    'Authentication failed',
                    'Incorrect email or password',
                    [
                        {
                            text: 'OK', onPress: () => {
                            }
                        },
                    ],
                    {cancelable: false}
                );

                // clearing out a password field and enabling 'log in' button back
                _this.setState({
                    password: '',
                    loading: false
                });
            });
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

export default connect(null, {logIn})(SignInScreen);