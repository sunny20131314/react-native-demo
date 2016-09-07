/**
 * Created by sunzhimin on 16/6/17.
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

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  _submit() {
    alert(this.state.text);
    this.state.text
      ? this.props.onSearch( this.state.text)
      : Alert.alert(
      '提示: ',
      '请输入相关内容!'
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder={this.props.placeholder}
          value={this.state.text}
          keyboardType={this.props.keyboardType}
          onFocus={this.props.onFocus && this.props.onFocus}
          onBlur={this.props.onBlur && this.props.onBlur}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this._submit.bind(this)}
        />
        <TouchableHighlight
          activeOpacity={.8}
          onPress={this._submit.bind(this)}
          underlayColor="rgba(245, 79, 69, 0.8)"
          style={styles.searchBtn}
        >
          <Image
            source={require('./img/search.png')}
            style={styles.searchPic}
            resizeMode='contain'
          />
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  searchInput: {
    flex: 1,
    padding: 0,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 6,
  },
  searchBtn: {
    width: 65,
    height: 36,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5248',
    borderRadius: 6,
  },
  searchPic: {
    height: 24,
  },
});

