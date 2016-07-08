/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import main from './pages/main.js';

class myDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    };

    render() {
        return (
            <Navigator
                initialRoute={{ name: 'main', component: main, params: {date: this.state.date}}}
                configureScene={() => {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator)=>{
                        let Component = route.component;
                        if(route.component) {
                        return <Component {...route.params} navigator={navigator} />
                    }
                }}
            />
        );
    }
}
AppRegistry.registerComponent('AwesomeProject', () => myDate);
