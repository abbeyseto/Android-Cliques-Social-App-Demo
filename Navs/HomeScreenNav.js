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
  Platform,
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
import Profile from "../Screens/Profile";
import styles from "../assets/stlysheet";

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "News Catch up",
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
              <Ionicons name="md-menu" size={30} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate("Profile")}
              title="Profile"
            >
              <Text style={{ color: "#fff" }}>Edit Profile</Text>
            </TouchableOpacity>
          )
        };
      }
    },

    Profile: { screen: Profile },
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

