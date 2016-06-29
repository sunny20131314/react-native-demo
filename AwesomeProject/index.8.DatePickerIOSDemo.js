/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  DatePickerIOS
} from 'react-native';

class DatePickerIOSDemo extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
    }
  }

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
  };

  componentDidMount(){
    console.log(this);
    console.log(this.props);
  }

  onDateChange(date) {
    console.log(this);
    this.setState({date: date});
  }

  onTimezoneChange(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if ( isNaN(offset)) {
      this.setState({timeZoneOffsetInHours: 0});
      return;
    }

    this.setState({timeZoneOffsetInHours: offset});
  }


  render() {
    return (
      <View style={{paddingTop: 20}}>
        <WithLabel label="Timezone:" >
          <TextInput
            onChange={this.onTimezoneChange.bind(this)}
            style={styles.textinput}
            value={this.state.timeZoneOffsetInHours.toString()}
          />
          <Text> hours from UTC</Text>
        </WithLabel>
        <Heading label="Date + time picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange.bind(this)}
        />
        <Heading label="Date picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange.bind(this)}
        />
        <Heading label="Time picker, 10-minute interval" />
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={(date) => this.setState({date: date})}
          minuteInterval={10}
        />
      </View>
    );
  }
}

class WithLabel extends Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Heading extends Component{
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}


//exports.displayName = (undefined: ?string);
//exports.title = '<DatePickerIOS>';
//exports.description = 'Select dates and times using the native UIDatePicker.';
//exports.examples = [
//  {
//    title: '<DatePickerIOS>',
//    render: function(): ReactElement {
//      return <DatePickerExample />;
//    },
//  }];

const styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => DatePickerIOSDemo );