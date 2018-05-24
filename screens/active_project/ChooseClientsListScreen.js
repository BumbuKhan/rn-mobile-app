import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

export default class ChooseClientListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            //title: screenProps.t('screens:active project:choose client:title')
            title: 'Choose client'
        }
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView>

                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder, styles.mt30]}
                        title="Client 1"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={false}
                        onPress={() => {}}
                        rightIcon={<Icon name='check'/>}
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="Client 2"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={true}
                        onPress={() => {}}
                        rightIcon={<Icon name='check'/>}
                    />

                    <ListItem
                        containerStyle={[styles.listItem]}
                        title="Client 1"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron={true}
                        onPress={() => {}}
                        rightIcon={<Icon name='check'/>}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },
    listItemBorder: {
        borderTopWidth: 1
    },
    listItemTitleStyle: {
        fontSize: 18
    },
    mt30: {
        marginTop: 30
    }
});