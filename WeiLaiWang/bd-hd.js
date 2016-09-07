/**
 * Created by sunzhimin on 16/6/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  Picker,
  Image,
  Modal,
  Text,
  View
} from 'react-native';

const Item = Picker.Item;
let isIos = Platform.OS === 'ios';

let {width, height} = Dimensions.get('window');
let cityArr = ['北京', '天津', '上海', '重庆', '石家庄', '郑州', '武汉', '长沙', '南京', '南昌', '沈阳', '长春', '哈尔滨', '西安', '太原', '济南', '成都', '西宁', '合肥', '海口', '广州', '贵阳', '杭州', '福州', '台北', '兰州', '昆明', '拉萨', '银川', '南宁', '乌鲁木齐', '呼和浩特', '香港', '澳门' ];
class CityPick extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: this.props.city
    }
  }

  render() {
    return (
      <Picker
        selectedValue={this.state.city}
        style={[styles.picker, this.props.style]}
        enabled={true}
        //mode='dropdown'
        prompt="请选择城市:"
        onValueChange={(city) => {
          this.props.onCityChange(city);
          this.setState({city: city});
        }}
      >
        { cityArr.map( (city) => <Item style={{fontSize: 12,}} label={city} value={city} key={city} /> ) }
      </Picker>
    )
  }
}

class Ball extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.ball;
  }

  componentWillMount() {
    this.fetchBallData();
  }

  fetchBallData() {
    // --
    return false;
    fetch('http://f.apiplus.cn/ssq-1.json', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(json => {
      if(json && json.data){
        let data = json.data[0];
        let str = data.opencode;
        let arr = str.split('+');
        let redBall = arr[0].split(',');
        let blueBall = arr[1];
        this.setState({
          redBall: redBall,
          blueBall: blueBall,
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.blueBall !== nextState.blueBall || this.state.redBall !== nextState.redBall;
  }

  render() {
    let redBall = this.state.redBall;
    let blueBall = this.state.blueBall;
    return(
      <View style={styles.ball}>
        {
          redBall.map((number, i) => (
            <Image
              style={styles.ballImg}
              source={require('./img/redball.png')}
              key={'redBall' + i}
            >
              <Text style={styles.ballText} numberOfLines={1}> {number}</Text>
            </Image>
          ))
        }
        {
          <Image
            style={styles.ballImg}
            source={require('./img/blueball.png')}
            key={'blueBall'}
          >
            <Text style={[styles.ballText, styles.ballText]} numberOfLines={1}> {blueBall}</Text>
          </Image>
        }
      </View>
    );
  }
}

export default class Mess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city,
      showPick: false,
      weatherPic: '',
      weather: '',
      showLimitNum: true,
    };
  }

  componentWillMount() {
    this.fetchWeather(this.state.city);
  }

  fetchWeather(city) {
    let today = Math.ceil(new Date().getTime()/86400000);
    // --
    return false;
    fetch('http://apis.baidu.com/heweather/weather/free?city=' + city || this.state.city, {
      method: 'POST',
      headers:{
        apikey:'7472b1cdcf63836e3986c69f03860508'
      }
    }).then(response => {
      return response.json();
    }).then(json => {
      let data = json['HeWeather data service 3.0'][0];
      if(json && data){
        this.setState({
          weather: data
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  fetchWeatherPic() {
    let weather = this.state.weather;
    let time = new Date();
    let cHours = time.getHours();
    let cMinutes = time.getMinutes();
    if(cHours > 0 && cHours < 10){
      cHours = '0' + cHours;
    }
    if( cMinutes >=0 && cMinutes<10 ){
      cMinutes='0'+cMinutes;
    }
    let currentTime = cHours + ':' + cMinutes;

    let response = require('./weatherpic.json');
    let picData = response['cond_info'];
    let {ss, sr} = weather.daily_forecast[0].astro;
    let {code_d, code_n} = weather.daily_forecast[0].cond;
    let len = picData.length;
    if ( currentTime > sr && currentTime < ss ) {
      for ( let i = 0; i < len; i++ ){
        if ( picData[i].code ===  code_d ){
          return picData[i].icon1;
        }
      }
    }
    else {
      for ( let n = 0;  n < len; n++ ){
        if ( picData[n].code ===  code_n ){
          return picData[n].icon1;
        }
      }
    }
  }

  _onCityChange(city) {
    this.fetchWeather(city);
    this.setState({
      city: city,
      showLimitNum: city === '北京'
    });
  }

  _onJumpWeatherPage() {
    this.props.onJumpWeatherPage(this.state.weather.daily_forecast);
  }

  weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  render() {
    let {year, month, day, date} = this.props.date;
    let weather = this.state.weather;
    let max = '', min = '';
    weather && ( {max, min} = weather.daily_forecast[0].tmp);
    let pm25 = weather && weather.aqi.city.pm25 || '';
    let weatherPic = weather && this.fetchWeatherPic();

    let currentDate = year*10000 + ( month + 1 )* 100 + date;
    let response = require('./limitNO.json');
    let limitNum;
    for ( let m = 0, len = response.length; m !== len; m++ ) {
      if ( currentDate <= response[m].id ) {
        limitNum = response[m].data;
        break;
      }
    }
    return (
      <View style={styles.hd}>
        {
          isIos && <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.showPick}
            onshow={() => {}}
          >
            <View style={[styles.bottomIos, styles.modalCity]}>
              <CityPick city={this.state.city} onCityChange={this._onCityChange.bind(this)} />
              <TouchableHighlight
                activeOpacity={.8}
                onPress={() => {
                this.setState({showPick: false});
              }}
                underlayColor="rgba(255, 255, 255, 0.6)"
                style={[styles.hdBottomItem]}
              >
                <Text style={[{fontSize: 18, color: 'red'}]}>
                  确定
                </Text>
              </TouchableHighlight>
            </View>
          </Modal>
        }
        <View style={styles.hdLeft}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={this._onJumpWeatherPage.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.hdTop}>
              {
                weatherPic !== '' &&  <Image
                  source={{uri: weatherPic}}
                  style={styles.weatherPic}
                />
              }

              <Text style={styles.textLarge}>
                { max + '° ~' + min + '°' }
              </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.hdMedium}>
            {
              this.state.showLimitNum && (
                <Text style={styles.textMedium}>
                  今日限行: {limitNum[day].value}
                </Text>)
            }
          </View>
          <View style={[styles.hdBottom, {paddingLeft: 10, paddingRight: 10,}]}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://3g.d1xz.net/astro/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                星座
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.ziroom.com/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                租房
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.edu.k618.cn/camp/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                图片
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.hdCenter}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={() => this.props.onJumpCalendar()}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.flexColumn}>
              <View style={styles.hdTop}>
                <Text style={styles.textLarge}>
                  {( month + 1 ) + '月' + date + '日'}
                </Text>
              </View>
              <View style={styles.hdMedium}>
                <Text style={styles.textMedium}>
                  {this.weekday[day]}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={[styles.hdBottom, {justifyContent: 'center'}]}>
            {
              isIos
                ?  <TouchableHighlight
                activeOpacity={.8}
                onPress={() => this.setState({showPick: !this.state.showPick})}
                underlayColor="rgba(255, 255, 255, 0.6)"
                style={[styles.hdBottomItem]}
              >
                <View style={styles.cityPick}>
                  <Image
                    style={styles.cityPic}
                    source={require('./img/location1.png')}
                  >
                  </Image>
                  <Text>
                    {this.state.city}
                  </Text>
                </View>
              </TouchableHighlight>
                : <View>
                <View style={styles.cityPick}>
                  <Image
                    style={styles.cityPic}
                    source={require('./img/location1.png')}
                  >
                  </Image>
                  <Text>
                    {this.state.city}
                  </Text>
                </View>
                <CityPick
                  city={this.state.city}
                  onCityChange={this._onCityChange.bind(this)}
                  style={{position: 'absolute', top: 0, opacity: 0}}
                />
              </View>
            }
          </View>
        </View>
        <View style={styles.hdRight}>
          <TouchableHighlight
            activeOpacity={.8}
            style={styles.date}
            onPress={this._onJumpWeatherPage.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.flexColumn}>
              <View style={styles.hdTop}>
                <Text style={styles.textLarge}>
                  PM 2.5
                </Text>
              </View>
              <View style={styles.hdMedium}>
                <Text style={styles.textMedium}>
                  {pm25}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.hdBottom}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.zhcw.com/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
            >
              <View>
                <Ball ball={this.props.ball}/>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hd: {
    flex: 1,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textLarge: {
    fontSize: 16,
  },
  textMedium: {
    fontSize: 14,
  },
  flexColumn: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
  },
  hdLeft: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  hdTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  hdMedium: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  hdBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    //borderStyle: 'dotted',
  },
  hdBottomItem: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  weatherPic: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  hdCenter: {
    flex: 1,
    flexDirection: 'column',
    borderLeftColor: '#ededed',
    borderLeftWidth: 1,
    borderRightColor: '#ededed',
    borderRightWidth: 1,
    //borderStyle: 'dotted',
  },
  ball: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 6,
    //paddingLeft: 6,
    //paddingRight: 6,
  },
  ballText: {
    color: '#fff',
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center'
  },
  ballImg: {
    width: 14,
    height: 14,
  },
  picker: {
    justifyContent: 'center',
    width: 98,
    height: 40,
  },
  modalCity: {
    width: width,
    height: height/3,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  bottomIos: {
    position: 'absolute',
    bottom: 0,
  },
  cityPick: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityPic: {
    width: 12,
    height: 14,
    marginRight: 2,
  }
});
