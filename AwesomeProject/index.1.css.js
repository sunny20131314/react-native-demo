/**
 * Created by sunzhimin on 16/6/16.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Navigator,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
  }

  render() {
    var {height} = Dimensions.get('window');

    return (
      <View>
        <ScrollView style={{flex: 1, height: height}}>
          <Text style={[styles.text, styles.header]}>
            嵌套的网格
          </Text>
          <View style={{flexDirection: 'row', height: 200, backgroundColor:"#fefefe", padding: 20}}>
            <View style={{flex: 1, flexDirection:'column', padding: 15, backgroundColor:"#eeeeee"}}>
              <View style={{flex: 1, backgroundColor:"#bbaaaa"}}>
              </View>
              <View style={{flex: 1, backgroundColor:"#aabbaa"}}>
              </View>
            </View>
            <View style={{flex: 1, padding: 15, flexDirection:'row', backgroundColor:"#eeeeee"}}>
              <View style={{flex: 1, backgroundColor:"#aaaabb"}}>
                <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeaaaa"}}>
                  <View style={{flex: 1, backgroundColor:"red"}}>
                  </View>
                  <View style={{flex: 1, backgroundColor:"orange"}}>
                  </View>
                </View>
                <View style={{flex: 1, backgroundColor:"yellow"}}>
                </View>
              </View>
              <View style={{flex: 1, backgroundColor:"#aaccaa"}}>
                <ScrollView style={{flex: 1, backgroundColor:"#bbccdd", padding: 5}}>
                  <View style={{flexDirection: 'row', height: 50, backgroundColor:"#fefefe"}}>
                    <View style={{flex: 1, flexDirection:'column', backgroundColor:"#eeeeee"}}>
                      <View style={{flex: 1, backgroundColor:"red"}}>
                      </View>
                      <View style={{flex: 1, backgroundColor:"orange"}}>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeeeee"}}>
                      <View style={{flex: 1, backgroundColor:"#aaaabb"}}>
                        <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeaaaa"}}>
                          <View style={{flex: 1, backgroundColor:"#eebbaa"}}>
                          </View>
                          <View style={{flex: 1, backgroundColor:"#bbccee"}}>
                          </View>
                        </View>
                        <View style={{flex: 1, backgroundColor:"#eebbdd"}}>
                        </View>
                      </View>
                      <View style={{flex: 1, backgroundColor:"red"}}>
                      </View>
                    </View>
                  </View>
                  <Text style={[styles.text, styles.header, {color: '#ffffff', fontSize: 12}]}>
                    {(function(){
                      var str = '';
                      var n = 100;
                      while(n--) {
                        str += '嵌套的网格' + '\n';
                      }
                      return str;
                    })()}
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.flexContainer}>
            <View style={styles.cellfixed}>
              <Text style={styles.welcome}>
                left
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.welcome}>
                flex
              </Text>
            </View>
            <View style={styles.cellfixed}>
              <Text style={styles.welcome}>
                right
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.welcome}>
              fixed
            </Text>
          </View>




          <Text style={[styles.text, styles.header]}>
            在正常的View上设置margin
          </Text>

          <View style={{backgroundColor: '#333333'}}>
            <View style={{backgroundColor: '#fff', height: 30, margin: 30}}/>
          </View>

          <Text style={[styles.text, styles.header]}>
            在文本元素上设置margin
          </Text>
          <View style={{backgroundColor: '#333333'}}>
            <Text style={[styles.text, {backgroundColor: '#fe0000', margin: 30}]}>
              text 元素上设置margin
            </Text>
            <Text style={[styles.text, {backgroundColor: '#fe0000', margin: 30}]}>
              text 元素上设置margin
            </Text>
          </View>


          <Text style={[styles.text, styles.header]}>
            在正常的View上设置padding
          </Text>

          <View style={{padding: 30, backgroundColor: '#333333'}}>
            <Text style={[styles.text, {color: '#fefefe'}]}> Text Element</Text>
          </View>

          <Text style={[styles.text, styles.header]}>
            在文本元素上设置padding
          </Text>
          <View style={{padding: 0, backgroundColor: '#333333'}}>
            <Text style={[styles.text, {backgroundColor: '#fe0000', padding: 30}]}>
              text 元素上设置paddinga
            </Text>
          </View>



          <Text style={[styles.text, styles.header]}>
            文本元素: 容器为 text
          </Text>

          <Text style={[styles.baseText, {backgroundColor: '#333333', padding: 10}]} numberOfLines={5}>
            <Text style={styles.titleText} onPress={this.onPressTitle}>
              文本元素{'\n'}
            </Text>
            <Text>
              {'\n'}In this example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines, numberOfLines is Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
            </Text>
          </Text>

          <Text style={[styles.text, styles.header]}>
            文本元素: 容器为 view,
          </Text>

          <View style={{backgroundColor: '#333333', padding: 10}}>
            <Text style={styles.baseText} numberOfLines={5}>
              <Text style={styles.titleText} onPress={this.onPressTitle}>
                文本元素{'\n'}
              </Text>
              <Text>
                {'\n'}In this example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines, numberOfLines is Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
              </Text>
            </Text>
          </View>


          <Text style={[styles.text, styles.header]}>
            文本样式继承
          </Text>

          <View style={{backgroundColor: '#333333', padding: 10}}>
            <Text style={{color: 'white'}}>
              <Text style={{color: 'red'}} onPress={this.onPressTitle}>
                文本元素{'\n'}
                <Text>我是white还是red呢？{'\n'} </Text>
              </Text>
              <Text>我应该是white的</Text>
            </Text>
          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    // 容器需要添加direction才能变成让子元素flex
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    height: 50,
    backgroundColor: '#aaaaaa'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 2
  },
  cellfixed: {
    height: 50,
    width: 80,
    backgroundColor: '#fefefe'
  },
  baseText: {
    fontFamily: 'Cochin',
    color: 'white'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
