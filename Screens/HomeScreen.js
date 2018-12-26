import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  Image,
  AsyncStorage
} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import Parse from "parse/react-native";

// Initialize Parse SDK
//Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "zUZhJDMVawRRqVsPe9VuVIJuBO7F2MubO9YhSIzw", // This is your Application ID
  "EVmHRiYvaKr8oD65oRX2kCgdcdPnZ9Cm7IplRwvn" // This is your Javascript key
);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    //this._signOutAsync();
  }

  _username = () => {
    Parse.User.currentAsync().then(function(user) {
      return user;
    });
  };

  // _signOutAsync = async ({}) => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate();
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17 }}>
          Hi <Text>{this._username()}</Text>, Welcome to Android Clique!
        </Text>
        <Image
          style={{ marginBottom: 100 }}
          source={require("../assets/icon.png")}
        />
        <Button
          title="Menu"
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          //WORKS STRAIGHT IF HOMESCREENNAV IS ADDED TO DRAWNAV DIRECTLY
          //onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("CameraApp");
          }}
          style={styles.customBtnBG}
        >
          <Text style={{ fontSize: 17 }}>Go to Camera</Text>
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
    backgroundColor: "#3b5908"
  }
});
