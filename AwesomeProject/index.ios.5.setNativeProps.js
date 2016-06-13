/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 直接操作: setNativeProps
 */

'use strict'; //开启 Strict Mode

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Touchable
} from 'react-native';


class MyButton extends Component {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      active: false
    };
  }

  render() {
    return (
      <View>
        <Text>{this.props.label} 组件 MyButton</Text>
      </View>
    )
  }
}


class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myButtonOpacity: 1,
      myText: '***'
    }
  }
  handlePress() {
    this.setState({
      myButtonOpacity: 0.8,
      myText: this._input
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // TouchableOpacity这个组件就在内部使用了setNativeProps方法来更新其子组件的透明度,
          // 组件已经处理好了:
          // 子组件可以响应点击事件，更改自己的透明度。而子组件自身并不需要处理这件事情，也不需要在实现中做任何修改。
        }
        <TouchableOpacity>
          <Text style={styles.red}>
            Press me!---ori
          </Text>
        </TouchableOpacity>

        {
          // 为了响应点击事件,更改透明度: 如果不用组件 把透明值保存到state中，然后在onPress事件触发时更新这个值：
          // 这一做法会消耗大量的计算 —— 每一次透明值变更的时候React都要重新渲染组件结构，即便视图的其他属性和子组件并没有变化。
          // 一般来说这一开销也不足为虑，但当执行连续的动画以及响应用户手势的时候，只有正确地优化组件才能提高动画的流畅度。
          // onPress & onPressOut只有一个有效 ??
        }
        <TouchableOpacity
          onPress={() => this.setState({myButtonOpacity: 0.5})}
          onPressOut={() => this.setState({myButtonOpacity: 1})}
        >
          <View style={{opacity: this.state.myButtonOpacity}}>
            <Text>
              Press me---state !
            </Text>
          </View>
        </TouchableOpacity>

        {
          // ref 无效,why? 和pc端不一致 ?? 还是只能在TextInput内使用
          // 想使用 setNativeProp 来设置.
        //  <TextInput
        //    ref={function(input) {
        //  if (input != null) {
        //    input.focus();
        //  }
        //}} />
        }
        <TouchableOpacity
          ref={(ref) => this.myTextInput = ref}
          onPress={() => this.setState({myButtonOpacity: 0.8, myText: this.myTextInput})}
        >
          <View
            style={{opacity: this.state.myButtonOpacity}}
          >
            <Text>
              这里会报错:
              Press me---setNativeProps!
            </Text>
          </View>
        </TouchableOpacity>

        {
          // 组件引用, 恩, 文档说不可用,但是事实是可以用...还是别的意思?
        }
        <TouchableOpacity>
          <MyButton label="Press me! 我是组件 按理来说, 会报错" />
        </TouchableOpacity>

        {
          // 为了拿到  this.refs['press'].setNativeProps, 但是 ?? 怎么拿
        }
        <Text>
          这里是内容, 是我想获取的节点的内容,但是获取不到:
          {this.state.myText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
    backgroundColor: '#F5FCFF'
  },
  red: {
    color: 'red',
    backgroundColor: 'transparent'
  }
});

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
