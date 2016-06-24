/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

class pan extends Component {
  constructor(props){
    super(props);

    this.state = {
      bg: 'white',
      position: 'absolute',
      top: 0,
      left: 0,
    }
  }

  componentWillMount() {
    this._gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderGrant: ()=>{
        this.setState({bg: 'red'});
        this._top = this.state.top;
        this._left = this.state.left;
      },
      onResponderMove: (evt)=>{
        let nativeEvt = evt.nativeEvent;
        console.log(nativeEvt.pageX, nativeEvt.pageY );
        console.log('move');
        this.setState({
          position: 'absolute',
          left: nativeEvt.pageX - 100,
          top: nativeEvt.pageY - 100
        });
      },
      onResponderRelease: ()=>{
        this.setState({bg: 'white'}
        )}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          {...this._gestureHandlers}
          style={[styles.rect,{
            position: this.state.position,
            top: this.state.top,
            left: this.state.left,
            backgroundColor: this.state.bg
          }]}>

        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rect: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black'
  }
});

AppRegistry.registerComponent('WeiLaiWang', () => pan);