/**
 * Created by sunzhimin on 16/6/17.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

export default class Ad extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    return (
      <View style={[styles.header, this.props.style]}>
        <TouchableHighlight
          activeOpacity={.8}
          //onPress={() => console.log('press')}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <Image
            source={require('./img/ad.jpg')}
            style={styles.ad}
            resizeMode='contain'
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ad: {
    height: 77,
  }
});
