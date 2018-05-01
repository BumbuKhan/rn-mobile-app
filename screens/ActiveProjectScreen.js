import React, {Component} from 'react';
import {View, Text, AsyncStorage, Button} from 'react-native';

export default class ActiveProjectScreen extends Component {
    /*static navigationOptions = {
        title: "Active Project",
    };*/

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: "Active Project",
            headerLeft: (
                <Button
                    title="Menu"
                    onPress={() => {params.navigate('DrawerOpen')}}
                />
            )
        }
    };

    constructor(props) {
        super(props);

        this.props.navigation.setParams({
            navigate: this.props.navigation.navigate
        });
    }

    _signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Home screen</Text>
                <Button
                    title="Sign out"
                    onPress={this._signOut}
                />
            </View>
        );
    };
}