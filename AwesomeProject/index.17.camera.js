/**
 * Created by sunzhimin on 31/08/16.
 * 地址: https://github.com/lwansbrough/react-native-camera
 */

import React from 'react';
import {
  AppRegistry,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };

    this.takePicture = this.takePicture.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  }

  takePicture() {
    if (this.camera) {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
  }

  startRecording() {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording() {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      }
    });
  }

  //get typeIcon() {
  //  let icon;
  //  const { back, front } = Camera.constants.Type;
  //
  //  if (this.state.camera.type === back) {
  //    icon = require('./assets/ic_camera_rear_white.png');
  //  } else if (this.state.camera.type === front) {
  //    icon = require('./assets/ic_camera_front_white.png');
  //  }
  //
  //  return icon;
  //}

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  //get flashIcon() {
  //  let icon;
  //  const { auto, on, off } = Camera.constants.FlashMode;
  //
  //  if (this.state.camera.flashMode === auto) {
  //    icon = require('./assets/ic_flash_auto_white.png');
  //  } else if (this.state.camera.flashMode === on) {
  //    icon = require('./assets/ic_flash_on_white.png');
  //  } else if (this.state.camera.flashMode === off) {
  //    icon = require('./assets/ic_flash_off_white.png');
  //  }
  //
  //  return icon;
  //}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Text>!!!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Text>???</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.takePicture}
            >
              <Text>家具</Text>
            </TouchableOpacity>
            ||
            null
          }
          <View style={styles.buttonsSpace} />
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.startRecording}
            >
              <Text>111</Text>
            </TouchableOpacity>
            ||
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.stopRecording}
            >
              <Text>222</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Example);
