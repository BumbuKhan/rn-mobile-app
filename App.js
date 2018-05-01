import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import SignInScreen from "./screens/SignInScreen";

const AppStack = StackNavigator({
    Home: {
        screen: HomeScreen
    }
});

export default SwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    SignIn: SignInScreen
}, {
    initialRouteName: 'AuthLoading'
});