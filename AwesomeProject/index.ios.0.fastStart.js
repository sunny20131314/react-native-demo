/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 快速入门,展示数据
 * ListView, fetch
 */

//React Native运行在JavaScriptCore中是，也就是说，你可以使用JS的新特性啦，完全不用担心兼容什么的呢。

'use strict'; //开启 Strict Mode


/**
 * 为了避免骚扰，我们用了一个样例数据来替代Rotten Tomatoes的API
 * 请求，这个样例数据放在React Native的Github库中。
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


/*
* ListView
* 为什么建议把内容放到 ListView 里？比起直接渲染出所有的元素，或是放到一个ScrollView里有什么优势？
* 这是因为尽管React很高效，渲染一个可能很大的元素列表还是会很慢。
* ListView会安排视图的渲染，只显示当前在屏幕上的那些元素。
* 而那些已经渲染好了但移动到了屏幕之外的元素，则会从原生视图结构中移除（以提高性能）。
*
* */


import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} from 'react-native';


//React Native 组件并不是 UIKit 类，它们只能说是在某种程度上等同。
// 框架只是将 React 组件树转化成为原生的UI。 -> 运行的也是原生ui


//AwesomeProject 继承了 React.Component（React UI的基础模块）。
// 组件包含着不可变的属性，可变的状态变量以及暴露给渲染用的方法。
// 这会你做的应用比较简单，只用一个渲染方法就可以啦。
export default class AwesomeProject extends Component {

  // constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
  // 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  // constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

  //与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

  // 初始化STATE
  //state = {
  //  loopsRemaining: this.props.maxLoops,
  //}

  // 不过我们推荐更易理解的在构造函数中初始化（这样你还可以根据需要做一些计算）,如下：
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可,是指在父类(Component)上运行

    // ListView 中 dataSource接口: 在ListView的整个更新过程中判断哪些数据行发生了变化。
    this.state = {
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          console.log(row1);
          console.log(row2);
          row1 !== row2;
        }
      }),
      loaded: false,
      changeData: false,
      fontRed: true
    };
  }


  // 在ES5里，属性类型和默认属性分别通过 propTypes 成员和 getDefaultProps 方法来实现
  static defaultProps = {
    //maxLoops: 10
  };  // 注意这里有分号

  static propTypes = {
    style: View.propTypes.style
  };  // 注意这里有分号


  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    console.log('update');

    // 仅执行一次!
    if(this.state.changeData){
      return false;
    }
    setTimeout(() => {
      console.log('time out');
      this.setState({
        changeData: true,
        dataSource: this.state.dataSource.cloneWithRows(this.state.data)
      })
    }, 1000)
  }

  // 你所需要做的就是在Promise调用链结束后执行this.setState({movies:data})。
  // 在React的工作机制下，setState实际上会触发一次重新渲染的流程，此时render函数被触发，发现this.state.movies不再是null。
  // 注意我们在Promise调用链的最后调用了done() —— 这样可以抛出异常而不是简单忽略。
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) =>response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          data: responseData.movies,
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true
        });
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();

  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    //console.log(movie); // 数组movies的每一个元素
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={[styles.title]}>111{movie.title}</Text>
          <Text style={[styles.year, styles.fontRed]}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
