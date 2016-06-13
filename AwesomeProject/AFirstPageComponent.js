/**
 * Created by sunzhimin on 16/6/6.
 * 演示了如何在不同页面间传参数,调用方法!
 */

'use strict';
import React from 'react';
import {
  View,
  Navigator,
  TouchableOpacity,
  Text
} from 'react-native';

import SecondPageComponent from './ASecondPageComponent';

export default class FirstPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      user: null
    };
  }

  static propTypes: {
    navigator: React.PropTypes.object.isRequired
    };

  _pressButton() {
    let _this = this;
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?  -> ASampleComponent
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props

    if(navigator) {
      // 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
      navigator.push({
        name: 'SecondPageComponent',
        component: SecondPageComponent,
        //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
        params: {
          id: this.state.id,
          //从SecondPageComponent获取user
          getUser(user) {
            _this.setState({
              user: user
            })
          }
        }
      })
    }
    console.log(this.props); //Object {name: "FirstPageComponent11", navigator: Constructor}

  }
  render() {
    if( this.state.user ) {
      return(
        <View>
          <Text>用户信息: { JSON.stringify(this.state.user) }</Text>
        </View>
      );
    }else {
      return(
        <View>
          <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text>查询ID为{ this.state.id }的用户信息</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}