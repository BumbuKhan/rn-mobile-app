import React, {Component} from 'react';
import {View, Text, AsyncStorage, Button} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import {Menu, Plus} from '../../components/common/index';

export default class ActiveProjectScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:active project'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="timer"
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
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:active project'), style: {color: '#fff', fontSize: 20}}}
                    rightComponent={<Plus onPress={() => {
                        alert('Showing add project form')
                    }}/>}
                />
                <View>
                    <Text style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        color: '#999'
                    }}>{t('screens:active project:no active project text 1')}</Text>

                    <Text style={{
                        alignSelf: 'center',
                        color: '#999'
                    }}>{t('screens:active project:no active project text 2')}</Text>
                </View>
            </View>
        );
    };
}