'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ProgressViewIOS,
  AppRegistry,
  StyleSheet,
  View,
  } = ReactNative;
var TimerMixin = require('react-timer-mixin');

var ProgressViewExample = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      progress: 0,
    };
  },

  componentDidMount() {
    this.updateProgress();
  },

  updateProgress() {
    var progress = this.state.progress + 0.01;
    this.setState({ progress });
    this.requestAnimationFrame(() => this.updateProgress());
  },

  getProgress(offset) {
    var progress = this.state.progress + offset;
    return Math.sin(progress % Math.PI) % 1;
  },

  render() {
    // progress:  number 当前的进度值（0到1之间）。
    // progressTintColor:  string 进度条本身染上的颜色。
    // progressImage: Image.propTypes.source   一个可以拉伸的图片，用于显示进度条。
    // progressViewStyle: enum('default', 'bar') #进度条的样式。

    // trackImage: Image.propTypes.source  一个可拉伸的图片，用于显示进度条后面的轨道。
    // trackTintColor string  进度条轨道染上的颜色
    return (
      <View style={styles.container}>
        <ProgressViewIOS style={styles.progressView}
                         progressTintColor="purple"
                         trackTintColor="yellow"
                         progress={this.getProgress(0.2)}/>
        <ProgressViewIOS style={styles.progressView}
                         progressImage={require('./img/icon.png')}
                         trackImage={require('./img/search.png')}
                         progressViewStyle={'bar'}
                         progress={this.getProgress(0.4)}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  progressView: {
    marginTop: 20,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => ProgressViewExample);
