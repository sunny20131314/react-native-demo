/**
 * Created by sunzhimin on 16/6/8.
 * 路由---导航栏
 * 路由设置有两种方式: initialRoute & initialRouteStack
 *
 * 参考:
 * http://reactnative.cn/docs/0.26/navigator.html#content
 * http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B
 *
 * 疑问:
 * 属性: navigator && navigationBar
 * && navigationContext.addListener('didfocus', callback)(onDidFocus)
 * && navigationContext.addListener('willfocus', callback)(onWillFocus)
 */

// public method,就是跳转用的:
// navigator.getCurrentRoutes(); // 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
// navigator.jumpBack(); //跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
// navigator.jumpForward();// 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
// navigator.jumpTo(route);// 跳转到已有的场景并且不卸载。

// navigator.pop(); // 很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
// navigator.push({}); // 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去

//navigator.replace(route); //  用一个新的路由替换掉当前场景
//navigator.replaceAtIndex(route, index); // - 替换掉指定序列的路由场景
//navigator.replacePrevious(route);    //  - 替换掉之前的场景

//navigator.resetTo(route);   // - 跳转到新的场景，并且重置整个路由栈
//navigator.immediatelyResetRouteStack(routeStack);  // - 用新的路由数组来重置路由栈

//navigator.popToRoute(route);   // - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
//navigator.popToTop();   // - pop到栈中的第一个场景，卸载掉所有的其他场景。

import React from 'react';
import {
  View,
  Navigator,
  Tabs
} from 'react-native';
import FirstPageComponent from './AFirstPageComponent';

export default class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: 0,
      tabIndex: 0
    };
  }

  render() {
    console.log(this._navigator);
    return (
      <Navigator

        sceneStyle={
          //sceneStyle: 将会应用在每个场景的容器上的样式。
          //和style 有何区别
          { paddingTop: 20}
        }

        ref={(navigator) => {
                  // ref??
                  this._navigator = navigator;
                }}
        initialRoute={
              // initialRoute={{ name: defaultName, component: defaultComponent }}
              // 这个指定了默认的页面，定义启动时加载的路由。
              // 也就是启动app之后会看到界面的第一屏。 需要填写两个参数: name 跟 component。
              // 路由是导航栏用来识别渲染场景的一个对象。initialRoute必须是initialRouteStack中的一个路由。initialRoute默认为initialRouteStack中最后一项。

              // name??? 有什么影响, 用来?
            { name: 'FirstPageComponent', component: FirstPageComponent, index: 0}
        }
        configureScene={(route) => {
              // 可以通过configureScene属性获取指定路由对象的配置信息，从而改变场景的动画或者手势。
              // 可以看这个目录下，有源代码的:
              // node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

              // console.log(Navigator.SceneConfigs);   // 所有的 configureScene 配置场景

              //会带有两个参数调用，一个是当前的路由，一个是当前的路由栈 ???。然后它应当返回一个场景配置对象

                if (route.sceneConfig) {
                  return route.sceneConfig;
                }

                return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
              }}


        //navigationBar={
        //  //可选参数，提供一个在场景切换的时候保持的导航栏。
        //  // ??? 如何使用
        //  // 是因为没有拿到 navigator??? _navigator
        //                <Tabs
        //                    ref={(navBar) => { this.navBar = navBar; }}
        //                    navigator={this._navigator}
        //                    route={this.route}
        //                    onTabIndex={(index) => {
        //                        this._navigator.jumpTo(ROUTE_STACK[index]);
        //                    }}
        //                />
        //            }

        renderScene={(route, navigator) => {
                // 用来渲染指定路由的场景。
                // 这里是每个人最疑惑的，我们先看到回调里的两个参数:route, navigator -- 路由和导航器。
                // route: 其实就是我们传递的name,component，
                // navigator: 是一个Navigator的对象，为什么呢，因为它有push pop jump...等方法，
                // 这是我们等下用来跳转页面用的那个 navigator 对象。

                // 这里有一个判断，也就是如果传递进来的component存在，
                // 那我们就是返回一个这个component，结合前面 initialRoute 的参数，
                // 我们就是知道，这是一个会被render出来给用户看到的component，
                // 然后navigator作为props传递给了这个component。

                let Component = route.component;
                //console.log(route);  // initialRoute 中 传递的name, component等参数
                //console.log(navigator);   // 一个Navigator的对象
                // console.log(route.params);  // undefined

                console.log('1-route', route);
                console.log('1-navigator', navigator);
                console.log('1-this.state.tabIndex', this.state.tabIndex);

                return (
                     <Component {...route.params} name={route.name} navigator={navigator} route={route}/>
                );
              }}
      />
    );
  }
}

