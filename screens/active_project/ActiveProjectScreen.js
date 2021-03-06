import _ from 'lodash';
import moment from 'moment';
import { Font, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import {
    Platform,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    ActivityIndicator,
    Dimensions,
    TextInput,
    StatusBar
} from 'react-native';
import { Header, Icon, Button, CheckBox, Text, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import ActionSheet from 'react-native-actionsheet';

import { Menu, Plus, ListItemDescription, ListItemTitle } from '../../components/common';
import * as actions from '../../actions';
import { PROJECT_CATEGORIES } from '../../helpers/api_endpoints';
import axios from '../../helpers/axios';

const ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true
};

class ActiveProjectScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: screenProps.t('drawer menu:active project'),
            drawerIcon: ({ tintColor }) => {
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
        moreStuffNeeded: false,
        hasCameraRollPermission: null,
        barStyle: 'light-content',
        isBarHidden: false,
        recentlyActiveProjectShowAll: false // by default we're not displaying all list
    };

    componentWillMount = () => {
        const { t } = this.props.screenProps;

        if (this.props.activeProject.isTimerActive) {
            this._initBlinkTimer();
            this._initUpdateTimer(); 
        }

        // fetching project categories '/api/categories'
        const authStr = `Bearer ${this.props.user.token.access_token}`;
        axios
            .get(PROJECT_CATEGORIES, { headers: { Authorization: authStr } })
            .then((_response) => {
                const response = _response.data;
                const { data } = response;

                if (!response.success) {
                    throw new Error('Something went wrong, please try later');
                }

                this.props.updateCategories(data);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                } else if (error.request) {
                    // No internet connection...
                    Alert.alert(
                        t("common:no internet connection"),
                        t("common:please make sure that you have got an internet connection"),
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error);
                }
            });
    };

    async componentDidMount() {
        await Font.loadAsync({
            'digital-7-italic': require('../../assets/fonts/digital-7-italic.ttf')
        });

        this.setState({ fontLoaded: true });
    }

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

    /**
     * 'theme' either 'light' or 'dark'
     */
    _setStatusBar = (theme) => {
        const barStyle = (theme === 'dark') ? 'dark-content' : 'light-content';
        this.setState({ barStyle });
    }

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

    _setProjectCategoriesModalVisible(visible) {
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
                <View style={[styles.timerWrapper, { borderColor: '#e0e0e0', borderTopWidth: 1, borderBottomWidth: 1 }]}>
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

        const projectCat = this.props.projectCategories.filter((category) => category.id == this.props.activeProject.type)
        const rightTitle = projectCat[0].name;

        return (
            <View style={[styles.mt30]}>
                <ListItem
                    hideChevron={true}
                    rightTitle={rightTitle}
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

        const { t } = this.props.screenProps;

        return (
            <View style={{ marginBottom: 20, marginTop: 20 }}>
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

                                        // removing this project from redux 'projects' key
                                        this.props.deleteProject(this.props.activeProject.id);

                                        // removing active project from redux 'activeProject' key
                                        this.props.removeActiveProject();
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                    }}
                />
            </View>)
    };

    _renderStopProjectBtn = () => {
        if (!this.props.activeProject.isCreated) {
            return;
        }

        const { t } = this.props.screenProps;

        let title = (!this.state.isProjectCompleted) ?
            t('screens:active project:stop project temporarily button text') :
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
                                        this._stopProjectTemporarily();
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                    }}
                />
            </View>)
    };

    _stopProjectTemporarily = () => {
        // first we should stop timer if it's running...
        if (this.props.activeProject.isTimerActive) {
            this.props.toggleTimer(false);
        }

        // we should find the project (that is about to be stopped) in 'projects' key
        // and remove it, then we should add again, since the information (timer data, photos and e.t.c)
        // might be updated...
        this.props.deleteProject(this.props.activeProject.id);
        // adding again...
        this.props.addProject(this.props.activeProject);

        // cleaning out the activeProject...
        this.props.cleanProject();
    };

    _renderNoActiveProjectText = () => {
        if (this.props.activeProject.isCreated) {
            return;
        }

        const { t } = this.props.screenProps;

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

    _renderProjectCategoriesModal = () => {
        const { t } = this.props.screenProps;

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
                        this._setProjectCategoriesModalVisible(false);
                        this._setStatusBar('light');
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

                    {this.props.projectCategories.map((category, index) => {
                        const _style = [styles.modalCheckboxWrapper];

                        if (index === 0) {
                            _style.push({ borderTopWidth: 1, borderTopColor: '#e0e0e0' });
                        }

                        return (
                            <View key={index} style={_style}>
                                <CheckBox
                                    title={category.name}
                                    checked={this.props.activeProject.type === category.id}
                                    iconType='material'
                                    checkedIcon="radio-button-checked"
                                    uncheckedIcon="radio-button-unchecked"
                                    checkedColor="#496FC2"
                                    containerStyle={styles.modalCheckboxContainer}
                                    onPress={() => {
                                        this.props.toggleType(category.id);
                                    }}
                                />
                                <View style={styles.modalCheckboxSubtitleContainer}>
                                    <Text
                                        style={styles.modalCheckboxSubtitle}>{category.description}</Text>
                                </View>
                            </View>
                        );
                    })}
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
                        disabled={!this.props.activeProject.type}
                        onPress={() => {
                            // creating the project
                            this.props.createProject();

                            // TODO: I should come up with a better solution!
                            // waiting for a sec, while project is creating...
                            setTimeout(() => {
                                // adding created project to 'projects' array
                                this.props.addProject(this.props.activeProject);
                            }, 1000);

                            // closing modal window
                            this._setProjectCategoriesModalVisible(false);

                            this._setStatusBar('light');
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

        const { t } = this.props.screenProps;

        return (
            <View>
                <ListItemTitle
                    title={t('screens:active project:main fields')}
                />

                <ListItem
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                    title="Client"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle={this.props.activeProject.currentClient.searchStr || 'Select client'}
                    onPress={() => {
                        this.props.navigation.navigate('ChooseClient');
                    }}
                />

                <ListItem
                    disabled={!this.props.activeProject.currentClient.id}
                    containerStyle={[styles.listItem]}
                    title="Project"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle={this.props.activeProject.currentProject.searchStr || 'Select project'}
                    onPress={() => {
                        this.props.navigation.navigate('ChooseProject');
                    }}
                />

                <ListItem
                    disabled={!this.props.activeProject.currentProject.id}
                    containerStyle={[styles.listItem]}
                    title="Task"
                    titleStyle={styles.listItemTitleStyle}
                    rightTitle={this.props.activeProject.currentTask.searchStr || 'Select task'}
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

        const { t } = this.props.screenProps;

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

        const { t } = this.props.screenProps;

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

        const { t } = this.props.screenProps;

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

        const { t } = this.props.screenProps;

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

        const { t } = this.props.screenProps;

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

        const { t } = this.props.screenProps;

        // we need to slightly modify the this.props.activeProject.photos array structure
        // so it should like this:
        /*
        [
            {
                url: 'data:image/jpg;base64,asdkasdqweqweqwe...qasdasdweqwe'
            }
            ...
        ]
        */

        const images = this.props.activeProject.photos.map((image) => {
            return {
                url: `data:image/jpg;base64,${image.base64}`
            }
        })

        return (
            <View>
                <ListItemTitle
                    title="PHOTOS"
                />

                <View style={[styles.photoScrollView, { borderColor: '#e0e0e0', borderTopWidth: 1, }]}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>

                            {(!this.props.activeProject.photos.length) ? (
                                <Text>No photo</Text>
                            ) : (
                                    this.props.activeProject.photos.map((image, i) => {
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
                                                    style={{ width: 100, height: 80, marginRight: 5 }}
                                                    source={{ uri: `data:image/jpg;base64,${image.base64}` }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                )}
                        </View>
                    </ScrollView>
                </View>

                <View style={[styles.photoChooseBtnWrapper, { borderColor: '#e0e0e0', borderBottomWidth: 1 }]}>
                    <View style={{
                        borderTopColor: '#e0e0e0',
                        borderTopWidth: 1,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <View>
                            <Button
                                title="Take Photo"
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
                        <View>
                            <Button
                                title="Browse"
                                buttonStyle={{
                                    backgroundColor: 'transparent'
                                }}
                                textStyle={{
                                    fontSize: 18,
                                    color: '#496FC2'
                                }}
                                icon={{
                                    name: 'insert-photo',
                                    color: '#496FC2',
                                    size: 24
                                }}
                                onPress={async () => {
                                    this.setState({
                                        barStyle: 'dark-content'
                                    });

                                    // according to the https://docs.expo.io/versions/v27.0.0/sdk/imagepicker#expoimagepickerlaunchimagelibraryasyncoptions
                                    // we should grant camera roll permission to pick up a photo from the user's gallery (only on IOS)
                                    if (Platform.OS === 'ios') {
                                        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                                        this.setState({ hasCameraRollPermission: status === 'granted' });
                                    }

                                    const image = await ImagePicker.launchImageLibraryAsync(ImagePickerOptions);

                                    this.setState({
                                        barStyle: 'light-content'
                                    });

                                    if (!image.cancelled) {
                                        const pickedImage = [{
                                            base64: image.base64
                                        }];

                                        this.props.addPhotos(pickedImage);
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>

                <Modal visible={this.state.isImageViewerVisible} transparent={true}>
                    <ImageViewer
                        style={{ flex: 1 }}
                        imageUrls={images}
                        index={this.state.imageViewerCurIndex}
                        onSwipeDown={() => {
                            this.setState({
                                isImageViewerVisible: false
                            });
                        }}
                        loadingRender={() => {
                            const { height } = Dimensions.get('window');

                            return (
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: height / 2
                                }}>
                                    <ActivityIndicator />
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
                                                });
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
                                        style: { color: '#fff' }
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
                        if (index === 0) {
                            // checking if the removed image was the last one, then closing the imageViewer
                            // since there is no image to look through
                            if (this.props.activeProject.photos.length === 1) {
                                this.setState({
                                    isImageViewerVisible: false
                                });
                            }

                            // deleting the image...
                            this.props.removePhoto(this.state.imageViewerCurIndex);

                            // ImageViewer shows nothing (black background to be precise) when removing an image with index > 1
                            // In order to solve this issue we should kinda swipe image to left by force...
                            // we can achive that by decrementing this.state.imageViewerCurIndex
                            if (this.state.imageViewerCurIndex >= 1) {
                                this.setState({
                                    imageViewerCurIndex: this.state.imageViewerCurIndex - 1
                                });
                            }
                        }
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

        const { t } = this.props.screenProps;

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

    _renderRecentlyActiveProjects = () => {
        const { projects, activeProject } = this.props;

        if (activeProject.isCreated || !projects.length) {
            return;
        }

        let _projects = [...this.props.projects];

        // sorting by modifiedAt key...
        _projects = _.orderBy(_projects, ['modifiedAt'], ['desc']);

        if (!this.state.recentlyActiveProjectShowAll) {
            // taking only 5 last projects...
            _projects = _projects.slice(0, 5);
        }

        return <View style={{
            marginTop: 50,
            marginBottom: 50
        }}>
            <ListItemTitle
                title="RECENTLY ACTIVE PROJECTS"
            />

            {_projects.map((project, i) => {
                const _styles = [styles.listItem];

                if (i == 0) {
                    _styles.push(styles.listItemBorder);
                }

                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            this.props.rehydrateProject(project);
                        }}
                    >
                        <ListItem
                            containerStyle={_styles}
                            title="Project 1"
                            subtitle="Activity 1 - Task 1"
                            titleStyle={styles.listItemTitleStyle}
                            rightTitle={moment.unix(project.modifiedAt).fromNow()}
                        />
                    </TouchableOpacity>
                );
            })}

            {(this.props.projects.length > 5 && !this.state.recentlyActiveProjectShowAll) && (
                <View style={{
                    marginTop: 20,
                    marginBottom: 20,
                    marginLeft: 5,
                    marginRight: 5
                }}>
                    <Button
                        title="View All Projects"
                        textStyle={{
                            fontSize: 18
                        }}
                        buttonStyle={{
                            backgroundColor: "#496FC2",
                            borderWidth: 0,
                            borderRadius: 3
                        }}
                        onPress={() => {
                            this.setState({
                                recentlyActiveProjectShowAll: true
                            })
                        }}
                    />
                </View>
            )}
        </View>
    };

    render() {
        const { t } = this.props.screenProps;

        return (
            <View style={{ flex: 1 }}>
                {this._renderProjectCategoriesModal()}

                <StatusBar
                    barStyle={this.state.barStyle}
                    hidden={this.state.isBarHidden}
                />

                <Header
                    leftComponent={<Menu {...this.props} />}
                    centerComponent={{ text: t('drawer menu:active project'), style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={(!this.props.activeProject.isCreated) ? <Plus onPress={() => {
                        this._setProjectCategoriesModalVisible(true);
                        this._setStatusBar('dark');
                    }} /> : null}
                />
                <ScrollView style={{
                    backgroundColor: '#f7f7f7'
                }}>
                    {this._renderNoActiveProjectText()}
                    {/* {this._renderRecentlyActiveProjects()} */}

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

function mapStateToProps({ activeProject, projects, user, projectCategories }) {
    return { activeProject, projects, user, projectCategories }
}

export default connect(mapStateToProps, actions)(ActiveProjectScreen);