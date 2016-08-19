/**
 * Created by sunny on 16/6/28.
 *
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  PanResponder,
  Dimensions,
  Animated,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

console.log(global.storage);


// 计算每个image的大小,高宽和图等比例!
let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
console.log(WIDTH, HEIGHT);
let width = (WIDTH-4)/2;
var height = width/490*245;

// 数组的话是整个数据的改变拖拽,而用对象的话,改变相应的 key 值,并保存,貌似占位少些, 处理的数据减少了~~~
var dragDate = {
  baiduwaimai: {
    url: require( './img/budingwaimai490.png' ),
    href: 'waimai.baidu.com'
  },
  meituan: {
    url: require( './img/meituanwaimai490.png' ),
    href: 'http://i.meituan.com/'
  },
  dianping: {
    url: require( './img/dazhongdp490.png' ),
    href: 'm.dianping.com'
  },
  kfc: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.4008823823.com.cn/kfcmwos/index.htm'
  },
  mcdonalds: {
    url: require( './img/maidanglao490.png' ),
    href: 'https://www.4008-517-517.cn/m/cn/jsp-mobile/sys/userLogin.jsp'
  },
  ele: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home/'
  },
  bishengke: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/'
  },
  jiyejia: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/'
  },
  starbucks: {
    url: require( './img/xingbake490.png' ),
    href: 'https://www.starbucks.com.cn/'
  },
  beequick: {
    url: require( './img/aixianfeng490.png' ),
    href: 'http://m.beequick.cn'
  },
  dameile: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  buding: {
    url: require( './img/budingwaimai490.png' ),
    href: 'http://www.buding.cn/i_takeout.html'
  }
}; // 全部数据
var order = Object.keys(dragDate); //Array of keys

var dragDateLen = order.length;

var listViewH = dragDateLen * (height + 4)/2 -2; // listView 高度
var scrollTop = 0; //listView 滚动的高度
var baseHeight = 0;  // 手机自带导航栏的高度
// 相应的坐标值

// 高度对应
var siteArr = [];
for ( let i = 0; i !== dragDateLen + 2; i++) {
  let res = i % 2;  // 0 or 1
  let multiple = Math.floor(i/2); //高度倍率
  //console.log( multiple, res );
  let h =  (height + 4) * multiple ;
  let w = res ? width + 4 : 0 ;
  siteArr[i] = {
    left: w,
    top: h
  }
}
console.log( siteArr );

// 是判断触摸的范围
var judgeNum;    // -- 目前只能通过外部变量去保存当前触摸的位置,更好的方式~~~
function judgeIndex(w, h, i=0) {
  let numH = i+2;

  if(h < siteArr[numH].top){
    return judgeNum = w < siteArr[i+1].left ? i : i+1;
  }
  else if( h > siteArr[dragDateLen].top ){  // 当超出容器底部时
    return judgeNum = w < siteArr[dragDateLen+1].left ? dragDateLen-2 : dragDateLen-1;
  }
  judgeIndex( w, h, numH );
}

function copyArrayStr(arr) {
  let len = arr.length;
  var newArr = [];
  for ( let i = 0; i !== len; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
}

class DragBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: '', // 记录当前移动到的位置
      listen: false,
      fadeAnim: new Animated.Value(0), // opacity 0
    };

  }

  shouldComponentUpdate(nextProps, nextState) {
    let listen = this.state.listen;
    return nextProps.attr !== this.props.attr || listen;
  }

  componentDidMount() {
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 1,        // Target
        duration: 600,    // Configuration
      }
    ).start();             // Don't forget start!
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: (e, gs) => {
      let scroll = !this.state.listen;
      console.log(scroll, 'scroll , onMoveShouldSetPanResponderCapture');
      scroll && this.id && clearTimeout(this.id);
      return scroll;
    },
    onPanResponderGrant: (e, gs) => {
      console.log('onPanResponderGrant');
      let { pageX, pageY } = e.nativeEvent;
      this.id = setTimeout( () => {
        this.props.onStartDrag(this.props.attr, {y: pageY - height/2, x: pageX - width/2});
        Animated.timing(       // Uses easing functions
          this.state.fadeAnim, // The value to drive
          {
            toValue: 0,        // Target
            duration: 400,    // Configuration
          }
        ).start();
      }, 100);
    },
    onMoveShouldSetPanResponder: () => true,
    onResponderTerminationRequest: (evt) => false,
    onPanResponderMove: (evt,gs)=>{
      // 当前额外元素的位置   相对于根目录,
      // 判断滚动到的位置呢   相对listView的总坐标和横坐标(的top, left)
      let { pageX, pageY } = evt.nativeEvent;
      let offsetY = pageY + scrollTop - baseHeight;

      // 虚拟占位
      //judgeIndex(pageX - width/2 , offsetY - height/2);
      judgeIndex(pageX , offsetY);
      let index = judgeNum;

      // 移动还在当前元素范围内时 oriIndex, nowIndex
      let lastIndex = this.state.index;
      if( index !== lastIndex){
        this.setState({
          index: index
        });
      }

      // 更新数组  做延迟处理, 快速移动到某位置时
      let {vx, vy, dx, dy} = gs;
      //if( Math.abs(vx) <= 0.03 || Math.abs(vy) <= 0.03  ){
      //  return false;
      //}

      // 添加的额外元素定位
      this.props.onDraging({x: dx, y:dy});
    },
    onPanResponderRelease: (evt,gs)=>{
      console.info('松手啦~~~');
      this._onResponderend();
    },
    onPanResponderTerminate: (evt, gestureState) => {
      console.log( '另一个组件已经成为了新的响应者' );
      this._onResponderend();
    }
  });

  _onResponderend() {
    this.setState({
      listen: false
    });
    this.id && clearTimeout(this.id);

    let lastIndex = Number(this.state.index);
    let oriIndex = Number(this.props.index);

    if(lastIndex === oriIndex){
      // 当前元素显示
      Animated.timing(       // Uses easing functions
        this.state.fadeAnim, // The value to drive
        {
          toValue: 1,        // Target
          duration: 400,    // Configuration
        }
      ).start();
    }

    this.props.onUpdate( oriIndex, lastIndex);
  }

  render() {
    let listen = this.state.listen;

    console.log( listen, '子组件在render~~~~' );
    return (
      <View
        {...this._panResponder.panHandlers}
      >
        <TouchableHighlight
          onLongPress={() => {
            console.log('onLongPress');
            // 只有当长按后,才可以拖拽...
            this.setState({
              listen: true
            });
          }}
          onPress={() => console.log('press')}
          underlayColor="transparent"
        >
          <Animated.View   // Special animatable View
            style={[styles.row, {
              opacity: this.state.fadeAnim,  // Binds
            }]}>
            <Image
              source={this.props.url}
              style={styles.thumb}
              resizeMode='contain'
            />
          </Animated.View>
        </TouchableHighlight>
      </View>

    );
  }
}

export default class DragBtnContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          return true;
        }
      }),
      fadeAnim: new Animated.Value(0), // opacity 0
      sticker: new Animated.ValueXY(),                    // 1 leader
      couldScroll: true,
      order: order,
      expert: '',
    }
  }

  componentDidMount() {
    this.setState({
      ds: this.state.ds.cloneWithRows(this.state.order)
    })
  }

  render() {
    let dragDates = this.state.order;
    //console.log('当前遍历的数据', dragDates);
    console.info( 'listView render' );

    let couldScroll = this.state.couldScroll;
    let expert = this.state.expert;

    return (
      <View
        ref="wrapper"
        style={styles.container}
        onLayout={()=>{}}
      >
        <ListView
          contentContainerStyle={styles.list}
          style={{height: HEIGHT}}
          enableEmptySections={true}
          ref="list"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          dataSource={this.state.ds}
          pageSize={2}
          onScroll={e => {
            // 偏移!!! 滚动过程中
            scrollTop = e.nativeEvent.contentOffset.y;
          }}
          onContentSizeChange={(width, height) => {
            // 可视范围内 -- 横屏时...
          }}
          onLayout={(e,a) => {
            baseHeight = e.nativeEvent.layout.y;
          }}
          scrollEnabled={ couldScroll && listViewH > HEIGHT}
          renderRow={this.renderRow.bind(this)}
        />

        <Animated.View
          style={[styles.row,{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: this.state.fadeAnim,
                transform: this.state.sticker.getTranslateTransform()
              }]}
          key={'expert'}
          ref={'expert'}
        >
          {
            expert !== '' && <Image
              source={dragDate[expert].url}
              style={[styles.thumb, styles.expert]}
              resizeMode='contain'
            />
          }
        </Animated.View>

    </View>
    );
  }

  _onStartDrag( attr ,pos = {y: 0, x: 0}) {
    console.log(attr, pos, this, this.state.sticker);

    // 设置位移!
    this.state.sticker.setOffset(pos);
    this.state.sticker.setValue({x: 0, y: 0});

    this.setState({
      couldScroll: false,
      expert: attr
    });

    // 额外元素
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: .8,        // Target
        duration: 100,    // Configuration
      }
    ).start();
  }


  _onDraging(pos = {x: 0, y: 0}) {
    // 额外元素 直接设置则没有动画效果 --
    // 也是直接设置,但是报错 --
    //this.refs.expert.setNativeProps({style: {
    //  transform: this.state.sticker.getTranslateTransform()
    //}});

    // 额外元素 拖动
    Animated.spring(this.state.sticker, {
      tension: 10,
      friction: 3,
      toValue: pos,               // Animated toValue's are tracked
    }).start();
  }

  _onUpdate(oriIndex, nowIndex) {
    // 额外元素
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 0,        // Target
        duration: 400,    // Configuration
      }
    ).start();

    if(nowIndex === oriIndex){
      this.setState({
        couldScroll: true,
        expert: ''
      });
      return false;
    }

    console.log(oriIndex, nowIndex, 'oriIndex, nowIndex, this.props.children');
    let order = copyArrayStr(this.state.order);
    let oriData = order.splice( oriIndex, 1 )[0];
    order.splice( nowIndex, 0, oriData);

    this.setState({
      couldScroll: true,
      ds: this.state.ds.cloneWithRows(order),
      order: order,
      expert: ''
    });
  }
  renderRow(data, sectionID, rowID, highlightRow) {
    return (
      <DragBtn
        onStartDrag={this._onStartDrag.bind(this)}
        onDraging={this._onDraging.bind(this)}
        onUpdate={this._onUpdate.bind(this)}
        url={dragDate[data].url}
        href={dragDate[data]}
        ref={'item' + rowID}
        attr={data}  // 对象的key,s
        key={data}
        index={rowID}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    marginBottom: 4,
    alignItems: 'center',
  },
  thumb: {
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },
  expert: {
    borderColor: '#e8e8e8',
    borderWidth: 2,
  }
});




