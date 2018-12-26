import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import HomeScreenNav from "./HomeScreenNav";
import UsersNav from "./UsersNav";
import NotifyNav from "./NotifyNav";
import CameraApp from "../Screens/Camera";
import Parse from "parse/react-native";
import { DrawerActions } from "react-navigation-drawer";
import NavigationService from "../Navs/NavigationService";
//import mainDrawNav from "./mainDrawNav";

const CameraIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
      size={28}
      color={tintColor}
    />
  );
};

const HomeScreenIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
      size={30}
      color={tintColor}
    />
  );
};
const UserIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
      size={30}
      color={tintColor}
    />
  );
};
const NotificationIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
      size={30}
      color={tintColor}
    />
  );
};

const HomeScreenTabNavigator = createMaterialTopTabNavigator(
  {
    CameraApp: {
      screen: CameraApp,
      navigationOptions: () => ({
        title: "Camera",
        tabBarIcon: CameraIcon
      }),
      style: {
        backgroundColor: "blue"
      }
    },
    HomeScreenNav: {
      screen: HomeScreenNav,
      navigationOptions: () => ({
        title: "PROFILE",
        tabBarIcon: HomeScreenIcon
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
    tabBarPosition: "bottom",
    tabStyle: { backgroundColor: "#694fad", elevation: 4 },
    tabBarOptions: {
      activeTintColor: "purple",
      inactiveTintColor: "gray",
      showIcon: true,
      showLabel: false,
      scrollEnabled: false,
      style: { backgroundColor: "#fff" },
      indicatorStyle: { backgroundColor: "#3e2465" }
    }
  }
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
const tabNav = createAppContainer(HomeScreenTabNavigator);

export default tabNav;
