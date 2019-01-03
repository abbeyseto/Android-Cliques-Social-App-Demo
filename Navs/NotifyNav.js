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
import Notify from "../Screens/Notify";
import styles from "../assets/stlysheet";

const NotifyNavigator = createStackNavigator(
  {
    Notify: {
      screen: Notify,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Places",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
            flex: 1
          },
          headerStyle: {
            backgroundColor: "#4F1A34"
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
    initialRouteName: "Notify",
    headerMode: "screen"
    //  defaultNavigationOptions: {
    //    gesturesEnabled: true
    // }
  }
);

const NotifyNav = createAppContainer(NotifyNavigator);

export default NotifyNav;
