/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
} from 'react-native';

class TabBarIOSDemo extends Component {
  constructor(props){
    super(props);
    this.state = {
      animating: true
    }
  }

  setToggleTimeout() {
    setTimeout(
      () => {
        this.setState({animating: !this.state.animating});
        this.setToggleTimeout();
      },
      1200
    );
  }

  componentDidMount() {
    this.setToggleTimeout();
  }


  render() {
    return (
      <View >
        <Text style={styles.welcome}>
          ActivityIndicatorIOS使用实例
        </Text>
        <Text style={{margin:10}}>自定义颜色指示器</Text>
        <View style={styles.horizontal}>
          <ActivityIndicatorIOS color="#0000ff" />
          <ActivityIndicatorIOS color="#aa00aa" />
          <ActivityIndicatorIOS color="#aa3300" />
          <ActivityIndicatorIOS color="#00aa00" />
        </View>
        <Text style={{margin:10}}>Large进度指示器</Text>
        <ActivityIndicatorIOS
          animating={this.state.animating}
          hidesWhenStopped={
            // 默认为true, 即没有动画时停止展示
            true
          }
          onLayout={(a) => {
            console.log(a);
            console.log(a.nativeEvent.layout);
            // {nativeEvent: { layout: {x, y, width, height}}}.
          }}
          style={[styles.centering,{margin:10,backgroundColor:'#cccccc',height: 200}]}
          color="#00f"
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:10
  }
});

AppRegistry.registerComponent('AwesomeProject', () => TabBarIOSDemo );