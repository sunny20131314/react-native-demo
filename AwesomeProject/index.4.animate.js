/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 *
 * animate   -- 未完
 * http://reactnative.cn/docs/0.26/animations.html#content
 *
 * 联合使用两个互补的系统：用于全局的布局动画LayoutAnimation，和用于创建更精细的交互控制的动画Animated。
 */

// Animated
// Animated库使得开发者可以非常容易地实现各种各样的动画和交互方式，并且具备极高的性能。
// Animated仅关注动画的输入与输出声明，在其中建立一个可配置的变化函数，
// 然后使用简单的start/stop方法来控制动画按顺序执行。下面是一个在加载时带有简单的弹跳动画的组件示例：

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


class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0)
    };
  }

  render() {
  //render(): ReactElement {
    return (
      <Animated.Image                         // 可选的基本组件类型: Image, Text, View
        source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
        style={{
          flex: 1,
          transform: [                        // `transform`是一个有序数组（动画按顺序执行）
            {scale: this.state.bounceValue}  // 将`bounceValue`赋值给 `scale`
          ]
        }}
      />
    );
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
    Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
      this.state.bounceValue,                 // 将`bounceValue`值动画化
      {
        toValue: 0.8,                         // 将其值以动画的形式改到一个较小值
        friction: 1                          // Bouncier spring
      }
    ).start();                                // 开始执行动画
  }
}

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('Playground', () => Playground);