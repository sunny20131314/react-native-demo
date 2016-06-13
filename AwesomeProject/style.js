/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * style 这是个组件
 * 只需要定义这个组件的行为
 */

'use strict'; //开启 Strict Mode

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MyList extends Component {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      active: false
    };
  }

  //可以使用View.propTypes.style和Text.propTypes.style来确保传递的参数确实是style类型的。
  static propTypes = {
    styles: View.propTypes.style
  };  // 注意这里有分号

  static defaultProps = {
    styles: {borderWidth: 1,
      borderColor: '#0f9'}
  };  // 注意这里有分号

  render() {
    // 还可以接受数组形式的多个style。
    return (
      <View style={this.props.styles}>
        <Text>
          这是外部引进来的
        </Text>
      </View>
    );
  }
}

