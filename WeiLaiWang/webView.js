/**
 * Created by sunzhimin on 16/6/20.
 * 在合适返回主页???
 */

'use strict';

import React, {Component} from 'react';
import ReactNative, {
  AppRegistry,
  BackAndroid,
  Dimensions,
  View,
  WebView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
let WIDTH = Dimensions.get('window').width;
let isIos = Platform.OS === 'ios';

//  嵌套网站, 有返回前进, 搜索!
export default class WebViewCom extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;

    this.state = {
      //url: this.props.url,
      title: '加载中,请稍后...',
      backButtonEnabled: false,
      loading: true,
      titleNow: '',
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    // TODO, 手动绑定函数, 后期改
    let routers = this.navigator.getCurrentRoutes();
    let top = routers[routers.length - 1];
    top.handleBack = this.goBack.bind(this);

    routers = null;
    top = null;
  }

  onError() {
    Alert.alert(
      '提示: ',
      '加载页面出错,请稍后再试!'
    );
  }

  goReturn() {
    // 主页webview 返回上一页面,
    this.props.linkReturn && this.props.linkReturn();
    this.navigator.pop();
  }

  goBack() {
    this.state.backButtonEnabled ? this.refs['webview'].goBack() : this.goReturn();
  }

  onShouldStartLoadWithRequest(event) {
    this.setState({
      titleOri: event.title
    });
    return true;
  }

  onNavigationStateChange(nav) {
    // TODO 为了解决 webview 中地址搜索的两个链接的不停跳转(重定向)
    // 第二次: 拿到页面的相关数据  米有 navigationType
    // android: loading触发三次: 2次loading, 1次loading: false

    this.setState({
      loading: nav.loading,
      title: nav.title,
      backButtonEnabled: nav.canGoBack,
    });

    console.log( 'url~~~~', nav.url );
  }

  render() {
    return (
      <View style={[styles.container]}>
        {!this.props.noTitle && (
          <View style={[styles.navBarRow]}>
            <TouchableOpacity
              onPress={this.goBack.bind(this)}
              style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
              <Text style={styles.text}>
                {'<'}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.title]} numberOfLines={1}>{this.state.title}</Text>
            <TouchableOpacity
              onPress={() => this.navigator.pop()}
            >
              <Image
                source={require('./img/logo.jpg')}
                style={styles.returnImg}
              />
            </TouchableOpacity>
          </View>
        )}
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={true}
          style={styles.webView}
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
          startInLoadingState={true}
          scalesPageToFit={true}
          onError={this.onError.bind(this)}
        />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ff5248',
  },
  navBarRow: {
    height: 45,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 13,
    width: WIDTH - 80,
    textAlign: 'center'
  },
  returnImg: {
    width: 40,
    height: 20,
  }
});
