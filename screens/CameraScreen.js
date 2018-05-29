import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
import {connect} from 'react-redux';

import * as actions from '../actions';

class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        takenPhotos: []
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    _renderTakenPhotos = () => {
        if (!this.state.takenPhotos.length) {
            return;
        }

        // grabbing the latest photo in the stack
        const lastPhoto = this.state.takenPhotos[this.state.takenPhotos.length - 1];

        return (
            <TouchableOpacity
                onPress={() => {

                }}
            >
                <Image
                    style={{
                        width: 70,
                        height: 60,
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: 2
                    }}
                    source={{ uri: `data:image/jpg;base64,${lastPhoto.base64}` }}
                />

                {(this.state.takenPhotos.length >= 2) && (<View style={{
                    marginTop: 2,
                    marginLeft: 5,
                    borderTopWidth: 1,
                    borderColor: 'white',
                    width: 60
                }}></View>)}

                {(this.state.takenPhotos.length >= 3) && (
                    <View style={{
                        marginTop: 2,
                        marginLeft: 10,
                        borderTopWidth: 1,
                        borderColor: 'white',
                        width: 50
                    }}></View>
                )}

            </TouchableOpacity>
        );
    };

    _renderApplyButton = () => {
        if (!this.state.takenPhotos.length) {
            return;
        }

        return (<TouchableOpacity
            style={{
                marginBottom: 20
            }}
            onPress={() => {
                this.props.addPhotos(this.state.takenPhotos);
            }}
        >
            <Text style={{
                color: 'white',
                fontSize: 20
            }}>Apply</Text>
        </TouchableOpacity>);
    };

    _renderCameraButton = () => {
        return (
            <TouchableOpacity
                onPress={async () => {
                    if (this.camera) {
                        let photo = await this.camera.takePictureAsync({
                            base64: true
                        });

                        // will return an object with such structure:
                        /*
                        {
                            "base64": "qwew876q6e7q87e6q...qweqweqwe"
                            "height": 200,
                            "width": 200,                                            
                            "uri": "file:///Users/macbook/Library/Developer/Co...B2-407B-B279-538218BE21AC.jpg"
                        }
                        */

                        // adding taken photo to this.state.takenPhotos
                        this.setState({
                            takenPhotos: [...this.state.takenPhotos, photo]
                        });
                    }
                }}
            >
                <Icon
                    name="camera"
                    color="white"
                    size={65}
                />
            </TouchableOpacity>
        );
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        hidden
                    />
                    <Camera
                        ref={ref => this.camera = ref}
                        style={{ flex: 1 }}
                        type={this.state.type}>

                        <View style={{
                            marginTop: 25,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                >
                                    <Icon
                                        name="close"
                                        color="white"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => { }}
                                >
                                    <Icon
                                        name="flash-off"
                                        color="white"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            marginTop: 25,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>
                            <View style={{
                                justifyContent: 'flex-end',
                                flex: 0.33
                            }}>
                                {this._renderTakenPhotos()}
                            </View>

                            <View style={{
                                flex: 0.33,
                                alignSelf: 'flex-end',
                                alignItems: 'center'
                            }}>
                                {this._renderCameraButton()}
                            </View>

                            <View style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flex: 0.33
                            }}>
                                {this._renderApplyButton()}
                            </View>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

export default connect(null, actions)(CameraScreen);