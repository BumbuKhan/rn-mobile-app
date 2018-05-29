import {Font} from 'expo';
import React, {Component} from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    ActivityIndicator,
    Dimensions,
    TextInput
} from 'react-native';
import {Header, Icon, Button, CheckBox, Text, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import ActionSheet from 'react-native-actionsheet';

import {Menu, Plus, ListItemDescription, ListItemTitle} from '../../components/common';
import * as actions from '../../actions';

const images = [
    {
        url: 'http://jandjcleaningservices.com.au/wp-content/uploads/2015/03/Factory-Cleaning-Services-Melbourne.jpg'
    },
    {
        url: 'http://mckinseychina.com/wp-content/uploads/2014/04/robots669x400.jpg'
    },
    {
        url: 'https://si.wsj.net/public/resources/images/BN-UX263_3bywu_OR_20170831081022.jpg?width=1260&height=840'
    },
    {
        url: 'https://cdn.static-economist.com/sites/default/files/images/print-edition/20150314_BBP001_0.jpg'
    },
    {
        url: 'https://ediewater.s3.amazonaws.com/features/images/r_890-factory-thinking-is-it-time-for-offsite-build-in-the-water-industry-.jpg'
    }
];

class ActiveProjectScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: screenProps.t('drawer menu:active project'),
            drawerIcon: ({tintColor}) => {
                return <Icon
                    name="timer"
                    color={tintColor}
                />
            },
            header: false
        }
    };

    state = {
        fontLoaded: false,
        projectTypeModalVisible: false,
        isTimerSemicolonVisible: true,
        isImageViewerVisible: false,
        imageViewerCurIndex: 0,

        isProjectCompleted: false, // will be replaced to the props from redux
        expensesNeeded: false,
        noticesNeeded: false,
        moreStuffNeeded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'digital-7-italic': require('../../assets/fonts/digital-7-italic.ttf')
        });

        this.setState({fontLoaded: true});
    }

    componentWillMount = () => {
        if (this.props.activeProject.isTimerActive) {
            this._initBlinkTimer();
        }

        if (this.props.activeProject.isTimerActive) {
            this._initUpdateTimer();
        }
    };

    componentWillReceiveProps = (props) => {
        if (props.activeProject.isTimerActive) {
            this._initBlinkTimer();
            this._initUpdateTimer();
        } else {
            this._removeBlinkTimer();
            this._removeUpdateTimer();
        }
    };

    componentWillUnmount = () => {
        // removing all timers...
        this._removeBlinkTimer();
        this._removeUpdateTimer();
    };

    _initBlinkTimer = () => {
        // user has started time tracking
        // we should init setInterval in order to add blink effect to timer's semicolon (00:01)

        if (!this.blinkTimer) {
            this.blinkTimer = setInterval(() => {
                this.setState({
                    isTimerSemicolonVisible: !this.state.isTimerSemicolonVisible
                });
            }, 1000);
        }
    };

    _removeBlinkTimer = () => {
        if (this.blinkTimer) {
            clearInterval(this.blinkTimer);
            this.blinkTimer = null;
        }

        // user has stopped time tracking, so making semicolon visible
        this.setState({
            isTimerSemicolonVisible: true
        });
    };

    _initUpdateTimer = () => {
        if (!this.updateTimer) {
            this.updateTimer = setInterval(() => {
                this.props.updateTimer();
            }, 5000);
        }
    };

    _removeUpdateTimer = () => {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    };

    _setProjectTypeModalVisible(visible) {
        this.setState({
            projectTypeModalVisible: visible
        });
    }

    _getHours = () => {
        let hours = Math.floor(this.props.activeProject.vastedTime / (3600)).toString();

        // adding leading zero if needed
        if (hours.length === 1) {
            return `0${hours}`;
        }

        return hours;
    };

    _getMinutes = () => {
        let minutes = Math.floor((this.props.activeProject.vastedTime % (3600)) / 60).toString();

        // adding leading zero if needed
        if (minutes.length === 1) {
            return `0${minutes}`;
        }

        return minutes;
    };

    _renderTimer = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        return (
            <View style={[styles.mt30]}>
                <View style={[styles.timerWrapper, {borderColor: '#e0e0e0', borderTopWidth: 1, borderBottomWidth: 1}]}>
                    <View>
                        {
                            this.state.fontLoaded ? (
                                <Text style={styles.timerText}>
                                    {this._getHours()}
                                    <Text
                                        style={((this.state.isTimerSemicolonVisible) ? styles.colorBlack : styles.colorWhite)}>:</Text>
                                    {this._getMinutes()}
                                </Text>
                            ) : null
                        }
                    </View>
                    <View style={[styles.timerButtonWrapper]}>
                        <TouchableOpacity
                            onPress={() => this.props.toggleTimer(!this.props.activeProject.isTimerActive)}>
                            <Icon
                                name={(this.props.activeProject.isTimerActive) ? "pause-circle-outline" : "play-circle-outline"}
                                size={65}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ListItemDescription
                    title="You can close the app while timer is running"
                />
            </View>
        );
    };

    _renderProjectType = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        return (
            <View style={[styles.mt30]}>
                <ListItem
                    hideChevron={true}
                    rightTitle={this.props.activeProject.type}
                    title="Project's type"
                    titleStyle={[styles.listItemTitleStyle]}
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                />
            </View>
        );
    };

    _renderRemoveProjectBtn = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View style={{marginBottom: 20, marginTop: 20}}>
                <Button
                    title={t('screens:active project:remove project button text')}
                    buttonStyle={{
                        backgroundColor: 'transparent'
                    }}
                    textStyle={{
                        fontSize: 18,
                        color: 'red'
                    }}
                    icon={{
                        name: 'delete-forever',
                        color: 'red'
                    }}
                    borderRadius={3}
                    onPress={() => {
                        Alert.alert(
                            t('screens:active project:remove project confirm title'),
                            t('screens:active project:remove project confirm description'),
                            [
                                {
                                    text: t('common:cancel'),
                                    onPress: () => {
                                    }, style: 'cancel'
                                },
                                {
                                    text: t('common:ok'),
                                    onPress: () => {
                                        // clearing out timers first
                                        this._removeUpdateTimer();
                                        this._removeBlinkTimer();

                                        this.props.removeProject();
                                    }
                                },
                            ],
                            {cancelable: false}
                        )
                    }}
                />
            </View>)
    };

    _renderStopProjectBtn = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        let title = (!this.state.isProjectCompleted) ?
            t('screens:active project:stop project for today button text') :
            t('screens:active project:stop project button text');

        let backgroundColor = (!this.state.isProjectCompleted) ? '#0ec86c' : 'red';

        return (
            <View style={[styles.mt30]}>
                <Button
                    disabled={false}
                    title={title}
                    buttonStyle={{
                        backgroundColor,
                    }}
                    borderRadius={3}
                    textStyle={{
                        fontSize: 18
                    }}
                    onPress={() => {
                        Alert.alert(
                            t('screens:active project:stop project confirm title'),
                            t('screens:active project:stop project confirm description'),
                            [
                                {
                                    text: t('common:cancel'),
                                    onPress: () => {
                                    }, style: 'cancel'
                                },
                                {
                                    text: t('common:ok'),
                                    onPress: () => {
                                        //this.props.saveProject()
                                    }
                                },
                            ],
                            {cancelable: false}
                        )
                    }}
                />
            </View>)
    };

    _renderNoActiveProjectText = () => {
        if (this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
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
        );
    };

    _renderProjectTypeModal = () => {
        const {t} = this.props.screenProps;

        return (<Modal
            animationType="slide"
            transparent={false}
            visible={this.state.projectTypeModalVisible}>

            <View style={styles.modalContainer}>
                <View style={{
                    alignSelf: 'flex-start',
                    paddingLeft: 15
                }}>
                    <TouchableOpacity onPress={() => {
                        this._setProjectTypeModalVisible(false)
                    }}>
                        <Icon
                            name='close'
                            color='black'
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.modalHeader}>
                        <Text h3>{t("screens:active project:project type modal title")}</Text>
                    </View>

                    <View style={[styles.modalCheckboxWrapper, {borderTopWidth: 1, borderTopColor: '#e0e0e0'}]}>
                        <CheckBox
                            title='STN'
                            checked={this.props.activeProject.type === 'STN'}
                            iconType='material'
                            checkedIcon="radio-button-checked"
                            uncheckedIcon="radio-button-unchecked"
                            checkedColor="#496FC2"
                            containerStyle={styles.modalCheckboxContainer}
                            onPress={() => {
                                this.props.toggleType('STN');
                            }}
                        />
                        <View style={styles.modalCheckboxSubtitleContainer}>
                            <Text
                                style={styles.modalCheckboxSubtitle}>{t("common:stn job type description")}</Text>
                        </View>
                    </View>

                    <View style={styles.modalCheckboxWrapper}>
                        <CheckBox
                            title='BTN'
                            checked={this.props.activeProject.type === 'BTN'}
                            iconType='material'
                            checkedIcon="radio-button-checked"
                            uncheckedIcon="radio-button-unchecked"
                            checkedColor="#496FC2"
                            containerStyle={styles.modalCheckboxContainer}
                            onPress={() => {
                                this.props.toggleType('BTN');
                            }}
                        />
                        <View style={styles.modalCheckboxSubtitleContainer}>
                            <Text
                                style={styles.modalCheckboxSubtitle}>{t("common:btn job type description")}</Text>
                        </View>
                    </View>

                    <View style={styles.modalCheckboxWrapper}>
                        <CheckBox
                            title='ATN'
                            checked={this.props.activeProject.type === 'ATN'}
                            iconType='material'
                            checkedIcon="radio-button-checked"
                            uncheckedIcon="radio-button-unchecked"
                            checkedColor="#496FC2"
                            containerStyle={styles.modalCheckboxContainer}
                            onPress={() => {
                                this.props.toggleType('ATN');
                            }}
                        />
                        <View style={styles.modalCheckboxSubtitleContainer}>
                            <Text
                                style={styles.modalCheckboxSubtitle}>{t("common:atn job type description")}</Text>
                        </View>
                    </View>

                </View>

                <View style={{
                    marginTop: 35,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    <Button
                        title={t("screens:active project:create project")}
                        buttonStyle={{
                            backgroundColor: '#496FC2',
                        }}
                        borderRadius={3}
                        textStyle={{
                            fontSize: 18
                        }}
                        onPress={() => {
                            this.props.createProject();
                            this._setProjectTypeModalVisible(false);
                        }}
                    />
                </View>
            </View>
        </Modal>);
    };

    // main (the required fields)
    _renderProjectMainFields = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View>
                <ListItemTitle
                    title={t('screens:active project:main fields')}
                />

                <ListItem
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                    title="Client"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle="Factory masters"
                    onPress={() => {
                        this.props.navigation.navigate('ChooseClient');
                    }}
                />

                <ListItem
                    containerStyle={[styles.listItem]}
                    title="Project"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle="Tools fixes"
                    onPress={() => {
                        this.props.navigation.navigate('ChooseProject');
                    }}
                />

                <ListItem
                    containerStyle={[styles.listItem]}
                    title="Task"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle="Fix all screwdrivers"
                    onPress={() => {
                        this.props.navigation.navigate('ChooseTask');
                    }}
                />

                <ListItem
                    containerStyle={[styles.listItem]}
                    title="Activity"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle="Assist lead master"
                    onPress={() => {
                        this.props.navigation.navigate('ChooseActivity');
                    }}
                />
            </View>
        );
    };

    _renderExpenses = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View>
                <ListItemTitle
                    title={t('screens:active project:expenses')}
                />

                <ListItem
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                    title="Expenses from the stock"
                    titleStyle={styles.listItemTitleStyle}
                    hideChevron
                    switchButton
                    onSwitch={(state) => {
                        this.setState({
                            expensesNeeded: state
                        });
                    }}
                    switched={this.state.expensesNeeded}
                    onPress={() => {
                    }}
                />

                {this.state.expensesNeeded && (
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            multiline={true}
                            editable={true}
                            numberOfLines={10}
                            placeholder="Type your expences here..."
                            style={{
                                fontSize: 16,
                                color: 'gray'
                            }}
                        />
                    </View>
                )}
            </View>
        );
    };

    _renderNotices = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View style={styles.mt30}>
                <ListItem
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                    title={t('screens:active project:notices')}
                    titleStyle={styles.listItemTitleStyle}
                    hideChevron
                    switchButton
                    onSwitch={(state) => {
                        this.setState({
                            noticesNeeded: state
                        });
                    }}
                    switched={this.state.noticesNeeded}
                    onPress={() => {
                    }}
                />

                {this.state.noticesNeeded && (
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            multiline={true}
                            editable={true}
                            numberOfLines={10}
                            placeholder="Type your notices here..."
                            style={{
                                fontSize: 16,
                                color: 'gray'
                            }}
                        />
                    </View>
                )}

                <ListItemDescription
                    title="You can leave some reminders here"
                />
            </View>
        );
    };

    _renderMoreStuff = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View style={styles.mt30}>
                <ListItem
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                    title={t('screens:active project:more stuff')}
                    titleStyle={styles.listItemTitleStyle}
                    hideChevron
                    switchButton
                    onSwitch={(state) => {
                        this.setState({
                            moreStuffNeeded: state
                        });
                    }}
                    switched={this.state.moreStuffNeeded}
                    onPress={() => {
                    }}
                />

                {this.state.moreStuffNeeded && (
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            multiline={true}
                            editable={true}
                            numberOfLines={10}
                            placeholder="Type needed stuff here..."
                            style={{
                                fontSize: 16,
                                color: 'gray'
                            }}
                        />
                    </View>
                )}

                <ListItemDescription
                    title="If you couldn't find needed stuff in the stock - feel free to add it here"
                />
            </View>
        );
    };

    _renderTimeManagement = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View>
                <ListItemTitle
                    title={t('screens:active project:time')}
                />

                <ListItem
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                    title="Time for the project"
                    titleStyle={styles.listItemTitleStyle}
                    hideChevron
                    rightTitle="40 hour(s)"
                />

                <ListItem
                    containerStyle={[styles.listItem]}
                    title="Spent hours"
                    titleStyle={styles.listItemTitleStyle}
                    hideChevron
                    rightTitle="13 hour(s)"
                />

                <ListItem
                    containerStyle={[styles.listItem]}
                    title="Deadline date"
                    titleStyle={styles.listItemTitleStyle}
                    hideChevron
                    rightTitle="20 July 2018"
                />
            </View>
        );
    };

    _renderAdditionalInfo = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View style={[styles.mt30, {
                paddingLeft: 20,
                paddingRight: 20
            }]}>
                <View>
                    <Text style={{
                        fontWeight: 'bold',
                        marginBottom: 5,
                        fontSize: 17
                    }}>
                        This is the additional info from admin
                    </Text>
                </View>
                <Text style={{
                    fontSize: 15
                }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique ligula sodales nisi
                    molestie tempus. Etiam id laoreet sem. In at tempor lacus, sed mattis orci. Donec eros nisi, aliquam
                    vitae quam eget, placerat posuere dolor.</Text>
            </View>
        );
    };

    _renderPhotos = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View>
                <ListItemTitle
                    title="PHOTOS"
                />

                <View style={[styles.photoScrollView, {borderColor: '#e0e0e0', borderTopWidth: 1,}]}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>

                            {images.map((image, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            this.setState({
                                                isImageViewerVisible: true,
                                                imageViewerCurIndex: i
                                            });
                                        }}>
                                        <Image
                                            style={{width: 100, height: 80, marginRight: 5}}
                                            source={{uri: image.url}}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>

                <View style={[styles.photoChooseBtnWrapper, {borderColor: '#e0e0e0', borderBottomWidth: 1}]}>
                    <View style={{
                        borderTopColor: '#e0e0e0',
                        borderTopWidth: 1,
                        flex: 1
                    }}>
                        <Button
                            title="Add Photo"
                            buttonStyle={{
                                backgroundColor: 'transparent'
                            }}
                            textStyle={{
                                fontSize: 18,
                                color: '#496FC2'
                            }}
                            icon={{
                                name: 'camera-alt',
                                color: '#496FC2',
                                size: 24
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('Camera');
                            }}
                        />
                    </View>
                </View>

                <Modal visible={this.state.isImageViewerVisible} transparent={true}>
                    <ImageViewer
                        style={{flex: 1}}
                        imageUrls={images}
                        index={this.state.imageViewerCurIndex}
                        onSwipeDown={() => {
                            this.setState({
                                isImageViewerVisible: false
                            });
                        }}
                        loadingRender={() => {
                            const {height} = Dimensions.get('window');

                            return (
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: height / 2
                                }}>
                                    <ActivityIndicator/>
                                </View>
                            );
                        }}
                        renderHeader={() => {
                            return (
                                <Header
                                    backgroundColor="black"
                                    leftComponent={(
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    isImageViewerVisible: false
                                                })
                                            }}
                                        >
                                            <Icon
                                                name="close"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    )}
                                    rightComponent={(
                                        <TouchableOpacity
                                            onPress={this.showActionSheet}
                                        >
                                            <Icon
                                                name="more-horiz"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    )}
                                    centerComponent={{
                                        text: `${this.state.imageViewerCurIndex + 1}/${images.length}`,
                                        style: {color: '#fff'}
                                    }}
                                />
                            )
                        }}
                        renderIndicator={() => {
                        }}
                        onChange={(e) => {
                            this.setState({
                                imageViewerCurIndex: e
                            })
                        }}
                    />
                </Modal>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Delete', 'Cancel']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={(index) => {
                        console.log('index', index);
                    }}
                />
            </View>
        );
    };

    showActionSheet = () => {
        this.ActionSheet.show()
    };

    _renderProjectStatus = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const {t} = this.props.screenProps;

        return (
            <View>
                <View style={[styles.mt30]}>
                    <ListItem
                        containerStyle={[styles.listItem, styles.listItemBorder]}
                        title="Project is completed"
                        titleStyle={styles.listItemTitleStyle}
                        hideChevron
                        switchButton
                        onSwitch={(isProjectCompleted) => {
                            this.setState({
                                isProjectCompleted
                            });
                        }}
                        switched={this.state.isProjectCompleted}
                    />
                </View>

                <ListItemDescription
                    title="Turn it on only if you're completely done with the project"
                />
            </View>
        );
    };

    render() {
        const {t} = this.props.screenProps;

        return (
            <View style={{flex: 1}}>
                {this._renderProjectTypeModal()}

                <Header
                    statusBarProps={{
                        barStyle: 'light-content'
                    }}
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{text: t('drawer menu:active project'), style: {color: '#fff', fontSize: 20}}}
                    rightComponent={(!this.props.activeProject.isCreated) ? <Plus onPress={() => {
                        this._setProjectTypeModalVisible(true);
                    }}/> : null}
                />
                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>
                    {this._renderNoActiveProjectText()}

                    {this._renderTimer()}
                    {this._renderProjectType()}

                    {this._renderProjectMainFields()}
                    {this._renderExpenses()}

                    {this._renderTimeManagement()}

                    {this._renderPhotos()}

                    {this._renderNotices()}
                    {this._renderMoreStuff()}

                    {this._renderAdditionalInfo()}

                    {this._renderProjectStatus()}

                    {this._renderStopProjectBtn()}
                    {this._renderRemoveProjectBtn()}
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 35
    },
    modalHeader: {
        marginTop: 30,
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20
    },
    modalCheckboxContainer: {
        borderWidth: 0,
        backgroundColor: "white",
        marginBottom: 0,
        paddingBottom: 0
    },
    modalCheckboxSubtitleContainer: {
        marginLeft: 55
    },
    modalCheckboxSubtitle: {
        color: 'gray'
    },
    modalCheckboxWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 10
    },

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
    },

    timerWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    timerText: {
        fontFamily: 'digital-7-italic',
        fontSize: 60,
        fontWeight: 'bold'
    },
    colorWhite: {
        color: 'white'
    },
    colorBlack: {
        color: 'black'
    },

    photoScrollView: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    photoChooseBtnWrapper: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },

    textInputWrapper: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15
    }
});

function mapStateToProps({activeProject}) {
    return {activeProject}
}

export default connect(mapStateToProps, actions)(ActiveProjectScreen);