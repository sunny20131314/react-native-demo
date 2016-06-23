'use strict';

import React, {Component} from 'react';
import ReactNative, {
  AppRegistry,
  View,
  WebView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

//  嵌套网站, 有返回前进, 搜索!
export default class WebViewExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.baidu.com',
      title: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
    }
  }

  render() {
    this.inputText = this.state.url;

    return (
      <View style={[styles.container]}>
        <View style={[styles.navBarRow]}>
          <TouchableOpacity
            onPress={this.goBack.bind(this)}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text style={styles.text}>
              {'<'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableOpacity onPress={this.pressReturn.bind(this)}>
            <Image
              source={require('./img/back.png')}
              style={styles.returnImg}
            />
          </TouchableOpacity>
        </View>
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
          startInLoadingState={true}
          scalesPageToFit={true}
          onError={this.onError}
          injectedJavaScript='console.log(window);'
        />
      </View>
    );
  }

  onError() {
    Alert.alert(
      '加载失败: ',
      '请检查你输入的内容是否正确!'
    );
  }

  goBack() {
    this.refs['webview'].goBack();
  }

  goForward() {
    this.refs['webview'].goForward();
  }

  reload() {
    this.refs['webview'].reload();
  }

  onShouldStartLoadWithRequest(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  }

  onNavigationStateChange(navState) {
    console.log(navState);
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      title: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  }


  pressReturn() {
    console.log('哈哈, 返回导航栏!!!')
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
  },
  returnImg: {
    width: 20,
    height: 20,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => WebViewExample);
