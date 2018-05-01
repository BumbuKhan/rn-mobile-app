import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';

const AppStack = StackNavigator({
    Home: {
        screen: HomeScreen
    }
});

export default SwitchNavigator({
    App: AppStack
}, {
    initialRouteName: 'App'
});