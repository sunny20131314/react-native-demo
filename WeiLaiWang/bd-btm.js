/**
 * Created by sunzhimin on 16/6/20.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Linking,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <Image
          source={require('./img/logo_btm.jpg')}
          style={styles.logo}
          resizeMode='contain'
        >
        </Image>
        <Text style={styles.text}>
          版权所有：共青团中央网络影视中心  |
        </Text>
        <TouchableHighlight
          activeOpacity={.8}
          onPress={this._call.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.1)"
        >
          <Text style={styles.text}>联系我们</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _call() {
    let url = 'tel:010-57380506';
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          // 不支持,给出提示语
          Alert.alert(
            '提示: ',
            '抱歉,您的手机暂时不支持直接拨打电话,请手动拨号: 010-57380506'
          );
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));

  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5248',
  },
  text: {
    paddingLeft: 6,
    color: '#fff',
    fontSize: 10,
  },
  logo: {
    width: 22,
    height: 22,
  },
});

