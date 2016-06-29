'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  ScrollView,
  Dimensions,

  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView
  } = ReactNative;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'http://www.baidu.com';

//  嵌套网站, 有返回前进, 搜索!
var WebViewExample = React.createClass({

  getInitialState: function() {
    return {
      url: DEFAULT_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
    };
  },

  inputText: '',

  handleTextInputChange: function(event) {
    var url = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }
    this.inputText = url;
  },

  render: function() {
    this.inputText = this.state.url;

    return (
      <View style={[styles.container]}>
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'<'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {
                //'>'
              }
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.state.url}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                Go!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={true}
          onError={this.onError}
          injectedJavaScript='console.log(window);'
        />
      </View>
    );
  },

  onError: function() {
    Alert.alert(
      '加载失败: ',
      '请检查你输入的内容是否正确!'
    );
  },

  goBack: function() {
    this.refs[WEBVIEW_REF].goBack();
  },

  goForward: function() {
    this.refs[WEBVIEW_REF].goForward();
  },

  reload: function() {
    this.refs[WEBVIEW_REF].reload();
  },

  onShouldStartLoadWithRequest: function(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  },

  onNavigationStateChange: function(navState) {
    console.log(navState);
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  },

  onSubmitEditing: function(event) {
    this.pressGoButton();
  },

  pressGoButton: function() {
    var url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyboard
    this.refs[TEXT_INPUT_REF].blur();
  },

});

var Button = React.createClass({
  _handlePress: function() {
    if (this.props.enabled !== false && this.props.onPress) {
      this.props.onPress();
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={[styles.button, this.props.enabled ? {} : styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

// 是否 scale
var ScaledWebView = React.createClass({

  getInitialState: function() {
    return {
      scalingEnabled: true,
    }
  },

  render: function() {
    return (
      <View>
        <WebView
          style={{
            backgroundColor: BGWASH,
            height: 200,
          }}
          source={{uri: 'https://facebook.github.io/react/'}}
          scalesPageToFit={this.state.scalingEnabled}
        />
        <View style={styles.buttons}>
          { this.state.scalingEnabled ?
            <Button
              text="Scaling:ON"
              enabled={true}
              onPress={() => this.setState({scalingEnabled: false})}
            /> :
            <Button
              text="Scaling:OFF"
              enabled={true}
              onPress={() => this.setState({scalingEnabled: true})}
            /> }
        </View>
      </View>
    );
  },
});

// 本地 html
var LocalWebView = React.createClass({

  render(): ReactElement {
    return (
      <WebView
        style={{
            backgroundColor: BGWASH,
            height: 500,
          }}
        source={require('./calendar.html')}
        scalesPageToFit={true}
      />
    );
  }
});

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
  </body>
</html>
`;


// static html
var StaticWebView = React.createClass({

  render(): ReactElement {
    return (
      <WebView
        style={{
            backgroundColor: BGWASH,
            height: 100,
          }}
        source={{html: HTML}}
        scalesPageToFit={true}
      />
    );
  }
});


// post html
var PostWebView = React.createClass({

  render(): ReactElement {
    return (
      <WebView
        style={{
            backgroundColor: BGWASH,
            height: 100,
          }}
        source={{
            uri: 'http://www.posttestserver.com/post.php',
            method: 'POST',
            body: 'foo=bar&bar=foo'
          }}
        scalesPageToFit={false}
      />
    );
  }
});


// 前面的所有列子的整合
var AllWebView = React.createClass({

  render() {
    var {height} = Dimensions.get('window');
    var _scrollView = ScrollView;

    return (
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          style={[styles.scrollView, {height: height }]}
        >
          <WebViewExample />
          <ScaledWebView />
          <LocalWebView />
          <StaticWebView />
          <PostWebView />
        </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    paddingTop: 20,
    backgroundColor: HEADER,
  },
  scrollView: {
    flex:1,
    backgroundColor: '#fff',
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 40,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => WebViewExample);
//AppRegistry.registerComponent('AwesomeProject', () => ScaledWebView);
//AppRegistry.registerComponent('AwesomeProject', () => LocalWebView);
//AppRegistry.registerComponent('AwesomeProject', () => StaticWebView);
//AppRegistry.registerComponent('AwesomeProject', () => PostWebView);
//AppRegistry.registerComponent('AwesomeProject', () => AllWebView);
