/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

var THUMB_URLS = [
  require( './img/elema490.png' ),
  require( './img/meituan490.png' ),
  require( './img/bishengke490.png' ),
  require( './img/jiyejia490.png' )
];

export default class ListViewGridLayoutExample extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this._genRows({}))
    }
  }
  _pressData() {}


  componentWillMount() {
    this._pressData = {};
  }

  render() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        initialListSize={21}
        pageSize={2} // should be a multiple of the no. of visible cells per row
        scrollRenderAheadDistance={500}
        renderRow={this._renderRow}
      />
    );
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    let len = rowHash % THUMB_URLS.length;
    console.log(rowHash, rowData, rowID ,len, 'rowHash, rowData, rowID, len'); // 2460237635 "Cell 0" "0"
    var imgSource = THUMB_URLS[len];  //循环使用图
    return (
      <TouchableHighlight
        onPress={() => console.log('press')}
        underlayColor="transparent"
      >
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
      </TouchableHighlight>
    );
  }
  _genRows(pressData){
    var dataBlob = [];
    for (var ii = 0; ii < 11; ii++) {
      var pressedText = pressData[ii] ? '(X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;  //数据
  }
}

/* eslint no-bitwise: 0 */  // 计算hash值用来???
var hashCode = function(str) {
  //console.log(str, str.length, 'hashCode str~~~ length');
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    //padding: 5,
    marginBottom: 3,
    width: 80,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});

