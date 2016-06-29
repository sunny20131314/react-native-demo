/**
 * Created by sunzhimin on 16/6/23.
 * 可以拖动排序的组件
 * {...this._gestureHandlers} vs {...this._panResponder.panHandlers}
 * 当在当前的位置上时, 表现类似于 添加了一个空数据, 定位 relative
 */
import React from 'react';
let SortableListView = require('./sortable');
import {
  TouchableHighlight,
  Text,
  View
} from 'react-native';


let data = {
  hello: {text: 'world'},
  how: {text: 'are you'},
  test: {text: 123},
  this: {text: 'is'},
  a: {text: 'a'},
  real: {text: 'real'},
  drag: {text: 'drag and drop'},
  bb: {text: 'bb'},
  cc: {text: 'cc'},
  dd: {text: 'dd'},
  ee: {text: 'ee'},
  ff: {text: 'ff'},
  gg: {text: 'gg'},
  hh: {text: 'hh'},
  ii: {text: 'ii'},
  jj: {text: 'jj'},
  kk: {text: 'kk'}
};

let order = Object.keys(data); //Array of keys

let RowComponent = React.createClass({
  render: function() {
    return <TouchableHighlight
      underlayColor={'#eee'}
      style={{padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
      {...this.props.sortHandlers}>
      <Text>{this.props.data.text}</Text>
    </TouchableHighlight>
  }
});

let MyComponent = React.createClass({
  render: function() {
    return <SortableListView
      style={{flex: 1}}
      data={data}
      order={order}
      onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
      renderRow={row => <RowComponent data={row} />}
    />
  }
});

module.exports = MyComponent;