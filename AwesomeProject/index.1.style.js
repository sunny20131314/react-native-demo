/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * style
 */

'use strict'; //开启 Strict Mode

import React, { Component } from 'react';
import MyList from './style'
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} from 'react-native';


// 所有的核心组件都可以接受style属性。

class AwesomeProject extends Component {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      active: false
    };
  }
  render() {

    return (
      <View style={this.props.styles}>
        {
          // 还可以接受数组形式的多个style。
          // 一个通常的做法是根据某些条件选择性地添加样式。 &&
          // 其行为和Object.assign方法是一致的：为了避免多个值的冲突，最右边的元素优先级最高，而否定型的取值如false、undefined和null则会被忽略。

        }
        <Text
          style={[
            !this.state.active && styles.active,
            { width: 200}
          ]}
        >
          1111
        </Text>

        {
          //为了能够在调用组件的地方对其子组件样式进行自定义，还可以将样式作为参数进行传递。如: MyList这个组件的样式
        }
        <MyList styles={{
          borderWidth: 5,
          borderColor: '#0a7'
        }} />
        <MyList styles={styles.container} />
        <MyList/>
      </View>
    );
  }
}


/*
 * StyleSheet
 * StyleSheet.create这个构造函数并不是必须的，但它提供了一些非常有用的好处。
 * 它可以把这些样式值转化为普通的数字id，这些数字id则指向一个内部的样式表，
 * 以此来使得样式值变得不可更改（immutable） 和 不可见（opaque）。
 * 把样式声明放到文件的末尾还可以确保它们只会在应用中被创建一次，而不是在每次渲染（render方法中）时都被重新创建。
 *
 * */
const styles = StyleSheet.create({
  container: {
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: '#ff0'
  },
  active: {
    height: 380,
    textAlign: 'center',
    backgroundColor: '#00ff00'
  }
});


// AppRegistry 定义了App的入口，并提供了根组件。
//AppRegistry.registerComponent('MyProject', () => MyProject);
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
