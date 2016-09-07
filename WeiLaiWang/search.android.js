/**
 * Created by sunzhimin on 16/6/17.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ToastAndroid,
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder={this.props.placeholder}
          value={this.state.text}
          keyboardType={this.props.keyboardType}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this._submit.bind(this)}
          multiline={false}
          selectTextOnFocus={true}
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

  _submit() {
    this.state.text
      ? this.props.onSearch( this.state.text)
      : ToastAndroid.show('请输入相关内容!', ToastAndroid.SHORT);
  }
}


const styles = StyleSheet.create({
  container: {
    height: 54,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  //searchInputContainer: {
  //  flex: 1,
  //  flexDirection: 'row',
  //  paddingLeft: 10,
  //  borderWidth: 1,
  //  borderColor: '#afafaf',
  //  borderRadius: 6,
  //},
  searchInput: {
    flex: 1,
    height: 36,
    lineHeight: 36,
    paddingTop: 0,
    paddingLeft: 10,
    //borderWidth: 0,
    //backgroundColor: '#afafaf',
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

