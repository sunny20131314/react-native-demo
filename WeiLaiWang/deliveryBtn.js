/**
 * Created by sunzhimin on 16/6/20.
 * 存储当前的元素, 放在全局(相对于当前页面)
 * 测试自带的软键盘压缩是否有用
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  View
} from 'react-native';
import SearchComponent from './search';

class DeliveryBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBtn: this.props.activeBtn,
    }
  }

  render() {
    let isActive = this.props.activeBtn === this.props.id;
    return (
      <View style={styles.btnItem}>
        <TouchableHighlight
          activeOpacity={.8}
          onPress={this._onClick.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.6)"
          style={[styles.btn, isActive && {backgroundColor: '#ff5248'}]}
        >
          <Text style={[styles.text, isActive && {color: '#fff'}]}>
            {this.props.val}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onClick() {
    let id = this.props.id;
    this.props.setType( id );
  }
}

var DeliveryArr = [
  {id: 'yuantong', val: '圆通'},
  {id: 'yunda', val: '韵达'},
  {id: 'shentong', val: '申通'},
  {id: 'zhongtong', val: '中通'},
  {id: 'shunfeng', val: '顺丰'},
  {id: 'ems', val: 'EMS'},
  {id: 'zhaijisong', val: '宅急送'},
  {id: 'quanfengkuaidi', val: '全峰'},
  {id: 'tiantian', val: '天天'},
  {id: 'youshuwuliu', val: '优速'},
  {id: 'rufengda', val: '如风达'},
  {id: 'youzhengguonei', val: '包裹'}
];

export default class DeliveryBtnCon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBtn: 'yuantong',
    }
  }

  componentWillMount() {

  }

  _onSearchDelivery(val) {
    // 检测数据类型为 number --
    this.props.onSearch( 'http://m.kuaidi100.com/index_all.html?type=' + this.state.activeBtn + '&postid='+ val );
  }

  _setType(id) {
    this.setState({
      activeBtn: id
    });
  }

  render() {
    return (
      <View>
        <SearchComponent
          placeholder="请输入快递单号..."
          keyboardType='numeric'
          //onFocus={this._onFocus.bind(this, this.scrollLayout)}
          //onBlur={this._onBlur.bind(this)}
          onSearch={this._onSearchDelivery.bind(this)}
        />
        <View style={[styles.deliveryBtns]}>
          {
            DeliveryArr.map((arr) => <DeliveryBtn
              id={arr.id}
              val={arr.val}
              key={arr.id}
              activeBtn={this.state.activeBtn}
              setType={this._setType.bind(this)}
            />)
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deliveryBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 15,
  },
  btn: {
    width: 80,
    height: 32,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

