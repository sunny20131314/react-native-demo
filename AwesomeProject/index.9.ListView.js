/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * ListView
 * refresh
 * ?? 当将ListView 包含在view 中时, 刷新不了,只出来一半???
 * renderHeader 这个头部没有办法固定啊? StaticContainer 也无效
 */

'use strict';
/*
 * ListView
 * 为什么建议把内容放到 ListView 里？比起直接渲染出所有的元素，或是放到一个ScrollView里有什么优势？
 * 这是因为尽管React很高效，渲染一个可能很大的元素列表还是会很慢。
 * ListView会安排视图的渲染，只显示当前在屏幕上的那些元素。
 * 而那些已经渲染好了但移动到了屏幕之外的元素，则会从原生视图结构中移除（以提高性能）。
 *
 * */


import React, { Component} from 'react';
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

var StaticContainer = require('react-static-container');
console.log(StaticContainer);

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);

    // ListView 中 dataSource接口: 在ListView的整个更新过程中判断哪些数据行发生了变化。
    this.state = {
      dataSource: new ListView.DataSource({
        getSectionData: (dataBlob, sectionID) => {
          console.log(dataBlob);
          console.log(sectionID);
          return dataBlob[sectionID]
        },
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        rowHasChanged: (row1, row2) => {
          //console.log(row1);
          //console.log(row2);
          return row1 !== row2;
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
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.generateRows())
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
      //this.setState({
      //  changeData: true,
      //  dataSource: this.state.dataSource.cloneWithRowsAndSections(this.generateRows())
      //})
    }, 1000)
  }

  _onRefresh(){
    console.log('refresh');
    console.log(this);  // refresh 组件!!!
  }

  generateRows() {
    var dataBlob = [];
    for (var ii = 0; ii < 20; ii++) {
      dataBlob.push('Cell ' + ii);
    }
    return [dataBlob, dataBlob, dataBlob, dataBlob];
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.catListHeaderContainer}>
        <Text style={styles.catListTitle}>
          Categories {sectionID}
        </Text>
      </View>
    );
  }

  renderRow(movie, sectionID, rowID, highlightRow){
    //console.log(movie); // 数组movies的每一个元素
    //console.log( sectionID );    // s1
    //console.log( rowID );        // 0-index
    //console.log( highlightRow ); // fn
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={[styles.title]}>
            {movie}
          </Text>
        </View>
      </View>
      );
  }

  renderHeader(){
    console.log('renderHeader');
    return(
      <StaticContainer>
        <View style={{ height:50,backgroundColor:'red'}}>
          <Text>this is fixed header </Text>
        </View>
      </StaticContainer>
    )
  }
  render() {
    // ListView - 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表。
    // ListView.DataSource 是数据源,为ListView组件提供高性能的数据处理和访问。

    // DataSource实例时传的参数对象中的属性 rowHasChanged 是绑定相应的函数,
    // 只更新变化的行 - 提供给数据源的rowHasChanged函数可以告诉ListView它是否需要重绘一行数据
    // 如果返回true, 则说明数据源有变动,然后重新渲染!

    // 最基本的使用方式就是创建一个 ListView.DataSource数据源，然后给它传递一个普通的数据数组，
    // 通过 cloneWithRows 方法传递一个普通的数据数组, 重新创建一个datasource,
    // 然后将你指定的dataBlob(原始数据)传递给构造函数中指定的提取函数,再使用数据源来实例化一个ListView组件???是指何时,
    //数据源中的数据本身是不可修改的，所以请勿直接尝试修改。
    // clone方法会自动提取新数据并进行逐行对比（使用rowHasChanged方法中的策略），这样ListView就知道哪些行需要重新渲染了。
    //  要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
    // （如果用到了section，则对应cloneWithRowsAndSections方法）

    // 并且定义它的renderRow回调函数，
    // 这个函数会接受数组中的每个数据作为参数，返回一个可渲染的组件（作为listview的每一行）。

    // 属性prop:
    // pageSize: number 限制频率的行渲染 - 默认情况下，每次消息循环只有一行会被渲染
    // initialListSize: number 指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来。
    // horizontal bool :当此属性为true的时候，所有的的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。
    // refreshControl : 组件  下拉刷新
    // onEndReachedThreshold: number,// 调用onEndReached之前的临界值，单位是像素。 设置了之后的数字是距离列表的最底部的距离!!!
    // removeClippedSubviews: bool  // 用于提升大列表的滚动性能。需要给行容器添加样式overflow:'hidden'。
    // scrollRenderAheadDistance: number // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行。
    // stickyHeaderIndices [number] : 一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，传递stickyHeaderIndices={[0]}会让第一个成员固定在滚动视图顶端。这个属性不能和horizontal={true}一起使用。


    // renderFooter function () => renderable
    //            页头与页脚会在每次渲染过程中都重新渲染（如果提供了这些属性）。
    //            如果它们重绘的性能开销很大，把他们包装到一个StaticContainer或者其它恰当的结构中。页脚会永远在列表的最底部，而页头会在最顶部。
    //

    // renderFooter={(props) => renderable}
    // renderScrollComponent={(props) => renderable}   // 指定一个函数，在其中返回一个可以滚动的组件。
    // renderSectionHeader={(sectionData, sectionID) => renderable}   //如果提供了此函数，会为每个小节(section)渲染一个粘性的标题。




    /*<View style={{overflow: 'hidden'}}>
     <Text style={{paddingTop: 20, color: '#0f0'}}>
     this is header!
     </Text>*/
    return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          onEndReached={(instance) => {
            // 在到达列表尾部的时候调用回调函数, 这个是在视图的第一屏展示完后就会触发一次,而不是列表最低处!
            // 设置onEndReachedThreshold 临界值就可以了!
            //alert('end');
            //console.log(instance);
          }}
          onEndReachedThreshold={6}
          onChangeVisibleRows = {(a,b) => {
            // 在视野内可见的数据变化时调用回调函数
            //console.log(a,b);
          }}
          horizontal={false}
          scrollRenderAheadDistance={800}
          removeClippedSubviews={true}
          pageSize={1}
          initialListSize={20}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
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
          renderSectionHeader={this.renderSectionHeader.bind(this)}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader}
        />
    );
  }
}

const styles = StyleSheet.create({
  catListTitle: {
    fontWeight: 'bold',
    color: '#ffffff'
  },
  catListHeaderContainer: {
    padding: 12,
    backgroundColor: '#f00'
  },
  listView: {
    overflow: 'hidden',
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center'
  }
});

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
