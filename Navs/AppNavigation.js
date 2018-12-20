import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import HomeScreenNav from "./HomeScreenNav";
import UsersNav from "./UsersNav";
import NotifyNav from "./NotifyNav";


class AppNavigation extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: "#3b5908"
      },
      headerTintColor: "#fff"
    };
  };
  render() {
    return <DownMenu />;
  }
}

const UserIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
      size={40}
      color={tintColor}
    />
  );
};
const HomeScreenIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
      size={40}
      color={tintColor}
    />
  );
};
const NotificationIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
      size={40}
      color={tintColor}
    />
  );
};

const HomeScreenTabNavigator = createBottomTabNavigator(
  {
    HomeScreenNav: {
      screen: HomeScreenNav,
      navigationOptions: () => ({
        title: "PROFILE",
        tabBarIcon: HomeScreenIcon,
      })
    },
    UsersNav: {
      screen: UsersNav,
      navigationOptions: () => ({
        title: "USERS",
        tabBarIcon: UserIcon
      })
    },
    NotifyNav: {
      screen: NotifyNav,
      navigationOptions: () => ({
        title: "SETTINGS",
        tabBarIcon: NotificationIcon
      })
    }
  },
  {
    initialRouteName: "HomeScreenNav",
    headerMode: "screen",
    activeColor: "#f0edf6",
    activeBackgroundColor: "grey",
    inactiveColor: "#3e2465",
    showIcon: false,
    barStyle: { backgroundColor: "#694fad" },
    tabBarOptions: {
      activeTintColor: "purple",
      inactiveTintColor: "gray"
    }
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50
  }
});
const DownMenu = createAppContainer(HomeScreenTabNavigator);

export default AppNavigation;
