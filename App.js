import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen";
import AppNavigation from "./Navs/AppNavigation";
import HomeScreenNav from "./Navs/HomeScreenNav";
import UsersNav from "./Navs/UsersNav";

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    AppNavigation: { screen: AppNavigation },
    HomeScreenNav: { screen: HomeScreenNav },
    UsersNav: { screen: UsersNav }
  },

  {
    initialRouteName: "LoginScreen",
    headerMode: "none"
    //  defaultNavigationOptions: {
    //    gesturesEnabled: true
    // }
  }
);

const AppContainer = createAppContainer(AppNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });

export default App;
