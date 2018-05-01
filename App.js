import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';

import store from './store';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import RestorePasswordScreen from "./screens/RestorePasswordScreen";

// we'll describe all screens that are shown to authenticated user here
const AppStack = StackNavigator({
    Home: {
        screen: HomeScreen
    }
});

const RootStack = SwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: TabNavigator({
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        RestorePassword: RestorePasswordScreen
    }, {
        navigationOptions: {
            tabBarVisible: false
        }
    })
}, {
    // this screen runs always the first once the app is launched and decides
    // whether to show the signin screen according to the 'userToken' key in AsyncStorage
    // if the user is already authenticated it will take him right to the application (HomeScreen in this case)
    initialRouteName: 'AuthLoading'
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack/>
            </Provider>
        );
    }
}