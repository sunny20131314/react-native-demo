/**
 * Created by sunzhimin on 16/6/12.
 * 路由---导航栏
 * 路由设置有两种方式: initialRoute & initialRouteStack
 * 这里写的是: initialRouteStack 这种方式
 */
import React from 'react';
import {
  View,
  Navigator
} from 'react-native';
import FirstPageComponent from './AFirstPageComponent';
import SecondPageComponent from './ASecondPageComponent';


// 额外添加navigationBar的属性, 自定义设置导航栏, 保持所有页面的导航栏一致.
// 属性添加<NavigationBar/>标签, 通过routeMapper控制导航栏的功能和样式.
// NavigationBarRouteMapper: 导航栏路由映射器, 设置左键LeftButton, 右键RightButton, 标题Title.
export default class RouteComponent extends React.Component {



  render() {
    //
    let ROUTE_STACK = [
      {name: 'FirstPageComponent', component: FirstPageComponent, index: 0},
      {name: 'SecondPageComponent', component: SecondPageComponent, index: 1}
    ];
    let INIT_ROUTE_INDEX = 0;
    return (
      <Navigator
        style={{
          paddingTop: 20
          }}
        initialRouteStack={
          // initialRouteStack:
          // 提供一个路由集合用来初始化。如果没有设置初始路由的话则必须设置该属性。
          // 如果没有提供该属性，它将被默认设置成一个只含有initialRoute的数组。
          ROUTE_STACK
        }
        initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                { return (<Text>Cancel</Text>); },
              RightButton: (route, navigator, index, navState) =>
                { return (<Text>Done</Text>); },
              Title: (route, navigator, index, navState) =>
                { return (<Text>Awesome Nav Bar</Text>); },
            }}
            style={{backgroundColor: 'gray'}}
          />
        }
        configureScene={(route) => {
                return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
              }}
        renderScene={(route, navigator) => {
                let Component = route.component;

                return (
                  <Component
                    {...route.params}
                    name={route.name}
                    navigator={navigator}
                    />)
              }} />
    );
  }
}