'use strict'; //开启 Strict Mode
import React, { Component } from 'react';
import {
  Navigator,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} from 'react-native';
import RouteComponent from './ARouteComponent';

class MyApp1101 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <View style={{
        flexDirection: 'row',
        height: 100, width: 140,
        padding: 20
      }}>
        <View style={{backgroundColor: 'blue', flex: 0.3}} />
        <View style={{backgroundColor: 'red', flex: 0.7}} />
        <Text>
          MyApp111
        </Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => MyApp1101);
