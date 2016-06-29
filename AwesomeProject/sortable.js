/**
 * Created by sunzhimin on 28/06/16.
 */

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

console.log( TimerMixin );
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
      let layout = {frameX, frameY, frameWidth, frameHeight, pageX, pageY};
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
    let layout = this.props.list.layoutMap[this.props.rowData.index];
    let activeData = this.props.list.state.active;

    let activeIndex = activeData ? Number(activeData.rowData.index) : -5;
    let shouldDisplayHovering = activeIndex !== this.props.rowData.index;
    let Row = React.cloneElement(this.props.renderRow(this.props.rowData.data, this.props.rowData.section, this.props.rowData.index, null, this.props.active), {sortHandlers: {onLongPress: this.handleLongPress, onPressOut: this.props.list.cancel}, onLongPress: this.handleLongPress, onPressOut: this.props.list.cancel});
    return (
      <View
        onLayout={this.props.onRowLayout}
        style={this.props.active && this.props.list.state.hovering ? {height: 0.01, opacity: 0} : null}
        ref="view"
      >
        {this.props.hovering && shouldDisplayHovering ? this.props.activeDivider : null}
        {this.props.active && this.props.list.state.hovering && this.props._legacySupport ? null : Row}
      </View>
    )}
});

var SortRow = React.createClass({
  getInitialState: function() {
    let layout = this.props.list.state.active.layout;
    let wrapperLayout = this.props.list.wrapperLayout;

    return {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: .2,
        height: layout.frameHeight,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginTop: layout.pageY - wrapperLayout.pageY //Account for top bar spacing
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
      ds: new ListView.DataSource({rowHasChanged: (prev, next) => {
        //  if (this.props.rowHasChanged) return this.props.rowHasChanged(prev, next);
        // return prev !== next;
        return false;
      }}),
      active: false,
      hovering: false,
      pan: new Animated.ValueXY(currentPanValue)
    };

    // -- 记录 y的位置  添加一个异步监听函数，这样你就可以监听动画值的变更。
    this.listener = this.state.pan.addListener(e => this.panY = e.y);
    let onPanResponderMoveCb = Animated.event([null, {
      dx: this.state.pan.x, // x,y are Animated.Value
      dy: this.state.pan.y,
    }]);

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => true,
      onMoveShouldSetPanResponderCapture: (e, a) => {
        //Only capture when moving vertically, this helps for child swiper rows.
        let vy = Math.abs(a.vy);
        let vx = Math.abs(a.vx);

        return (vy) > vx  && this.state.active;
      },
      onPanResponderMove: (evt, gestureState) => {
        gestureState.dx = 0;
        this.moveY = gestureState.moveY;
        onPanResponderMoveCb(evt, gestureState);
      },

      onPanResponderGrant: (e, gestureState) => {
        this.moved = true;
        this.props.onMoveStart &&  this.props.onMoveStart();
        this.state.pan.setOffset(currentPanValue);
        this.state.pan.setValue(currentPanValue);
      },
      onPanResponderRelease: (e) => {

        this.moved = false;
        this.props.onMoveEnd && this.props.onMoveEnd();
        if (!this.state.active) {
          if (this.state.hovering) this.setState({hovering: false});
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
  scrollContainerHeight: HEIGHT * 1.2, //Gets calculated on scroll, but if you havent scrolled needs an initial value
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
    let moveY = this.moveY;
    let targetPixel = scrollValue + moveY - this.wrapperLayout.pageY;
    let i = 0;
    let x = 0;
    let row;
    let order = this.order;
    let isLast = false;
    while (i < targetPixel) {
      let key = order[x];
      row = this.layoutMap[key];
      if (!row) {
        isLast = true;
        break;
      }
      i += row.height;
      x++;
    }
    if (!isLast) x--;
    if (x != this.state.hovering) {
      LayoutAnimation.easeInEaseOut();
      this._previouslyHovering = this.state.hovering;
      this.__activeY = this.panY;
      this.setState({
        hovering: String(x)
      })
    }

  },
  layoutMap: {},
  _rowRefs: {},
  handleRowActive: function(row) {
    this.state.pan.setValue({x: 0, y: 0});
    LayoutAnimation.easeInEaseOut();
    this.moveY = row.layout.pageY;
    this.setState({
      active: row,
      hovering: row.rowData.index,
    },  this.scrollAnimation);
  },
  renderActiveDivider: function() {
    let height = this.state.active ? this.state.active.layout.frameHeight : null
    if (this.props.renderActiveDivider) return this.props.renderActiveDivider(height);
    return <View style={{height: height}} />
  },
  renderRow: function(data, section, index, highlightfn, active) {
    let Component = active ? SortRow : Row;
    let isActiveRow = (!active && this.state.active && this.state.active.rowData.index === index);
    if (!active && isActiveRow) {
      active = {active: true};
    }
    let hoveringIndex = this.order[this.state.hovering];
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
      onRowLayout={layout => this.layoutMap[index] = layout.nativeEvent.layout}
    />
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
    let dataSource = this.state.ds.cloneWithRows(this.props.data, this.props.order);
    return <View
      ref="wrapper"
      style={{
        flex: 1,
        //flexDirection: 'row',
        //flexWrap: 'wrap',
        //justifyContent: 'space-between',
        //alignItems: 'flex-start',
      }}
      onLayout={()=>{}}>
      <ListView
        enableEmptySections={true}
        {...this.props}
        {...this.state.panResponder.panHandlers}
        ref="list"
        dataSource={dataSource}
        onScroll={e => {
          this.scrollValue = e.nativeEvent.contentOffset.y;
          console.log(e.nativeEvent, this.scrollValue);
          if (this.props.onScroll) this.props.onScroll(e);
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
class TestMore extends Component {
  render() {
    return (
      <View>
        <MyComponent />
      </View>
    )
  }

}

AppRegistry.registerComponent('WeiLaiWang', () => TestMore);


