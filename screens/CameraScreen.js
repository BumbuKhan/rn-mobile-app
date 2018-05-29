import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

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
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
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
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Shoot{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}