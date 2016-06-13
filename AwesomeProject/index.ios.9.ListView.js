/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * ListView
 * refresh
 */

'use strict';

// 模拟数据
var MOCKED_MOVIES_DATA = [
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'movie: 标题end~~~~', year: 'movie: 2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
];

/*
 * ListView
 * 为什么建议把内容放到 ListView 里？比起直接渲染出所有的元素，或是放到一个ScrollView里有什么优势？
 * 这是因为尽管React很高效，渲染一个可能很大的元素列表还是会很慢。
 * ListView会安排视图的渲染，只显示当前在屏幕上的那些元素。
 * 而那些已经渲染好了但移动到了屏幕之外的元素，则会从原生视图结构中移除（以提高性能）。
 *
 * */


import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  RefreshControl,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} from 'react-native';

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);

    // ListView 中 dataSource接口: 在ListView的整个更新过程中判断哪些数据行发生了变化。
    this.state = {
      data: MOCKED_MOVIES_DATA,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          console.log(row1);
          console.log(row2);
          row1 !== row2;
        }
      }),

      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row' + i, clicks: 0})),

      changeData: false
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCKED_MOVIES_DATA)
    })
  }

  componentDidUpdate() {
    console.log('update');

    // 仅执行一次!
    if(this.state.changeData){
      return false;
    }

    setTimeout(() => {
      console.log('time out');
      this.setState({
        changeData: true,
        dataSource: this.state.dataSource.cloneWithRows(this.state.data)
      })
    }, 1000)
  }



  render() {
    // ListView - 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表。
    // ListView.DataSource 是数据源,

    // DataSource实例时传的参数对象中的属性 rowHasChanged 是绑定相应的函数,
    // 只更新变化的行 - 提供给数据源的rowHasChanged函数可以告诉ListView它是否需要重绘一行数据
    // 如果返回true, 则说明数据源有变动,然后重新渲染!

    // 最基本的使用方式就是创建一个 ListView.DataSource数据源，然后给它传递一个普通的数据数组，
    // 通过 cloneWithRows 方法传递一个普通的数据数组, 重新创建一个datasource,再使用数据源来实例化一个ListView组件???是指何时,
    //  clone方法会自动提取新数据并进行逐行对比（使用rowHasChanged方法中的策略），
    //  要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
    // （如果用到了section，则对应cloneWithRowsAndSections方法）

    // 并且定义它的renderRow回调函数，
    // 这个函数会接受数组中的每个数据作为参数，返回一个可渲染的组件（作为listview的每一行）。


    {
      // pageSize: number 限制频率的行渲染 - 默认情况下，每次消息循环只有一行会被渲染
      // initialListSize: number 指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来。
      // horizontal bool :当此属性为true的时候，所有的的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。
      // refreshControl : 组件  下拉刷新

    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        onEndReached={(a,b) => {
          // 在到达列表尾部的时候调用回调函数, 这个是在视图的第一屏展示完后触发一次??? why?
          //alert('end');
          console.log(a,b);
        }}
        onChangeVisibleRows = {(a,b) => {
          // 在视野内可见的数据变化时调用回调函数
          //console.log(a,b);
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
        horizontal={false}
        initialListSize={2}
        pageSize={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderRow={(movie)=> {
          //console.log(movie); // 数组movies的每一个元素
          return (
            <View style={styles.container}>
              <Image
                source={{uri: movie.posters.thumbnail}}
                style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text style={[styles.title]}>{movie.title}</Text>
                <Text style={[styles.year, styles.fontRed]}>{movie.year}</Text>
              </View>
            </View>
          );
        }}
        style={styles.listView}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5
  },
  text: {
    alignSelf: 'center',
    color: '#fff'
  },
  scrollview: {
    flex: 1
  }
});

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
