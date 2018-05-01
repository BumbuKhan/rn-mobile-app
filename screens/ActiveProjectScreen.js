import React, {Component} from 'react';
import {View, Text, AsyncStorage, Button} from 'react-native';
import {Header} from 'react-native-elements';

import Menu from '../components/Menu';

export default class ActiveProjectScreen extends Component {
    _signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <View>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: 'Active Project', style: {color: '#fff', fontSize: 20}}}
                />
                <View>
                    <Text>Home screen</Text>
                    <Button
                        title="Sign out"
                        onPress={this._signOut}
                    />
                </View>
            </View>
        );
    };
}