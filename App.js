import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";

class App extends React.Component {
  render() {
    return (
      <View>
        <AppNavigator />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    HomeScreen: { screen: HomeScreen }
  },{
    headerMode: 'screen',
    defaultNavigationOptions: {
      gesturesEnabled: true,
    },
    } 
);

const AppContainer = createAppContainer(AppNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });

export default AppContainer;
