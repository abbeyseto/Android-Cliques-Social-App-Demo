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

class Signout extends Component {
    static navigationOptions = () => {
        return {
          title: "Sign out?",
          headerStyle: {
            backgroundColor: "#4F1A94"
          },
          headerTintColor: "#fff"
        };
      };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("LoginScreen")}
          style={styles.customBtnBG}
        >
          <Text style={{ fontSize: 17 }}>This is sign out screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Signout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  customBtnBG: {
    width: 175,
    margin: 15,
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
  input: {
    height: 50,
    width: "70%",
    margin: 10,
    padding: 10,
    fontSize: 20
  }
});
