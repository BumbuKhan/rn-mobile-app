import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import {Menu} from '../../components/common';

export default class ClientsListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:history'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="history"
                    color={tintColor}
                />
            }
        }
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View>
                <Header
                    statusBarProps={{
                        barStyle: 'light-content'
                    }}
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:history'), style: {color: '#fff', fontSize: 20}}}
                />
                <View>
                    <Text style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        color: '#999'
                    }}>{t('screens:history:no content')}</Text>
                </View>
            </View>
        );
    };
}