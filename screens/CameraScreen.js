import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';

export default class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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
                    <Camera
                        ref={ref => this.camera = ref}
                        style={{ flex: 1 }}
                        type={this.state.type}>

                        <View style={{
                            flex: 1,
                            marginTop: 25,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                alignSelf: 'flex-start'
                            }}>
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
                                flex: 0.33
                            }}></View>

                            <View style={{
                                flex: 0.33,
                                alignSelf: 'flex-end',
                                alignItems: 'center'
                            }}>
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
                                        }
                                    }}
                                >
                                    <Icon
                                        name="camera-alt"
                                        color="white"
                                        size={50}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}