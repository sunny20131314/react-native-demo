/**
 * Created by sunny on 16/6/28.
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  PanResponder,
  Platform,
  Dimensions,
  Animated,
  TouchableHighlight,
  ToastAndroid,
  AlertIOS,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Main from './main';
let isIos = Platform.OS === 'ios';
let SortableListView = require('./SortableListView');

class RowComponent extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        {...this.props.sortHandlers}
      >
        <Image
          source={this.props.data.url}
          style={[this.props.imgLayout]}
          resizeMode='contain'
        />
      </TouchableHighlight>
    )
  }
}

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    let {appDataOrders, data, navigator, index, activePage} = this.props;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.data = data;
    this.order = appDataOrders[index][activePage];
    this.navigator = navigator;
    this.appDataOrders = appDataOrders;

    // -- test
    this.data = {
      baidu: {url: require( './img/baiduwaimai490.png'), href: 'http://waimai.baidu.com/mobile/waimai'},
      meituan: {url: require( './img/meituanwaimai490.png'), href: 'http://i.waimai.meituan.com'},
      dianping: {url: require( './img/dazhongdp490.png'), href: 'http://m.dianping.com'},
      kfc: {url: require( './img/kendeji490.png'), href: 'http://m.4008823823.com.cn/kfcmwos/index.htm'},
      maidanglao: {url: require( './img/maidanglao490.png'), href: 'https://www.4008-517-517.cn/m/cn/jsp-mobile/sys/userLogin.jsp'},
      ele: {url: require( './img/elema490.png'), href: 'https://m.ele.me/home'},
      bishengke: {url: require( './img/bishengke490.png'), href: 'http://m.4008123123.com/PHHSMWOS/index.htm'},
      jiyejia: {url: require( './img/jiyejia490.png'), href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home'},
      starbucks: {url: require( './img/xingbake490.png'), href: 'https://www.starbucks.com.cn'},
      beequick: {url: require( './img/aixianfeng490.png'), href: 'http://m.beequick.cn'},
      dameile: {url: require( './img/dameile490.png'), href: 'http://m.dominos.com.cn'},
      buding: {url: require( './img/budingwaimai490.png'), href: 'http://www.buding.cn/i_takeout.html'},
      edaijia: {url: require( './img/edaijia490.png'), href: 'http://h5.edaijia.cn/app/index.html'},
      diditaxi: {url: require( './img/dididache490.png'), href: 'http://webapp.diditaxi.com.cn'},
      uber: {url: require( './img/uber490.png'), href: 'https://partners.uber.com.cn/ob/signup'},
      shenzhouzhuanche: {url: require( './img/shenzhouzhuanche490.png'), href: 'http://m.10101111.com'},
      weizhang: {url: require( './img/weizhangchaxun490.png'), href: 'http://m.weizhang8.cn'},
      aibang: {url: require( './img/aibanggongjiao490.png'), href: 'http://gj.aibang.com'},
      yongche: {url: require( './img/yidaoyongche490.png'), href: 'http://3g.yongche.com/touch'},
      tieyou: {url: require( './img/tieyouwang490.png'), href: 'http://m.tieyou.com'},
      uucars: {url: require( './img/youyouzuche.png'), href: 'http://m.uucars.com'},
      hangbanguanjia: {url: require( './img/hangbanguanjia490.png'), href: 'http://www.133.cn'},
      changtu: {url: require( './img/changtuqichepiao490.png'), href: 'http://m.changtu.com'},
      feichangzhun: {url: require( './img/feichangzhun490.png'), href: 'http://m.veryzhun.com'}
    };
    this.order = Object.keys(this.data);
    console.log(this.order, this.data);

  }

  _returnMain() {
    this.navigator && this.navigator.replace({
      name: 'Main',
      component: Main,
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  async _keepData() {
    try {
      let data = JSON.stringify(this.appDataOrders);
      await AsyncStorage.setItem('appDataOrders', data);
    } catch (error) {
      !isIos ? ToastAndroid.show('保存数据失败,请稍后再试!', ToastAndroid.SHORT)
              : AlertIOS.alert(
                  '提示: ',
                  '保存数据失败,请稍后再试!'
                );
    }
    this._returnMain();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={[styles.navBarRow]}>
          <TouchableOpacity
            onPress={this._returnMain.bind(this)}
            style={styles.navButton}>
            <Text style={styles.text}>
              {'<'}
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.title, {textAlign: 'center'}]}
            numberOfLines={1}
          >
            拖动排序
          </Text>
          <TouchableOpacity
            onPress={this._keepData.bind(this)}
          >
            <Text style={styles.text}>
              保存
            </Text>
          </TouchableOpacity>
        </View>
        <SortableListView
          styles={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between'}}
          data={this.data}
          order={this.order}
          imgLayout={this.imgLayout}
          onRowMoved={ e => {
                //this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0]);
                //console.log(this.order);
                //this.forceUpdate();
              }}
          scrollEnabled={true}
          renderRow={row => <RowComponent data={row} imgLayout={this.imgLayout} />}

          onMoveStart={() => {}}
          onMoveEnd={(e) => {
            //console.log(e.nativeEvent, 'e');
          }}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  navBarRow: {
    height: 45,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff5248',
  },
  text: {
    color: 'white',
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 13,
  },
  returnImg: {
    width: 40,
    height: 20,
  }
});