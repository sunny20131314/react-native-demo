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
import SampleComponent from './ASampleComponent';
import RouteComponent from './ARouteComponent';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <SampleComponent />
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
