/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 图片相关
 * 一个用于显示多种不同类型图片的React组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。
 */

'use strict'; //开启 Strict Mode

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} from 'react-native';


export default class AwesomeProject2 extends Component {

  // 在图片后方加后缀, @2x, @3x等,
  // packager: react-native会默认根据设备情况而定,只有实际被用到（即被require）的图片才会被打包到你的app。
  // Packager就会根据平台而选择不同的文件。my-icon.ios.png和my-icon.android.png
  // 本地文件用 require 会更合适,可以获取到图片的相关信息, 后期可能支持精灵图


  // 背景图片
  // 直接在image标签内添加文字: <Text>Inside</Text> 或者其他.

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          defaultSource={require('./img/img.png')}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          onLayout={(e) => {
            // 当元素挂载或者布局改变的时候调用
            //参数:{nativeEvent: {layout: {x, y, width, height}}}.
            console.log(e.nativeEvent.lalayoutyout)
          }}

          onLoadEnd={() => {
            // onLoadEnd : 加载结束后，不论成功还是失败，调用此回调函数。
            console.log('done');
          }}
          onLoad={() => {
            // 加载成功完成时调用此回调函数。
            console.log('success');
          }}
          onLoadStart={() => {
            // 加载开始时调用。
            console.log('start');
          }}
          resizeMode='contain'
        />
        <Image
          source={require('./img/check.png')}
          style={styles.thumbnail}
        >
          <Text style={styles.red}>
            Inside
          </Text>
        </Image>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  red: {
    alignSelf: 'flex-end',
    color: 'red',
    backgroundColor: 'transparent'
  },
  logo: {
    width: 400,
    height: 500,
    borderColor: '#0af',
    borderWidth: 10,
    borderRadius: 100,
    backgroundColor: '#000',
    //tintColor: '#00f',
    opacity: .4
  }
});

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject2);
