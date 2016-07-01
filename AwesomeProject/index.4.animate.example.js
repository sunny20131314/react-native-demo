/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 *动画效果展示页面
 */


'use strict'; //开启 Strict Mode
import React, { Component } from 'react';

import ReactNative, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StatusBarIOS,
  Easing,
  View
} from 'react-native';

var Animated = require('Animated');



// 动画效果
let {Animate, Animate1, FadeInExample} = require('./AnimatedExample');

import AnExApp from './AnimatedGratuitousApp/AnExApp';
import AnExBobble from './AnimatedGratuitousApp/AnExBobble';
import AnExChained from './AnimatedGratuitousApp/AnExChained';
//import AnExScroll from './AnimatedGratuitousApp/AnExScroll';
import AnExSet from './AnimatedGratuitousApp/AnExSet';
//import AnExTilt from './AnimatedGratuitousApp/AnExTilt';


class TestMore extends Component {
  render() {
    return (
      <ScrollView
        style={[{height: 500 }]}
      >
        <Animate />
        <Animate1 />
        <FadeInExample />
        <AnExApp />
        <AnExBobble />
        <AnExChained />
        <AnExSet />
      </ScrollView>
    )
  }

}

AppRegistry.registerComponent('WeiLaiWang', () => TestMore);
registerComponent('Playground', () => Playground);