import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

export default class ProjectsListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {params} = navigation.state;

        return {
            title: `${params.headerTitle}'s Details`
        }
    };

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#f7f7f7',
                paddingTop: 30
            }}>
                <View style={{marginLeft: 20, marginRight: 20}}>
                    <Text style={{textAlign: 'center'}}>Project's details will be here</Text>
                </View>
            </ScrollView>
        );
    }
}