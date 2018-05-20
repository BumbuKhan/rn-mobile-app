import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {FormInput, Text, Button} from 'react-native-elements';

import {logIn} from '../../actions';
import axios from '../../helpers/axios';
import {setCurLang} from '../../actions';

class SignInScreen extends Component {
    state = {
        email: 'qurban.qurbanov93@gmail.com',
        password: '12345678',
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
            .then((_response) => {
                const response = _response.data;

                /*
                response has such structure:

                {
                  "success": true,
                  "data": {
                    "access_token": "eyJ0eXAiT...MDQ3NTQ2YWEifQ.wIHVkrPGdnRGJokocP_EGh_4auUGsZmGg",
                    "expires_in": 3600,
                    "token_type": "bearer",
                  }
                }
                */

                if (!response.success) {
                    throw new Error('Incorrect email or password');
                }

                // pulling out data key from response
                const {data} = response;

                // saving data to userData
                userData.token = data;

                // after getting auth token we should fetch user's data
                const authStr = `Bearer ${data.access_token}`;

                return axios.get('/me', {headers: {Authorization: authStr}});
            })
            .then((_response) => {
                const response = _response.data;
                /*
                response has such structure:

                {
                    "success": true,
                    "data": {
                        "id": 2,
                        "name": "Gurban",
                        "language": "de",
                        "email": "qurban.qurbanov93@gmail.com",
                        "created_at": "2018-05-14 10:23:33",
                        "updated_at": "2018-05-15 18:02:03"
                    }
                }
                */

                if(!response.success) {
                    throw new Error('Could not fetch user data');
                }

                const {data} = response;

                // saving user's data to userData
                userData = {...userData, ...data};

                /*
                and now userData looks like:

                {
                    "id": 2,
                    "name": "Gurban",
                    "email": "qurban.qurbanov93@gmail.com",
                    "language": "de",
                    "created_at": "2018-05-14 10:23:33",
                    "updated_at": "2018-05-15 18:02:03",

                    "token": Object {
                        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xODUuNjkuMTU0LjIzNVwvYXBpXC9sb2dpbiIsImlhdCI6MTUyNjQxMjA0NywiZXhwIjoxNTI2NDE1NjQ3LCJuYmYiOjE1MjY0MTIwNDcsImp0aSI6InVIUWdVVmlKV05wTFU1SFkiLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.xEA5-zhfndryXmkGXpGVA0EoH2AUA8fJiaYscBtectU",
                        "expires_in": 3600,
                        "token_type": "bearer",
                    }
                }
                */

                // pushing all user's data to redux store...
                _this.props.logIn(userData);

                // setting up app language...
                this.props.setCurLang(userData.language);

                // taking user to the main screen
                _this.props.navigation.navigate('App');
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
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

                    // clearing out a password field
                    _this.setState({
                        password: ''
                    });

                } else if (error.request) {
                    // No internet connection...
                    Alert.alert(
                        'No Internet Connection',
                        'Please male sure that you have got an Internet connection',
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            },
                        ],
                        {cancelable: false}
                    );

                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

                // enabling 'log in' button back
                _this.setState({
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

export default connect(null, {logIn, setCurLang})(SignInScreen);