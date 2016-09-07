/**
 * Created by sunzhimin on 13/07/16.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ListView,
  Image,
  Text,
  View,
  //Platform
} from 'react-native';

export default class WeatherPage extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = this.props.data;

    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  _returnMain() {
    let {navigator} = this.props;
    if (navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
    }
  }
  weekday = ["日","一","二","三","四","五","六"];

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    let srcDay = '', srcNight = '';
    let {code_d, code_n, txt_d, txt_n} = rowData.cond;

    let response = require('./weatherpic.json');
    let picData = response['cond_info'];

    for (let i = 0, len = picData.length; i < len; i++ ) {
      var code = picData[i].code;
      if ( code === code_d ) {
        srcDay = picData[i].icon2;
      }
      if ( code === code_n ) {
        srcNight = picData[i].icon2;
      }
    }

    let {max, min} = rowData.tmp;
    var wind=rowData.wind.sc;

    let time = new Date();
    let cHours = time.getHours();
    let cMinutes = time.getMinutes();
    if(cHours > 0 && cHours < 10){
      cHours = '0' + cHours;
    }
    if( cMinutes >= 0 && cMinutes<10 ){
      cMinutes='0'+cMinutes;
    }
    let currentTime = cHours + ':' + cMinutes;
    let {ss, sr} = rowData.astro;
    let weatherText = currentTime > sr && currentTime < ss ? txt_d: txt_n;

    let index = Number(rowID);
    let newDate = new Date( time.getTime() + 86400000 * index );
    let day = newDate.getDate();
    let weekday = this.weekday[newDate.getDay()];

    return (
       <View
         style={styles.weatherDetail}
         key={`item-${rowID}`}
       >
         <Text style={styles.textWhite}>
           { day + '日 (周' + weekday + ') ' }
         </Text>
         <Image
           style={styles.weatherPic}
           source={{uri: srcDay}}
         />
         <Image
           style={styles.weatherPic}
           source={{uri: srcNight}}
         />
         <Text style={styles.textWhite}>
           { weatherText }
         </Text>
         <Text style={styles.textWhite}>
           { max + '℃/' + min + '℃' }
         </Text>
         <Text style={styles.textWhite}>
           { wind }
         </Text>
       </View>
     );

  }

  render() {
    return (
      <View style={styles.weather}>
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
          >
            天气详情
          </Text>
          <TouchableOpacity
            onPress={this._returnMain.bind(this)}
          >
          </TouchableOpacity>
        </View>
        <ListView
          contentContainerStyle={[styles.weatherScroll, {height: this.props.scrollHeight, paddingLeft: 10,}]}
          dataSource={this.state.dataSource}
          initialListSize={7}
          renderRow={this._renderRow.bind(this)}
          horizontal={true}
          bounces={true}
          //onMomentumScrollEnd={event=>this.myScrollIos(event)}
          ref="ListView"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          pagingEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(255,255,255,0.1)',
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
  },
  weatherScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  weatherDetail: {
    height: 222,
    width: 84,
    marginRight: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(124,195,249)',
  },
  textWhite: {
    color: '#fff',
    fontSize: 12,
  },
  weatherPic: {
    height: 28,
    width: 28,
  }
});

