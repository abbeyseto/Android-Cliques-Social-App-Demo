import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  Container
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Signout from "./Signout";

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerStyle: {
        backgroundColor: "#3b5908"
      },
      headerTintColor: "yellow",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
      },
    //   headerRight: (
    //     <TouchableOpacity
    //       style={styles.headerButton}
    //       onPress={() => navigation.navigate("Signout")}
    //       title="LogOut"
    //       color= "#fff"
    //     >
    //       <Text>LogOut</Text>
    //     </TouchableOpacity>
    //   ),
    //   headerLeft: (
    //     <TouchableOpacity
    //       style={styles.headerButton}
    //       onPress={() => navigation.openDrawer()}
    //     >
    //       <Ionicons name="md-menu" size={20} />
    //     </TouchableOpacity>
    //   )
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Signout")}
          style={styles.customBtnBG}
        >
          <Text style={{ fontSize: 17 }}>Go to Signout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  headerButton:{
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
