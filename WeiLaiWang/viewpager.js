/**
 * Created by sunzhimin on 12/07/16.
 * 实验性的使用 每一页面的数据改动,测试结果,页面闪(数据转换的时候)
 *
 * 做不可循环,但可以往左往右滑!
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Platform,
  Picker,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  TouchableOpacity,
  PixelRatio,
  DatePickerIOS,
  TouchableHighlight,
  Image,
} from 'react-native';

import Indicator from './ViewPageIndicator';
import DragBtn from './dragBtn';
import Main from './main';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);

    let index = this.index = this.props.index; // number: 记录是第几个tab
    let appDataOrders = this.appDataOrders = this.props.appDataOrders;

    let {data, title} = this.props.data;
    this.data = data;  // arr: 当前tab页的所有数据 []
    this.title = title; // 类目
    this.order = appDataOrders[index];  // arr: 记录显示顺序

    let len = this.len = title.length;
    this.WIDTH = this.props.deviceLayout.WIDTH;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.scrollLeft = 0;  //记录滚动的距离

    this.isLoop = this.props.isLoop;

    let pager = [];          // 页面的全部数据 (包括新加的)
    for (let i = 0; i !== len; i++ ){
      pager[i] = i;
    }
    if ( this.isLoop ) {
      pager.push(len);
      pager.unshift(-1);
      this.scrollLeft = this.WIDTH;  //记录滚动的距离
    }

    this.pager = pager;

    this.state = {
      activePage: 0,   // 这个需要传递给编辑, 当前tab页的第几个
    };
  }

  componentDidMount() {
    // android
    setTimeout( () => {
      this.refs.trueScroll.scrollTo({x: this.scrollLeft, y: 0, animated: false});
    }, 10);
  }

  next(scrollX) {
    // 要判断是否滚动到相应的位置了
    this.scrollLeft += this.WIDTH;

    if ( scrollX !== this.scrollLeft ) {
      return false;
    }
    this.setState({
      activePage: ++ this.state.activePage
    });
  }

  prev(scrollX) {
    this.scrollLeft -= this.WIDTH;

    if ( scrollX !== this.scrollLeft ) {
      return false;
    }
    this.setState({
      activePage: -- this.state.activePage
    });
  }

  myScrollIos(event) {
    let len = this.len;
    let scrollX = event.nativeEvent.contentOffset.x;

    let endX = this.WIDTH * (len + 1);
    if ( this.isLoop ) {
      if( scrollX === 0 ) { // 滚动到最左
        // scrollview has a layout animation when create,so, you must delay it after the animation
        setTimeout( () => {
          this.refs.trueScroll.scrollTo({x: this.WIDTH * len, y: 0, animated: false});
        }, 10);
        this.scrollLeft = this.WIDTH * len;
        this.setState({
          activePage: len - 1
        });
      }
      else if ( scrollX === endX ) { // 滚动到最右
        setTimeout( () => {
          this.refs.trueScroll.scrollTo({x: this.WIDTH, y: 0, animated: false});
        }, 10);
        this.scrollLeft = this.WIDTH;
        this.setState({
          activePage: 0
        });
      }
      return false;
    }

    // 当前滚动到的位置(相对于真正的view(不包括前后添加))
    // 这逻辑得改啊... scrollLeft
    if (scrollX > this.scrollLeft) {
      this.next(scrollX);
    } else if (scrollX < this.scrollLeft) {
      this.prev(scrollX);
    }
  }

  _goToPage(i) {
    let scrollLeft = this.isLoop ? ( i + 1 ) * this.WIDTH : i * this.WIDTH;
    this.refs.trueScroll.scrollTo({x: scrollLeft, y: 0, animated: false});
    this.scrollLeft = scrollLeft;
    this.setState({
      activePage: i
    });
  }

  _onJumpEdit() {
    const { navigator } = this.props;
    let activePage = this.state.activePage;
    navigator.replace({
      name: 'edit',
      component: DragBtn,
      params: {
        url: '',
        deviceLayout: this.props.deviceLayout,
        index: this.index,       //第几个tab
        activePage: activePage,   //page页
        appDataOrders: this.appDataOrders,    //显示的全部数据顺序
        data: this.data[activePage],    //该页面的全部数据
      },
      handleBack: function() {
        navigator.replace({
          name: 'Main',
          component: Main,
        });
        return true;
      }
    });
  }

  render() {
    let addStartEl, addEndEl;
    let isLoop = this.props.isLoop;
    if ( isLoop && this.order ) {
      let end = this.len -1;
      let dataEnd = this.data[end];
      addStartEl = <View
        style={[styles.page, {width: this.WIDTH}]}
        key={'pageStart'}
      >
        {
          this.order[end].slice(0, 8).map( (d, i) => {
          return (
          <TouchableHighlight
            key={'-1img' + i}
            //onPress={() => {}}
            underlayColor="transparent"
          >
            <Image
              source={dataEnd[d].url}
              style={this.imgLayout}
              resizeMode={Image.resizeMode.contain}
              //resizeMode='contain'
            />
          </TouchableHighlight>
          )
        })
        }
      </View>;
      let dataStart = this.data[0];
      addEndEl = <View
        style={[styles.page, {width: this.WIDTH}]}
        key={'pageEnd'}
      >
        {
          this.order[0].slice(0, 8).map( (d, i) => {
            return (
              <TouchableHighlight
                key={'-1img' + i}
                //onPress={() => {}}
                underlayColor="transparent"
              >
                <Image
                  source={dataStart[d].url}
                  style={this.imgLayout}
                  resizeMode='contain'
                />
              </TouchableHighlight>
            )
          })
        }
      </View>;
    }

    return (
      <View>
        <Indicator
          title={this.title}
          activePage={this.state.activePage}
          len={this.len}
          goToPage={this._goToPage.bind(this)}
          onJumpEdit={this._onJumpEdit.bind(this)}
        />
        <ScrollView
          horizontal={true}
          contentOffset={{x: this.scrollLeft, y: 0}}
          alwaysBounceHorizontal={true}
          onMomentumScrollEnd={event=>this.myScrollIos(event)}
          ref="trueScroll"
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {
            isLoop && this.order && addStartEl
          }
          {
            this.order && this.order.map( (data, index) => {
              let data1 = '';
              let dataS = this.data[index];
              return (
                <View
                  style={[styles.page, {width: this.WIDTH}]}
                  key={'page' + index}
                >
                  {
                    data.slice(0, 8).map( (d, i) => {
                      return (
                        <TouchableHighlight
                          key={index + 'img' + i}
                          onPress={() => {
                            this.props.onJump(dataS[d].href);
                          }}
                          underlayColor="transparent"
                        >
                          <Image
                            source={dataS[d].url}
                            style={this.imgLayout}
                            resizeMode='contain'
                          />
                        </TouchableHighlight>
                      )
                    })
                  }
                </View>
              )
            })
          }
          {
            isLoop && this.order && addEndEl
          }
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    //height: 400,
    //backgroundColor: '#F5FCFF',
  },
});