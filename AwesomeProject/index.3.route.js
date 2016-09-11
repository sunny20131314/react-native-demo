/**
 * Created by sunzhimin on 9/8/16.
 * 导航栏
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  BackAndroid,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import tabBar from './AFirstPageComponent';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'redTab',
      notifCount: 0
    }

    this.ROUTE_STACK = [
      {
        name: 'tabBar',
        component: tabBar,
        index: 0,
        param: {
          left: false,
          right: false,
          title: false
        }
      },
      //{name: 'SecondPageComponent', component: SecondPageComponent, index: 1}
    ];
  }

  static defaultProps = {
    INIT_ROUTE_INDEX: 0
  };


  static propTypes = {
    //style: View.propTypes.style
  };

  _renderScene (route, navigator) {
    let Components = route.component;

    if ( Component ) {
      return (
        <View style={styles.view}>
          <StatusBar
            //hidden={route.statusBarHidden}
          />
          <Components
            {...route.params}
            handleBack={route.handleBack}
            name={route.name}
            navigator={navigator}
          />
        </View>)
    }
  }

  _configureScene (route) {
    return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
  }

  _NavigationBarRouteMapper() {
    return {
      LeftButton: (route, navigator, index, navState) => {
        // route 是传递的相关参数 props
        // navigator 相关方法
        // index 即传递进去的index
        // navState 即相关navigator的一些
        console.log(route, navigator, index, navState, 'route, navigator, index, navState');
        //switch route.
        if (index > 0) {
          return (
            <TouchableOpacity
              underlayColor='transparent'
              onPress={() => {
              if (index > 0) {navigator.pop()}
            }}
              style={styles.navBarContainer}
            >
              <Text style={[styles.navItemLeft, styles.textWhite]}>
                {'   ＜   '}
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <View style={styles.navBarContainer}>
              <Text style={[styles.navItemLeft, styles.textWhite]}>
                {'   ＜   '}
              </Text>
            </View>
          );
        }
      },
      RightButton: (route, navigator, index, navState) => {
        //if (route.onPress)
        return (
          <TouchableOpacity
            onPress={() => route.onPress && route.onPress()}
            style={styles.navBarContainer}
          >
            <Text style={[styles.navItemRight, styles.textWhite]}>
              {route.rightText || '   ＞   '}
            </Text>
          </TouchableOpacity>
        );
      },
      Title: (route, navigator, index, navState) => {
        return (
          <View style={styles.navBarContainer}>
            <Text style={[styles.navItemTitle, styles.textWhite]} >Awesome Nav Bar</Text>
          </View>
        );
      },
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <StatusBar
          //hidden={route.statusBarHidden}
          backgroundColor="black"
          barStyle="default"
        />
        <Navigator
          initialRouteStack={this.ROUTE_STACK}
          initialRoute={this.ROUTE_STACK[this.props.INIT_ROUTE_INDEX]}
          renderScene={this._renderScene.bind(this)}
          configureScene={this._configureScene.bind(this)}
          sceneStyle={styles.nav}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={this._NavigationBarRouteMapper()}
              style={styles.navBar}
            />
          }
        />
      </View>
    );
  }
}

// -- 继续调样式
const styles = StyleSheet.create({
  view: {
    flex:1,
    backgroundColor: 'white'
  },
  nav: {
  },
  navBar: {
    height: IsIos ? 64 : 44,
    backgroundColor: MAI_COLOR_RED
  },
  navBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  textWhite: {
    color: 'white'
  },
  navItemLeft: {
  },
  navItemRight: {
  },
  navItemTitle: {
  }
});


AppRegistry.registerComponent('AwesomeProject', () => tabBar);
