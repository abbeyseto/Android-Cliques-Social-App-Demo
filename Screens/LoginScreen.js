import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo";

export default class LoginScreen extends Component {

  render() {
    return (
      <LinearGradient
        colors={[
          "#4C1991",
          "#4F1A94",
          "#8422D5",
          "#982EBE",
          "#CF507F",
          "#EA6060"
        ]}
        style={{ flex: 1 }}
        start={[0.1, 0.1]}
        end={[1, 1]}
      >
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

          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AppNavigation")}
              style={styles.customBtnBG}
            >
              <Text style={{ fontSize: 17 }}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AppNavigation")}
              style={styles.customBtnBG}
            >
              <Text style={{ fontSize: 17 }}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LinearGradient
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              style={{ padding: 15, alignItems: "center", borderRadius: 5 }}
            >
              <Text
                style={{
                  backgroundColor: "transparent",
                  fontSize: 15,
                  color: "#fff"
                }}
              >
                Sign in with Facebook
              </Text>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
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
