import React, { Component } from "react";
import {
  Platform,
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
import NavigationService from "../Navs/NavigationService";
import { DrawerActions } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import Users from "../Screens/Users";
import styles from "../assets/stlysheet";

const UsersNavigator = createStackNavigator(
  {
    Users: {
      screen: Users,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Users",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
            flex: 1
          },
          headerStyle: {
            backgroundColor: "#4F6790"
          },
          headerTintColor: "#fff",
          headerLeft: (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="md-menu" size={30} color="#fff" />
            </TouchableOpacity>
          )
        };
      }
    }
  },
  {
    initialRouteName: "Users",
    headerMode: "screen"
    //  defaultNavigationOptions: {
    //    gesturesEnabled: true
    // }
  }
);

const UsersNav = createAppContainer(UsersNavigator);

export default UsersNav;
