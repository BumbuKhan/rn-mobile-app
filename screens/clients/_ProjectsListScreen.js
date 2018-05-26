import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class _ProjectsListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {params} = navigation.state;

        return {
            title: `${params.headerTitle}'s Projects`
        }
    };

    state = {
        list: [
            {
                name: 'Project 1',
            },
            {
                name: 'Project 2',
            },
            {
                name: 'Project 3',
            }
        ]
    };

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#f7f7f7',
                paddingTop: 30
            }}>
                {
                    this.state.list.map((l, i) => {
                        let containerStyle = [styles.listItem, styles.listItemBorder];

                        if (i !== this.state.list.length - 1) {
                            containerStyle.push(styles.listItemNoBorderBottom);
                        }

                        return (<ListItem
                            key={i}
                            title={l.name}
                            titleStyle={styles.listItemTitleStyle}
                            containerStyle={containerStyle}
                            onPress={() => this.props.navigation.navigate('ProjectDetails', {
                                headerTitle: l.name
                            })}
                        />)
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
    },
    listItemBorder: {
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },
    listItemNoBorderBottom: {
        borderBottomWidth: 0
    },
    listItemTitleStyle: {
        fontSize: 18
    }
});