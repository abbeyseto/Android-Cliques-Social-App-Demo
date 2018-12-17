import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import HomeScreen from './HomeScreen';

class Notification extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is notification</Text>
      </View>
    );
  }
}
class Users extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is User's Screen</Text>
      </View>
    );
  }
}

const UserIcon = () => {
  return <Ionicons name="md-person" size={40} color="green" />;
};
const HomeScreenIcon = () => {
  return <Ionicons name="md-home" size={40} color="blue" />;
};
const NotificationIcon = () => {
  return <Ionicons name="md-settings" size={40} color="red" />;
};
const HomeScreenTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: "PROFILE",
        tabBarIcon: HomeScreenIcon
      })
    },
    Users: {
      screen: Users,
      navigationOptions: () => ({
        title: "USERS",
        tabBarIcon: UserIcon
      })
    },
    Notification: {
      screen: Notification,
      navigationOptions: () => ({
        title: "NOTIFICATION",
        tabBarIcon: NotificationIcon
      })
    }
  },
  {
    initialRouteName: "HomeScreen",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" }
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
export default createAppContainer(HomeScreenTabNavigator);
