import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Header,
  Container,
  Button,
  Platform
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";
import { LinearGradient } from "expo";
import { withNavigation } from "react-navigation";
import NavigationService from "../Navs/NavigationService";
import { DrawerActions } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import Signout from "../Screens/Signout";
import CameraApp from "../Screens/Camera";


const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Home",
          headerStyle: {
            backgroundColor: "#3b5908"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
            flex: 1
          },
          headerLeft: (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              //WORKS STRAIGHT IF HOMESCREENNAV IS ADDED TO DRAWNAV DIRECTLY
              //onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="md-menu" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate("Signout")}
              title="LogOut"
            >
              <Text style={{ color: "#fff" }}>Exit</Text>
            </TouchableOpacity>
          )
        };
      }
    },

    Signout: { screen: Signout },
    CameraApp: {
      screen: CameraApp,
      navigationOptions: () => ({
        title: null
      })
    }
  },

  {
    initialRouteName: "HomeScreen",
    headerMode: "screen",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

const HomeScreenNav = createAppContainer(HomeNavigator);

export default HomeScreenNav;

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
