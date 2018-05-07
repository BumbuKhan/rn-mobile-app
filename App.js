import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {Text} from 'react-navigation';
import {I18nextProvider, translate} from 'react-i18next';

import i18n from './locales/i18n';
import store from './store';
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import ActiveProjectScreen from './screens/ActiveProjectScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import RestorePasswordScreen from "./screens/RestorePasswordScreen";
import ChooseLanguageScreen from "./screens/ChooseLanguageScreen";
import EditProfileScreen from "./screens/EditProfilescreen";

// we'll describe all screens that are shown to authenticated user here
const AppStack = DrawerNavigator({
    ActiveProject: {
        screen: ActiveProjectScreen
    },
    Settings: StackNavigator({
        SettingsMain: {
            screen: MyAccountScreen
        },
        ChooseLanguage: {
            screen: ChooseLanguageScreen
        },
        EditProfile: {
            screen: EditProfileScreen
        }
    }, {
        initialRouteName: 'SettingsMain'
    })
}, {
    initialRouteName: 'Settings'
});

const RootStack = SwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: TabNavigator({
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
        RestorePassword: RestorePasswordScreen
    }, {
        initialRouteName: 'SignIn',
        navigationOptions: {
            tabBarVisible: false
        },
        animationEnabled: true
    })
}, {
    // this screen runs always the first once the app is launched and decides
    // whether to show the signin screen according to the 'userToken' key in AsyncStorage
    // if the user is already authenticated it will take him right to the application (HomeScreen in this case)
    initialRouteName: 'AuthLoading'
});


// Wrapping a stack with translation hoc asserts we trigger new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedStack = () => {
    return <RootStack screenProps={{t: i18n.getFixedT()}}/>;
};

const ReloadAppOnLanguageChange = translate('translation', {
    bindI18n: 'languageChanged',
    bindStore: false
})(WrappedStack);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <ReloadAppOnLanguageChange/>
                </I18nextProvider>
            </Provider>
        );
    }
}