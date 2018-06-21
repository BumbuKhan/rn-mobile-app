import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class ProjectsListScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params } = navigation.state;

        return {
            title: `${params.headerTitle}'s Details`,
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name="chevron-left"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                /* this only styles the title/text (font, color etc.)  */
                color: 'white'
            },
            headerStyle: {
                /* this will style the header, but does NOT change the text */
                backgroundColor: '#496FC2'
            }
        }
    };

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView style={{
                    backgroundColor: '#f7f7f7',
                    paddingTop: 30
                }}>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ textAlign: 'center' }}>Project's details will be here</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}