import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Header, Icon, ListItem} from 'react-native-elements';

import {Menu} from '../../components/common';

export default class ClientsListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:clients'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="group"
                    color={tintColor}
                />
            }
        }
    };

    state = {
        list: [
            {
                name: 'Client 1',
                subtitle: 'Address 1'
            },
            {
                name: 'Client 2',
                subtitle: 'Address 2'
            },
            {
                name: 'Client 3',
                subtitle: 'Address 3'
            },
            {
                name: 'Client 4',
                subtitle: 'Address 4'
            }
        ]
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:clients'), style: {color: '#fff', fontSize: 20}}}
                />
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
                                subtitle={l.subtitle}
                                containerStyle={containerStyle}
                            />)
                        })
                    }
                </ScrollView>
            </View>
        );
    };
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