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
              <Ionicons name="md-menu" size={20} color="#fff" />
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
