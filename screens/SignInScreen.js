import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {FormInput, Text, Button} from 'react-native-elements';

import {logIn, populateData} from '../actions/user_actions';

class SignInScreen extends Component {
    handleSignIn = async () => {
        /*// TODO: do an HTTP request to auth endpoint
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
                        placeholder="Email"
                        inputStyle={styles.inputStyle}
                        containerStyle={[styles.containerStyle, {marginBottom: 15}]}
                        keyboardType="email-address"
                    />

                    <FormInput
                        placeholder="Password"
                        secureTextEntry
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.containerStyle}
                    />

                    <Button
                        title="Log in"
                        fontWeight="bold"
                        backgroundColor="#4663E5"
                        borderRadius={3}
                        onPress={this.handleSignIn}
                        style={[styles.my20, {marginTop: 30}]}
                        textStyle={{
                            fontSize: 20
                        }}
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

export default connect(null, {logIn, populateData})(SignInScreen);