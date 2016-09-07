/*
* 目前暂未得知 数组的顺序是何时改变的
* */
import React from 'react';
import TimerMixin from 'react-timer-mixin';
import {
  ListView,
  LayoutAnimation,
  View,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback
} from 'react-native';
let HEIGHT = Dimensions.get('window').height;

var Row = React.createClass({
  shouldComponentUpdate: function(props) {
    if (props.hovering !== this.props.hovering) return true;
    if (props.active !== this.props.active) return true;
    if (props.rowData.data !== this.props.rowData.data) return true;
    return false;
  },
  handleLongPress: function(e) {
    this.refs.view.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
      // 计算指定视图在屏幕上显示的位置和尺寸，通过一个异步回调返回计算的结果。如果成功，回调函数会被调用，并带有以下参数：：
      let layout = {frameX, frameY, frameWidth, frameHeight, pageX, pageY};
      // 传递给active, 计算出hover的位置
      this.props.onRowActive({
        layout: layout,
        touch: e.nativeEvent,
        rowData: this.props.rowData
      });
    });
  },
  measure: function() {
    return this.refs.view.measure.apply(this, Array.from(arguments));
  },
  render: function() {
    //let layout = this.props.list.layoutMap[this.props.rowData.index];
    //let activeData = this.props.list.state.active;
    //let activeIndex = activeData ? Number(activeData.rowData.index) : -5;
    //let shouldDisplayHovering = activeIndex !== Number(this.props.rowData.index);

    let Row = React.cloneElement(
      this.props.renderRow(
        this.props.rowData.data,
        this.props.rowData.section,
        this.props.rowData.index,
        null,
        this.props.active
      ),
      {
        // 为什么方法不能直接传过来???
        sortHandlers: {
          onLongPress: this.handleLongPress,
          onPressOut: this.props.list.cancel
        },
        //onLongPress: this.handleLongPress,
        //onPressOut: this.props.list.cancel
      }
    );

    return <View onLayout={this.props.onRowLayout}
                 style={[this.props.imgLayout, this.props.active && this.props.list.state.hovering && {height: .01, opacity: 0}]}
                 ref="view">
          {this.props.active && this.props.list.state.hovering && this.props._legacySupport ? null : Row}
        </View>
  }
});

var SortRow = React.createClass({
  getInitialState: function() {
    let layout = this.props.list.state.active.layout;
    let wrapperLayout = this.props.list.wrapperLayout;
    //console.log(  layout.pageX - wrapperLayout.pageX, layout.pageY - wrapperLayout.pageY, 'marginLeft, marginTop');
    return {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: .8,
        height: layout.frameHeight,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginTop: layout.pageY - wrapperLayout.pageY, //Account for top bar spacing
        marginLeft: layout.pageX - wrapperLayout.pageX
      }
    }
  },
  render: function() {
    let handlers = this.props.panResponder.panHandlers;
    return (
      <Animated.View ref="view" style={[this.state.style, this.props.sortRowStyle, this.props.list.state.pan.getLayout()]}>
        {this.props.renderRow(this.props.rowData.data, this.props.rowData.section, this.props.rowData.index, null, true)}
      </Animated.View>
    );
  }
});

var SortableListView = React.createClass({
  mixins: [TimerMixin],
  getInitialState:function() {
    let currentPanValue = {x: 0, y: 0};

    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => {
        if (this.props.rowHasChanged) return this.props.rowHasChanged(r1, r2);
        return r1 !== r2;
      }}),
      active: false,
      // 当前hover的元素的index
      hovering: false,
      pan: new Animated.ValueXY(currentPanValue)
    };

    this.listener = this.state.pan.addListener(e => this.panY = e.y);
    let onPanResponderMoveCb = Animated.event([null, {
           dx: this.state.pan.x, // x, y are Animated.Value
           dy: this.state.pan.y,
      }]);

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => true,
      onMoveShouldSetPanResponderCapture: (e, a) => {
        //Only capture when moving vertically, this helps for child swiper rows.
        let vy = Math.abs(a.vy);
        let vx = Math.abs(a.vx);

        //return (vy) > vx  && this.state.active;
        return this.state.active;
      },
      onPanResponderMove: (evt, gestureState) => {
        //gestureState.dx = 0;
        
        this.moveX = gestureState.moveX;
        this.moveY = gestureState.moveY;
        onPanResponderMoveCb(evt, gestureState);
       },

       onPanResponderGrant: (e, gestureState) => {
          this.state.count++;
          this.moved = true;
          this.oriOrder = this.order;
          //console.log('order', this.order);
          this.props.onMoveStart &&  this.props.onMoveStart();
          this.state.pan.setOffset(currentPanValue);
          this.state.pan.setValue(currentPanValue);
      },
      onPanResponderRelease: (e) => {
        this.moved = false;
        this.props.onMoveEnd && this.props.onMoveEnd(e);
        if (!this.state.active) {
          if (this.state.hovering) this.setState({hovering: false});
          this.moveX = null;
          this.moveY = null;
          return;
        }
        let itemHeight = this.state.active.layout.frameHeight;
        let fromIndex = this.order.indexOf(this.state.active.rowData.index);
        let toIndex = this.state.hovering === false ?  fromIndex : Number(this.state.hovering);

        let up = toIndex > fromIndex;
        if (up) {
          toIndex--;
        }
        if (toIndex === fromIndex) return this.setState({active: false, hovering: false});
        let args = {
          row: this.state.active.rowData,
          from: fromIndex,
          to: toIndex
        };

        console.log(args);
        console.log( fromIndex, this.state.hovering, toIndex );
        this.props.onRowMoved && this.props.onRowMoved(args);
        if (this.props._legacySupport) { //rely on parent data changes to set state changes
          //LayoutAnimation.easeInEaseOut()
          this.state.active = false;
          this.state.hovering = false;
        } else {
          this.setState({
            active: false,
            hovering: false
          });
        }

        let MAX_HEIGHT = Math.max(0, this.scrollContainerHeight - this.listLayout.height + itemHeight);
        if (this.scrollValue > MAX_HEIGHT) {
          this.scrollResponder.scrollTo({y: MAX_HEIGHT});
        }

        this.state.active = false;
        this.state.hovering = false;
        this.moveX = null;
        this.moveY = null;
      }
     });

    return this.state;
  },
  cancel: function() { 
    if (!this.moved) {
      this.setState({
        active: false,
        hovering: false
      });
    }
  },
  componentDidMount: function() {
    setTimeout(()=>{
      this.scrollResponder = this.refs.list.getScrollResponder();
      this.refs.wrapper.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {

        let layout = {frameX, frameY, frameWidth, frameHeight, pageX, pageY};
        this.wrapperLayout = layout;
      });
    }, 1);

  },
  scrollValue: 0,
  scrollContainerHeight: HEIGHT * 2, //Gets calculated on scroll, but if you havent scrolled needs an initial value
  scrollAnimation: function() {
    if (this.isMounted() && this.state.active) {
      if (this.moveY == undefined) return this.requestAnimationFrame(this.scrollAnimation);

      let SCROLL_OFFSET = this.wrapperLayout.pageY;
      let moveY = this.moveY - SCROLL_OFFSET;
      let SCROLL_LOWER_BOUND = 80;
      let SCROLL_HIGHER_BOUND = this.listLayout.height - SCROLL_LOWER_BOUND;

      let MAX_SCROLL_VALUE = this.scrollContainerHeight - this.listLayout.height + (this.state.active.layout.frameHeight * 2);
      let currentScrollValue = this.scrollValue;
      let newScrollValue = null;
      let SCROLL_MAX_CHANGE = 20;
      if (moveY < SCROLL_LOWER_BOUND && currentScrollValue > 0) {
        let PERCENTAGE_CHANGE = 1 - (moveY / SCROLL_LOWER_BOUND);
        newScrollValue = currentScrollValue - (PERCENTAGE_CHANGE * SCROLL_MAX_CHANGE);
        if (newScrollValue < 0) newScrollValue = 0;
      }
      if (moveY > SCROLL_HIGHER_BOUND && currentScrollValue < MAX_SCROLL_VALUE) {
        let PERCENTAGE_CHANGE = 1 - ((this.listLayout.height - moveY) / SCROLL_LOWER_BOUND);
        newScrollValue = currentScrollValue + (PERCENTAGE_CHANGE * SCROLL_MAX_CHANGE);
        if (newScrollValue > MAX_SCROLL_VALUE) newScrollValue = MAX_SCROLL_VALUE;
      }
      if (newScrollValue !== null) {
        this.scrollValue = newScrollValue;
         //this.scrollResponder.scrollWithoutAnimationTo(this.scrollValue, 0);
         this.scrollResponder.scrollTo({y: this.scrollValue, x: 0, animated: false});
      }
      this.checkTargetElement();
      this.requestAnimationFrame(this.scrollAnimation);
    }
  },
  checkTargetElement() {
    let scrollValue = this.scrollValue;
    let moveX = this.moveX;
    let moveY = this.moveY;
    let targetPixel = scrollValue + moveY - this.wrapperLayout.pageY;
    let targetPixelX = moveX - this.wrapperLayout.pageX;
    let layoutWidth = this.listLayout.width;
    let itemWidth = 0;
    let i = 0;
    let x = 0;
    let row;
    let columns = 1;
    let order = this.order;
    let isLast = false;

    while (x < order.length) {
      let key = order[x];
      row = this.layoutMap[key];
      if (row.y > targetPixel) {
        break;
      }
      x++;
    }
    while (x > 0) {
      let key = order[--x];
      row = this.layoutMap[key];
      if (row.x <= targetPixelX) {
        break;
      }
    }
    if (x != this.state.hovering) {
      LayoutAnimation.easeInEaseOut();
      this._previouslyHovering = this.state.hovering;
      this.__activeY = this.panY;
      let newOrder = this.oriOrder;
      let hoverItem = newOrder.splice(this.state.hovering, 1);
      newOrder.splice(x, 0, hoverItem[0]);
      this.order = newOrder;
      this.setState({
        hovering: String(x),
      })
    }

  },


  // 记录位移!
  layoutMap: {},
  // 把所有的 ref 记录!
  _rowRefs: {},
  handleRowActive: function(row) {
    this.state.pan.setValue({x: 0, y: 0});
    LayoutAnimation.easeInEaseOut();
    this.moveX = row.layout.pageX;
    this.moveY = row.layout.pageY;
    let hoveringIndex = -1;
    for (var i = this.order.length - 1; i >= 0; i--) {
      if(this.order[i] === row.rowData.index)
        hoveringIndex = i;
    };
    //console.log(hoveringIndex, 'hoveringIndex');
    this.setState({
      active: row,
      hovering: hoveringIndex,
    },  this.scrollAnimation);

  },
  // 类似占位 ?
  renderActiveDivider: function() {
    let height = this.state.active ? this.state.active.layout.frameHeight : null;
    if (this.props.renderActiveDivider) return this.props.renderActiveDivider(height);
    return <View style={{height: height}} />
  },
  renderRow: function(data, section, index, highlightfn, active) {
    //console.log(index, active);
    // SortRow ? 是新添加的那个浮层...
    let Component = active ? SortRow : Row;
    active && console.log('SortRow');

    let isActiveRow = (!active && this.state.active && this.state.active.rowData.index === index);
    if (!active && isActiveRow) {
      active = {active: true};
    }
    let hoveringIndex = this.order[this.state.hovering];
    // -- Component组件中 方法 renderRow(组件SortableListView 上的props 传过来的) 是传给下面组件使用的 囧... 终于搞清楚了...
    return <Component
      {...this.props}
      activeDivider={this.renderActiveDivider()}
      key={index}
      active={active}
      list={this}
      ref={view => { this._rowRefs[active ? 'ghost' : index] = view; }}
      hovering={hoveringIndex == index}
      panResponder={this.state.panResponder}
      rowData={{data, section, index}}
      onRowActive={this.handleRowActive}
      onRowLayout={layout => {
        this.layoutMap[index] = layout.nativeEvent.layout;
      }}/>
  },
  renderActive: function() {
    if (!this.state.active) return;
    let index = this.state.active.rowData.index;
    return this.renderRow(this.props.data[index], 's1', index, () => {}, {active: true, thumb: true});
  },
  componentWillMount: function() {
    this.setOrder(this.props);
  },
  componentWillReceiveProps: function(props) {
    this.setOrder(props);
  },
  setOrder: function(props) {
    this.order = props.order || Object.keys(props.data) || [];
  },
  getScrollResponder: function() {
    return this.scrollResponder;
  },
  render: function() {
    let dataSource = this.state.ds.cloneWithRows(this.props.data, this.order);
    // 看不懂这里的 renderRow 和props传递的 renderRow 区别和联系 --
    return <View ref="wrapper" style={{flex: 1}} onLayout={()=>{}}>
      <ListView
        contentContainerStyle={this.props.styles}
        enableEmptySections={true}
        {...this.props}
        {...this.state.panResponder.panHandlers}
        ref="list"
        dataSource={dataSource}
        initialListSize={this.props.order.length}
        onScroll={e => {
          this.scrollValue = e.nativeEvent.contentOffset.y;
          this.props.onScroll && this.props.onScroll(e);
        }}
        onContentSizeChange={(width, height) => {
          this.scrollContainerHeight = height;
        }}
        onLayout={(e) => this.listLayout = e.nativeEvent.layout}
        scrollEnabled={!this.state.active && this.props.scrollEnabled}
        renderRow={this.renderRow}
      />
      {this.renderActive()}
    </View>
  }
});

module.exports = SortableListView;

