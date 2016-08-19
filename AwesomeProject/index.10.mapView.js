/*
* 地图*/
'use strict';

import React, {Component, PropTypes} from 'react';
import  ReactNative,{
  AppRegistry,
  Image,
  MapView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';

let regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0'
};

// -- del
var a =  <MapRegionInput
  onChange={(region) => {
            console.log( 'MapViewExample', region );
            this.setState({
              mapRegion: region,
              mapRegionInput: region,
              annotations: this._getAnnotations(region)
            });
          }}
  region={this.state.mapRegionInput}
/>;

class MapRegionInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      region: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  static propTypes = {
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number
    }),
    onChange: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    //console.log('MapRegionInput, componentWillReceiveProps', nextProps);
    this.setState({
      region: nextProps.region || this.state.region
    });
  }

  render() {
    var region = this.state.region;
    return (
      <View>
        <View style={styles.row}>
          <Text>
            {'Latitude'}
          </Text>
          <TextInput
            value={'' + region.latitude}
            style={styles.textInput}
            //onChangeText={this._onChangeLatitude.bind(this)}
            onChangeText={( text ) => regionText.latitude = text}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Longitude'}
          </Text>
          <TextInput
            value={'' + region.longitude}
            style={styles.textInput}
            onChangeText={( text ) => regionText.longitude = text}
            //onChange={this._onChangeLongitude.bind(this)}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Latitude delta'}
          </Text>
          <TextInput
            value={
                region.latitudeDelta == null ? '' : String(region.latitudeDelta)
              }
            style={styles.textInput}
            onChangeText={( text ) => regionText.latitudeDelta = text}
            //onChange={this._onChangeLatitudeDelta.bind(this)}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Longitude delta'}
          </Text>
          <TextInput
            value={
                region.longitudeDelta == null ? '' : String(region.longitudeDelta)
              }
            style={styles.textInput}
            onChangeText={( text ) => regionText.longitudeDelta = text}
            //onChange={this._onChangeLongitudeDelta.bind(this)}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.changeButton}>
          <Text onPress={this._change.bind(this)}>
            {'Change'}
          </Text>
        </View>
      </View>
    );
  }

  _change() {
    this.setState({
      region: {
        latitude: parseFloat(regionText.latitude),
        longitude: parseFloat(regionText.longitude),
        latitudeDelta: parseFloat(regionText.latitudeDelta),
        longitudeDelta: parseFloat(regionText.longitudeDelta),
      }
    });
    // 传递给父组件
    this.props.onChange(this.state.region);
  }
}

export default class MapViewExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      mapRegionInput: undefined,
      annotations: []
    }
  }

  render() {
    // 如何一开始获取到 相应的 region
    //  mapType: 要显示的地图类型 enum 'standard', 'satellite'卫星视图, 'hybrid'卫星视图并附带道路和感兴趣的点标记
    // annotations : 地图上的标注点，可以带有标题及副标题。
    //   [{latitude: number, longitude: number, animateDrop: bool, title: string, subtitle: string, hasLeftCallout: bool, hasRightCallout: bool, onLeftCalloutPress: function, onRightCalloutPress: function, id: string}]
    // legalLabelInsets {top: number, left: number, bottom: number, right: number}
    // 地图上标签的合法范围。默认在地图底部左侧。
    // overlays 地图的覆盖层。
    // pitchEnabled 当此属性设为true并且地图上关联了一个有效的镜头时，镜头的抬起角度会使地图平面倾斜。当此属性设为false，镜头的抬起角度会忽略，地图永远都显示为俯视角度。
    // rotateEnabled 当此属性设为true并且地图上关联了一个有效的镜头时，镜头的朝向角度会用于基于中心点旋转地图平面。当此属性设置为false时，朝向角度会被忽略，并且地图永远都显示为顶部方向为正北方。
    // scrollEnabled 是否可以拖动修改视图 如果此属性设为false，用户不能改变地图所显示的区域。默认值为true。
    // showsUserLocation bool 如果此属性为true，应用会请求用户当前的位置并且聚焦到该位置。默认值是false。
    // zoomEnabled 放大缩小, 默认 true
    // followUserLocation ios如果真的地图将遵循用户的位置时，它的变化。请注意，这没有效果，除非showsuserlocation启用。默认值是真的。


    return (
      <ScrollView>
        <MapView
          style={styles.map}
          mapType={'standard'}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          overlays={[{
            coordinates:[
              {latitude: 32.47, longitude: 107.85},
              {latitude: 45.13, longitude: 114.48},
              {latitude: 39.27, longitude: 123.25},
              {latitude: 32.47, longitude: 107.85},
            ],
            strokeColor: '#f007',
            lineWidth: 3
          }]}
          //pitchEnabled={true}
          //rotateEnabled={true}
          //scrollEnabled={true}
          //showsUserLocation={false}
          showsCompass={true}
          //active={true}  //android
          followUserLocation={true}

          legalLabelInsets={{top: 10, left: 10, right: 10, bottom: 10}}

          onRegionChange={(region) => {
            // 在用户拖拽地图的时候持续调用此回调函数。
            //console.log('draging', region);

            // 同步数据到子组件!!!
            this.setState({
              mapRegionInput: region
            });
          }}
          onRegionChangeComplete={(region) => {
            // 当用户停止拖拽地图之后，调用此回调函数一次。
            //console.log('stop drag', region);
            console.log(this.state.isFirstLoad);
            //if (this.state.isFirstLoad) {
              this.setState({
                mapRegionInput: region,
                annotations: this._getAnnotations(region),
                isFirstLoad: false
              });
            //}
          }
        }
        />
        <MapRegionInput
          onChange={(region) => {
            console.log( 'MapViewExample', region );
            this.setState({
              mapRegion: region,
              mapRegionInput: region,
              annotations: this._getAnnotations(region)
            });
          }}
          region={this.state.mapRegionInput}
        />
      </ScrollView>
    );
  }

  _getAnnotations(region) {
    // 标注点 相关
    console.log('_getAnnotations', region);
    //annotation={{
    //  title: 'More Info...',
    //    ,
    //}}
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      subtitle: ' does it`s right? ',
      draggable: true,
      onDragStateChange: (event) => {
        console.log('Drag state: ' + event.state);
      },
      rightCalloutView: (
        <TouchableOpacity
          onPress={() => {
              console.log('You Are Here~~~~~~~~~~~');
            }}>
          <Image
            style={{width:28, height:33}}
            source={require('./img/location1.png')}
          />
        </TouchableOpacity>
      ),
      //onFocus: (annotation) => {
      //  // 当用户点击地图上的标注之后会调用此回调函数一次。
      //  // 参数 : 是指  Annotation标注点 的相关信息
      //  console.log('onFocus!!!!!!!!!!!!!!', annotation);
      //},
      //onBlur: (annotation) => {
      //  console.log('onBlur!!!!!!!!!!!!!!', annotation);
      //},
      tintColor: MapView.PinColors.PURPLE,
      title: 'You Are Here~'
    }];
  }
}

var styles = StyleSheet.create({
  map: {
    height: 500,
    margin: 6,
    borderWidth: 1,
    borderColor: '#000000'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => MapViewExample);
