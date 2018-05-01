import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import SignInScreen from "./screens/SignInScreen";

// we'll describe all screens that are shown to authenticated user here
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
    // this screen runs always the first once the app is launched and decides
    // whether to show the signin screen according to the 'userToken' key in AsyncStorage
    // if the user is already authenticated it will take him right to the application (HomeScreen in this case)
    initialRouteName: 'AuthLoading'
});