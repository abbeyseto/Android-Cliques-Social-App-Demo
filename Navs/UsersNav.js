import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Header,
  Container
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Users from "../Screens/Users";

export default class UsersNav extends Component {
  static navigationOptions = () => {
    return {
      title: "Home",
      headerStyle: {
        backgroundColor: "#3b5908"
      },
      headerTintColor: "#fff"
    };
  };
  render() {
    return <UsersContainer />;
  }
}

const UsersNavigator = createStackNavigator(
  {
    Users: { screen: Users }
    // LoginScreen: { screen: LoginScreen },
    // Signout: { screen: Signout }
  },
  {
    initialRouteName: "Users",
    headerMode: "screen"
    //  defaultNavigationOptions: {
    //    gesturesEnabled: true
    // }
  }
);

const UsersContainer = createAppContainer(UsersNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  customBtnBG: {
    width: 175,
    margin: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10
  }
});
