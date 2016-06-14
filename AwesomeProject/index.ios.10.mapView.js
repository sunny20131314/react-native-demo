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
  View
} from 'react-native';


var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0'
};

var MapRegionInput = React.createClass({

  propTypes: {
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
    onChange: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      region: {
        latitude: 0,
        longitude: 0,
      }
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      region: nextProps.region || this.getInitialState().region
    });
  },

  render: function() {
    var region = this.state.region || this.getInitialState().region;
    return (
      <View>
        <View style={styles.row}>
          <Text>
            {'Latitude'}
          </Text>
          <TextInput
            value={'' + region.latitude}
            style={styles.textInput}
            onChange={this._onChangeLatitude}
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
            onChange={this._onChangeLongitude}
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
            onChange={this._onChangeLatitudeDelta}
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
            onChange={this._onChangeLongitudeDelta}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.changeButton}>
          <Text onPress={this._change}>
            {'Change'}
          </Text>
        </View>
      </View>
    );
  },

  _onChangeLatitude: function(e) {
    regionText.latitude = e.nativeEvent.text;
  },

  _onChangeLongitude: function(e) {
    regionText.longitude = e.nativeEvent.text;
  },

  _onChangeLatitudeDelta: function(e) {
    regionText.latitudeDelta = e.nativeEvent.text;
  },

  _onChangeLongitudeDelta: function(e) {
    regionText.longitudeDelta = e.nativeEvent.text;
  },

  _change: function() {
    this.setState({
      region: {
        latitude: parseFloat(regionText.latitude),
        longitude: parseFloat(regionText.longitude),
        latitudeDelta: parseFloat(regionText.latitudeDelta),
        longitudeDelta: parseFloat(regionText.longitudeDelta),
      },
    });
    this.props.onChange(this.state.region);
  },

});
export default class Map extends Component {

}

class MapViewExample extends Component {
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
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange.bind(this)}
          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
        />
        <MapRegionInput
          onChange={this._onRegionInputChanged.bind(this)}
          region={this.state.mapRegionInput}
        />
      </View>
    );
  }

  _getAnnotations(region) {
    console.log(region);
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here'
    }];
  }

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region
    });
  }

  _onRegionChangeComplete(region) {
    console.log(region);
    console.log(this.state.isFirstLoad);
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false
      });
    }
  }

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region)
    });
  }

}

var AnnotationExample = React.createClass({

  getInitialState() {
    return {
      isFirstLoad: true,
      annotations: [],
      mapRegion: undefined,
    };
  },

  render() {
    if (this.state.isFirstLoad) {
      var onRegionChangeComplete = (region) => {
        this.setState({
          isFirstLoad: false,
          annotations: [{
            longitude: region.longitude,
            latitude: region.latitude,
            ...this.props.annotation,
          }],
        });
      };
    }

    return (
      <MapView
        style={styles.map}
        onRegionChangeComplete={onRegionChangeComplete}
        region={this.state.mapRegion}
        annotations={this.state.annotations}
      />
    );
  },

});

var styles = StyleSheet.create({
  map: {
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
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
