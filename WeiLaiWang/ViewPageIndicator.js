'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Text,
} = ReactNative;

var DefaultViewPageIndicator = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activePage: React.PropTypes.number,
    len: React.PropTypes.number,
    onJumpEdit: React.PropTypes.func
  },

  getInitialState() {
    return {
      //viewWidth: 0,
    };
  },

  _renderIndicator(i, title) {
    let isActive = this.props.activePage === i;
    return (
      <TouchableHighlight
        key={this.props.index + 'btn' + i }
        activeOpacity={.8}
        underlayColor="rgba(255, 255, 255, 0.6)"
        style={styles.tab}
        onPress={() => {
          if ( isActive ) {
            return false;
          }
          this.props.goToPage(i);
        }}
      >
        <Text style={[styles.tabText, isActive &&  {color: '#ff5248'}]} >
          {title}
        </Text>
      </TouchableHighlight>
    );
  },

  render() {
    let {len} = this.props;
    let indicators = [];
    for (let i = 0; i !== len; i++) {
      indicators.push(this._renderIndicator(i, this.props.title[i]));
    }
    return (
      <View
        style={styles.indicator}
      >
        {indicators}
        <TouchableHighlight
          style={styles.edit}
          onPress={() => this.props.onJumpEdit()}
          underlayColor="transparent"
        >
          <Image
            style={styles.editPic}
            source={require('./img/edit.png')}
          >
          </Image>
        </TouchableHighlight>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  indicator: {
    height: 48,
    marginRight: 60,
    flexDirection: 'row',
    //flexWrap: 'nowrap',
    //justifyContent: 'space-between',
    alignItems: 'center',
  },
  edit: {
    position: 'absolute',
    right: -60,
    width: 60,
    height: 48,
    paddingRight: 16,
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPic: {
    width: 18,
    height: 18,
  },
  editText: {
    fontSize: 12,
    textAlign: 'center'
  },
  tab: {
    width: 60,
    marginLeft: 16,
    //padding: 6,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    //justifyContent: 'center',
    borderColor: '#ededed',
    borderRadius: 4,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  },
});

module.exports = DefaultViewPageIndicator;
