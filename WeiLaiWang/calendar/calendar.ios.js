'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Platform,
  Picker,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  TouchableOpacity,
  PixelRatio,
  DatePickerIOS,
  TouchableHighlight,
  Image,
} from 'react-native';
import chineseLunar from "./chinese-lunar";
let {height, width} = Dimensions.get('window');

export default class Calendar extends Component {
  static propTypes = {
    date: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    let {year, month, date} = this.props.date;
    this.state = {
      year: year,
      month: month,
      date: date,
      staticYear: year,   // 保存当前日期的~~~
      staticMonth: month,
      staticDate: date,
      nextMonthYear: year,
      nextMonth: month,
      IosDataPick: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // -- 改为 StatusBar 用于控制应用状态栏的组件
    //StatusBarIOS.setStyle(1, true);
    StatusBar.setBarStyle(0, true);
  }

  nextMonth() {
    console.log('next');

    let monthDay = this.monthDay;
    let month = this.state.month;
    if (month == 11) {
      if (this.state.date > monthDay[0]) {
        this.setState({
          date: monthDay[0]
        })
      }
      this.setState({
        year: this.state.year + 1,
        month: 0,
      })
    } else {
      if (this.state.date > monthDay[month + 1]) {
        this.setState({
          date: monthDay[month + 1]
        })
      }
      this.setState({
        month: month + 1,
      })
    }
  }

  prev() {
    console.log('prev');
    let monthDay = this.monthDay;
    let month = this.state.month;
    if (month === 0) {
      if (this.state.date > monthDay[11]) {
        this.setState({
          date: monthDay[11]
        })
      }
      this.setState({
        year: this.state.year - 1,
        month: 11,
      })
    } else {
      if (this.state.date > monthDay[month - 1]) {
        this.setState({
          date: monthDay[month - 1]
        })
      }
      this.setState({
        month: month - 1,
      })
    }
  }

  isLeap(year) {
    return year % 100 === 0 ? year % 400 === 0 ? 1 : 0 : year % 4 === 0 ? 1 : 0;
  }

  selectDay(d) {
    this.setState({
      date: d
    });
  }

  myScrollIos(event) {
      let scrollX = event.nativeEvent.contentOffset.x;
      if (scrollX > width) {
          this.nextMonth()
      } else if (scrollX < width) {
          this.prev()
      }
      this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
  }

  backTodayTouch() {
    this.setState({
      year: this.state.staticYear,
      month: this.state.staticMonth,
      date: this.state.staticDate
    })
  }

  onDateChange(date) {
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
  }

  _returnMain() {
    let {navigator} = this.props;
    if (navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
    }
  }

  render() {
    let data = new Date(this.state.year, this.state.month, this.state.date);
    return (
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
            日历
          </Text>
          <TouchableOpacity
            onPress={this._returnMain.bind(this)}
          >
          </TouchableOpacity>
        </View>
        <View style={styles.head}>
          <View style={styles.dayTitle}>
            <TouchableOpacity onPress={()=>{this.setState({IosDataPick: !this.state.IosDataPick})}}
                              style={styles.dayTimeTouch}
            >
              <Text style={styles.t1}>
                {this.state.year + '年' + (this.state.month + 1) + '月' + (this.state.date) + '日'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.backTodayTouch}>
            <TouchableOpacity
              //style={[styles.navButton]}
              onPress={this.prev.bind(this)}
            >
              <Text style={[styles.backToday, styles.text]}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.backTodayTouch()}
            >
              <Text style={styles.backToday}>今天</Text>
            </TouchableOpacity>
            <TouchableOpacity
              //style={[styles.navButton]}
              onPress={this.nextMonth.bind(this)}
            >
              <Text style={[styles.backToday, styles.text]}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dateTitle}>
          <Text style={styles.dateTitleText}>日</Text>
          <Text style={styles.dateTitleText}>一</Text>
          <Text style={styles.dateTitleText}>二</Text>
          <Text style={styles.dateTitleText}>三</Text>
          <Text style={styles.dateTitleText}>四</Text>
          <Text style={styles.dateTitleText}>五</Text>
          <Text style={styles.dateTitleText}>六</Text>
        </View>
        <ScrollView
          horizontal={true}
          contentOffset={{x: width, y: 0}}
          bounces={false}
          onMomentumScrollEnd={event=>this.myScrollIos(event)}
          ref="trueScroll"
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          <View>
            <ScrollView>
              <DateBoard
                year={this.state.year}
                month={this.state.month-1}
                date={this.state.date}
                selectDay={this.selectDay.bind(this)}
                isLeap={this.isLeap}
              />
            </ScrollView>
          </View>
          <View>
            <ScrollView>
              <DateBoard
                year={this.state.year}
                month={this.state.month}
                date={this.state.date}
                selectDay={this.selectDay.bind(this)}
                isLeap={this.isLeap}
              />
            </ScrollView>
          </View>
          <View>
            <ScrollView>
              <DateBoard
                year={this.state.year}
                month={this.state.month+1}
                date={this.state.date}
                selectDay={this.selectDay.bind(this)}
                isLeap={this.isLeap}
              />
            </ScrollView>
          </View>
        </ScrollView>
        {
          this.state.IosDataPick && <DatePickerIOS
            style={styles.IosDataPick}
            date={data}
            mode="date"
            onDateChange={this.onDateChange.bind(this)}
          />
        }
    </View>

    )
  }
}

class DateBoard extends Component {
  static defaultProps = {
    year: 2016,
    month: 6
  };
  static propTypes = {
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    selectDay: React.PropTypes.func,
    isLeap: React.PropTypes.func,
    date: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
  };

  renderDate() {
    let myMonth, myYear = 0;
    // 满一年
    console.log();
    let month = this.props.month;
    let year = this.props.year;
    //myMonth = month === 12 ? 0 : month === -1 ? 11 : month;
    //myYear = month === 12 ? ++year : month === -1 ? --year : year;
    if (month === 12) {
      myMonth = 0;
      myYear = ++year;
    }
    else if (month === -1) {
      myMonth = 11;
      myYear = --year;
    }
    else {
      myMonth = month;
      myYear = year
    }
    let fd = new Date(myYear, myMonth, 1);
    let firstDay = fd.getDay();  //获得每月的第一天是星期几
    let monthDay = [31, 28 + this.props.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let arr = [];
    // 添加每月1号之前的空位
    for (let i = 0; i < firstDay; i++) {
      arr.push(<View key={-i} style={styles.dateBox}></View>)
    }
    // 添加每月的日期
    let date = this.props.date;
    for (var i = 1, len = monthDay[myMonth]; i <= len; i++) {
      let isChoose = date === i;               //是否被点击选中了~~~
      let nowDay = ( firstDay + i - 1 ) % 7;  //记录当前是周几, 0 / 6 -> 周末
      let isWeek = nowDay === 0 || nowDay === 6;
      let lunar = chineseLunar.solarToLunar(new Date(myYear, myMonth, i));
      arr.push(
        <TouchableOpacity onPress={this.props.selectDay.bind(this, i)} key={i} style={styles.dateBox}>
          <View style={[styles.selected, isChoose && styles.selectedBg]}>
            <Text style={[styles.dateText, isChoose && styles.selectedText]}>{i}</Text>
            <Text style={[styles.lunarFont, isWeek && styles.weekend, isChoose && styles.selectedText]}>
              {chineseLunar.dayName(lunar.day, lunar.month, lunar.leap)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return arr;
  };

  render() {
    return (
      <View>
        <View style={styles.dateBoard}>
          {this.renderDate()}
        </View>
      </View>
      )
  }
}

const styles = StyleSheet.create({
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
  head: {
    height: 40,
    backgroundColor: '#ff5248',
    flexDirection: 'row',
  },
  dayTitle: {
    flex: 1,
    height: 40,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  dayTimeTouch: {
    height: 40,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  picker: {
    height: 40,
    padding: 0,
    margin: 0,
    color: '#fff',
    justifyContent: 'center'
  },
  t1: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  backTodayTouch: {
    position: 'absolute',
    right: 0,
    height: 40,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToday: {
    fontSize: 14,
    color: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
  },
  dateTitle: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: .5,
    borderColor: '#ddd'
  },
  dateTitleText: {
    width: width / 7 - 1,
    textAlign: 'center',
    fontSize: 10,
  },
  dateBoard: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(250, 250,250,.6)',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ccc'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: height,
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 7 - 1,
    height: width / 7 - 1,
  },
  dateText: {
    fontSize: 16,
  },
  lunarFont: {
    fontSize: 9,
    color: '#aaa',
  },
  weekend: {
    color: '#ff5248'
  },
  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  selectedBg: {
    backgroundColor: '#35c0c5'
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  IosDataPick: {
    position: 'absolute',
    bottom: 0,
  },
});