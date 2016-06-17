/**
 * Created by sunzhimin on 16/6/14.
 */

'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  AppRegistry,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
  } = ReactNative;

class Button extends Component{
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
  }


  _onHighlight() {
    this.setState({active: true});
  }

  _onUnhighlight() {
    this.setState({active: false});
  }

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000'
    };

    // TouchableHighlight 组件用于封装视图，使其可以正确响应触摸操作。
    // TouchableHighlight只支持一个子节点, 可用一个View来包装多个子节点!
    // 当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。
    // 在底层实现上，实际会创建一个新的视图到视图层级中，如果使用的方法不正确，有时候会导致一些不希望出现的视觉效果。
    // 譬如没有给视图的backgroundColor显式声明一个不透明的颜色。

    // activeOpacity : number 指定封装的视图在被触摸操作激活时以多少不透明度显示（通常在0到1之间）。 貌似默认 .8(效果差不多)

    // onHideUnderlay  当底层的颜色被隐藏的时候调用。
    // onShowUnderlay  当底层的颜色被显示的时候调用。
    // underlayColor   有触摸操作时显示出来的底层的颜色。

    return (
      <TouchableHighlight
        activeOpacity={.8}
        onHideUnderlay={this._onUnhighlight.bind(this)}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight.bind(this)}
        style={[styles.button, this.props.style]}
        underlayColor="rgba(255, 0, 0, 0.5)"
      >
        <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

export default class ModalExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: false
    }
  }

  _setModalVisible(visible) {
    // false: 隐藏 modal
    this.setState({modalVisible: visible});
  }

  _setAnimationType(type) {
    this.setState({animationType: type});
  }

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent
        ? 'rgba(0, 0, 0, 0.5)'
        : '#f5fcff'
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    // 按钮激活的背景色!
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };


    // animationType enum('none', 'slide', 'fade')   madal 出现的动画效果
    // transparent : bool
    // visible : bool

    // onShow : function
    // onRequestClose Platform.OS === 'android' ? PropTypes.func.isRequired : PropTypes.func

    return (
      <View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onshow={() => {
            alert(1);
            console.log(Platform.OS === 'android');
          }}
          onRequestClose={(a) => {
            console.log(a);
            console.log(Platform.OS === 'android');
            this._setModalVisible(false)}
          }
        >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>This modal was presented {this.state.animationType === 'none' ? 'without' : 'with'} animation.</Text>
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Animation Type</Text>
          <Button
            onPress={this._setAnimationType.bind(this, 'none')}
            style={this.state.animationType === 'none' ? activeButtonStyle : {}}
          >
            none
          </Button>
          <Button
            onPress={this._setAnimationType.bind(this, 'slide')}
            style={this.state.animationType === 'slide' ? activeButtonStyle : {}}
          >
            slide
          </Button>
          <Button
            onPress={this._setAnimationType.bind(this, 'fade')}
            style={this.state.animationType === 'fade' ? activeButtonStyle : {}}
          >
            fade
          </Button>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowTitle}>Transparent</Text>
          <Switch
            value={this.state.transparent}
            onValueChange={this._toggleTransparent.bind(this)}
          />
        </View>

        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => ModalExample);
