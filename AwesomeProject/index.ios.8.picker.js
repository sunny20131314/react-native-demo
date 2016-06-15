'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  AppRegistry,
  Picker,
  PickerIOS,
  StyleSheet,
  Text,
  View
  } = ReactNative;

const Item = Picker.Item;

const PickerItemIOS = PickerIOS.Item;

var CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
  },
  alfa: {
    name: 'Alfa-Romeo',
    models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
  },
  aston: {
    name: 'Aston Martin',
    models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
  },
  audi: {
    name: 'Audi',
    models: ['90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7'],
  },
  austin: {
    name: 'Austin',
    models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
  },
  borgward: {
    name: 'Borgward',
    models: ['Hansa', 'Isabella', 'P100'],
  },
  buick: {
    name: 'Buick',
    models: ['Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
      'Roadmaster', 'Skylark'],
  },
  cadillac: {
    name: 'Cadillac',
    models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
  },
  chevrolet: {
    name: 'Chevrolet',
    models: ['Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
      'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt'],
  },
};

export default class pickDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'asp',
      carMake: 'cadillac',
      modelIndex: 3
    }

  }

  render() {
    var make = CAR_MAKES_AND_MODELS[this.state.carMake];
    var selectionString = make.name + ' ' + make.models[this.state.modelIndex];

    // enabled, prompt 仅安卓...
    return (
      <View>
        <Picker
          selectedValue={this.state.language}
          enabled={false}
          prompt="Pick one, just one"

          itemStyle={{color: '#f00'}}
          onValueChange={(lang) => this.setState({language: lang})}
          >
          <Item label="Java" value="java" />
          <Item label="JavaScript" value="js" />
          <Item label="php" value="php" />
          <Item label="asp" value="asp" />
          <Item label="c" value="c" />
          <Item label="c++" value="c++" />
          <Item label="Object-c" value="Object-c" />
        </Picker>

        <Text>木有监听</Text>
        <Picker>
          <Item label="red" color="red" value="red" />
          <Item label="green" color="green" value="green" />
          <Item label="blue" color="blue" value="blue" />
          <Item label="hello" value="key0" />
          <Item label="world" value="key1" />
        </Picker>

        <PickerIOS
          itemStyle={{fontSize: 25, color: 'red', textAlign: 'left', fontWeight: 'bold'}}
          selectedValue={this.state.carMake}
          onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}>
          {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
            <PickerItemIOS
              key={carMake}
              value={carMake}
              label={CAR_MAKES_AND_MODELS[carMake].name}
            />
          ))}
        </PickerIOS>
      </View>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => pickDemo);
