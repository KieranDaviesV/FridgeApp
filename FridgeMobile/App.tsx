import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BarcodeScanner from './src/component/BarcodeScanner';

export default class App extends Component {

  render() {
    return (<View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarcodeScanner />
    </View >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
