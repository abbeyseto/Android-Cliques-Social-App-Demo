import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
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

const HomeScreenIcon = () => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
      size={30}
      color='#3b5908'
    />
  );
};
const UserIcon = () => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-people" : "md-people"}
      size={30}
      color="#4F6790"
    />
  );
};
const NotificationIcon = () => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
      size={30}
      color="#4F1A34"
    />
  );
};

const HomeScreenTabNavigator = createMaterialTopTabNavigator(
  {
    HomeScreenNav: {
      screen: HomeScreenNav,
      navigationOptions: () => ({
        title: "News",
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
        title: "PLACES",
        tabBarIcon: NotificationIcon
      })
    }
  },
  {
    initialRouteName: "HomeScreenNav",
    headerMode: "screen",
    tabBarPosition: "bottom",
    //tabStyle: { backgroundColor: "#694fad", elevation: 4 },
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "gray",
      showIcon: true,
      showLabel:true,
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
