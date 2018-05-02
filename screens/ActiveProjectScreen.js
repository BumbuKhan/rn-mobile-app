import React, {Component} from 'react';
import {View, Text, AsyncStorage, Button} from 'react-native';
import {Header} from 'react-native-elements';

import Menu from '../components/Menu';

export default class ActiveProjectScreen extends Component {
    static navigationOptions = {
      title: 'Active Project'
    };

    /*_signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };*/

    render() {
        return (
            <View>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: 'Active Project', style: {color: '#fff', fontSize: 20}}}
                />
                <View>
                    <Text style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        color: '#999'
                    }}>No active project so far</Text>

                    <Text style={{
                        alignSelf: 'center',
                        color: '#999'
                    }}>Press '+' to create one</Text>
                </View>
            </View>
        );
    };
}