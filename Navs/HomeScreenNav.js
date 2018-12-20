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
import HomeScreen from "../Screens/HomeScreen";
import Signout from "../Screens/Signout";
import LoginScreen from "../Screens/LoginScreen";

export default class HomeScreenNav extends Component {
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
    return <HomeContainer />;
  }
}

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    LoginScreen: { screen: LoginScreen },
    Signout: { screen: Signout }
  },
  {
    initialRouteName: "HomeScreen",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Signout")}
            title="LogOut"
            color="#fff"
          >
            <Text>LogOut</Text>
          </TouchableOpacity>
        ),
        headerLeft: (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="md-menu" size={20} />
          </TouchableOpacity>
        )
      };
    },
    headerMode: "screen"
    //  defaultNavigationOptions: {
    //    gesturesEnabled: true
    // }
  }
);

const HomeContainer = createAppContainer(HomeNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  customBtnBG: {
    width: "auto",
    margin: 10,
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
  },
  headerButton: {
    width: "auto",
    margin: 10,
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
    shadowRadius: 10,
    backgroundColor: "transparent"
  }
});
