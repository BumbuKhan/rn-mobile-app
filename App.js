import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {Text} from 'react-navigation';
import {I18nextProvider, translate} from 'react-i18next';
import {PersistGate} from 'redux-persist/integration/react';

import i18n from './locales/i18n';
import {store, persistor} from './store';

import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";
import ActiveProjectScreen from './screens/active_project/ActiveProjectScreen';
import MyAccountScreen from './screens/my_account/MyAccountScreen';
import SignInScreen from "./screens/auth/SignInScreen";
import ChooseLanguageScreen from "./screens/my_account/ChooseLanguageScreen";
import EditProfileScreen from "./screens/my_account/EditProfilescreen";
import ClientsListScreen from "./screens/clients/ClientsListScreen";
import MyHoursScreen from "./screens/my_hours/MyHoursScreen";
import VacationScreen from "./screens/vacation/VacationScreen";
import HistoryScreen from "./screens/history/HistoryScreen";
import _ProjectsListScreen from "./screens/clients/ProjectsListScreen";
import ProjectDetailsScreen from "./screens/clients/ProjectDetailsScreen";
import ChooseClientsScreen from "./screens/active_project/ChooseClientsScreen";
import ChooseProjectScreen from "./screens/active_project/ChooseProjectScreen";
import ChooseTaskScreen from "./screens/active_project/ChooseTaskScreen";
import ChooseActivityScreen from "./screens/active_project/ChooseActivityScreen";

// we'll describe all screens that are shown to authenticated user here
const AppStack = DrawerNavigator({
    ActiveProject: StackNavigator({
        ActiveProjectScreen: {
            screen: ActiveProjectScreen
        },
        ChooseClient: {
            screen: ChooseClientsScreen
        },
        ChooseProject: {
            screen: ChooseProjectScreen
        },
        ChooseTask: {
            screen: ChooseTaskScreen
        },
        ChooseActivity: {
            screen: ChooseActivityScreen
        }
    }, {
        initialRouteName: 'ActiveProjectScreen'
    }),
    Clients: StackNavigator({
        ClientsList: {
            screen: ClientsListScreen
        },
        ProjectsList: {
            screen: _ProjectsListScreen
        },
        ProjectDetails: {
            screen: ProjectDetailsScreen
        }
    }, {
        initialRouteName: 'ClientsList'
    }),
    MyHours: {
        screen: MyHoursScreen
    },
    Vacation: {
        screen: VacationScreen
    },
    History: {
        screen: HistoryScreen
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
    initialRouteName: 'Clients'
});

const RootStack = SwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: TabNavigator({
        SignIn: SignInScreen,
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
                <PersistGate loading={null} persistor={persistor}>
                    <I18nextProvider i18n={i18n}>
                        <ReloadAppOnLanguageChange/>
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        );
    }
}