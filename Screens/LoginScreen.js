import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image
} from "react-native";
//import { StackNavigator } from "react-navigation";

export default class LoginScreen extends Component {
  static navigationOptions = () => {
    return {
      title: "Please Log in",
      headerStyle: {
        backgroundColor: "#4F1A94"
      },
      headerTintColor:  "#fff"
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 30 }} />
        <Image
          style={{ marginBottom: 100 }}
          source={require("../assets/Image-22.png")}
        />
        <TextInput
          style={styles.input}
          type="email"
          placeholder="Username"
          underlineColorAndroid="white"
          autoFocus={true}
          textContentType="username"
        />
        <TextInput
          style={styles.input}
          type="Password"
          placeholder="Password"
          underlineColorAndroid="white"
          secureTextEntry={true}
          textContentType="password"
        />

        <View style={styles.button}>
          <Button
            onPress={() => this.props.navigation.navigate("HomeScreen")}
            title="Log In"
            accessibilityLabel="Log in to the user account"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => this.props.navigation.navigate("HomeScreen")}
            title="Sign Up"
            accessibilityLabel="Sign up a user account"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#4F1A94",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "30%",
    marginTop: 15,
    color: "#4F1A94",
    height: 50,
    fontSize: 20
  },
  input: {
    height: 50,
    width: "70%",
    margin: 10,
    padding: 10,
    fontSize: 20
  }
});
