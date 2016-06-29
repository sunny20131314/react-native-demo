'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  AppRegistry,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  StyleSheet,
  Text,
  View
  } = ReactNative;

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
});

class Row extends Component{
  _onClick() {
    this.props.onClick(this.props.data);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClick.bind(this)} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class RefreshControlExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0}))
    }
  }

  _onClick(row) {
    row.clicks++;

    // 更新是因为 clicks 这个参数改变了!
    this.setState({
      rowData: this.state.rowData
    });
  }

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick.bind(this)}/>;
    });

    // colors   安卓: ={['#ff0000', '#00ff00', '#0000ff']}
    // progressBackgroundColor ColorPropType   指定刷新指示器的背景色。            progressBackgroundColor="#00f"
    //
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0"
            title="Loading..."
            titleColor="#00ff00"
          />
        }>
        {rows}
      </ScrollView>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
        .map((val, i) => ({
          text: 'Loaded row ' + (+this.state.loaded + i),
          clicks: 0
        }))
        .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData
      });
    }, 5000);
  }
}

AppRegistry.registerComponent('AwesomeProject', () => RefreshControlExample);
