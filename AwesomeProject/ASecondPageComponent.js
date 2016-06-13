/*
* navigator
* 导航的相关方法
* */

import React from 'react';
import {
  View,
  Navigator,
  TouchableOpacity,
  Text
} from 'react-native';

import FirstPageComponent from './AFirstPageComponent';

const USER_MODELS = {
  1: { name: 'mot', age: 23 },
  2: { name: '晴明大大', age: 25 }
};

export default class SecondPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null
    }
  }

  componentDidMount() {
    //这里获取从FirstPageComponent传递过来的参数: id
    this.setState({
      id: this.props.id
    });
  }

  _pressButton() {
    const { navigator } = this.props;

    if(this.props.getUser) {
      let user = USER_MODELS[this.props.id];
      this.props.getUser(user);
    }

    if(navigator) {
      console.log(navigator.getCurrentRoutes()); // 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
      navigator.jumpBack(); //跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
    }
    //console.log(this.props);  // Object {name: "SecondPageComponent", navigator: Constructor}

  }

  render() {
    return (
      <View>
        <Text>
          这里是第二22222页~~~~
        </Text>
        <Text>获得的参数: id={ this.state.id }</Text>
        <TouchableOpacity onPress={this._pressButton.bind(this)}>
          <Text>点我跳回去</Text>
        </TouchableOpacity>
      </View>
    );
  }
}