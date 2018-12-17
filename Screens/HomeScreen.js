import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo';

export default class HomeScreen extends React.Component {
  render() {
    return (
    //    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5, flex: 1}}>
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',
            }}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
      
    );
  }
}