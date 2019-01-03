import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import { LinearGradient, Font, AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import Parse from "parse/react-native";

// Initialize Parse SDK
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "zUZhJDMVawRRqVsPe9VuVIJuBO7F2MubO9YhSIzw", // This is your Application ID
  "EVmHRiYvaKr8oD65oRX2kCgdcdPnZ9Cm7IplRwvn" // This is your Javascript key
);

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: "",
      password: "",
      email: "",
      signupState: false,
      //result: ""
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      SirinStencil: require("../assets/fonts/SirinStencil.ttf")
    });
    this.setState({ loading: false });
  }

  _handleSignup = () => {
    let getEmail = this.state.email;
    let getUsername = this.state.username;
    let getPassword = this.state.password;
    // Pass the username, email and password to Signup function
    const user = new Parse.User();
    user.set("username", getUsername);
    user.set("email", getEmail);
    user.set("password", getPassword);

    user
      .signUp()
      .then(user => {
        //AsyncStorage.clear();
        Parse.User.logOut();
        this.setState({ SignupState: true });
        if (this.state.SignupState) {
          // AsyncStorage.clear();
          Alert.alert(
            "Successful!",
            "Signin Successful! Log in to your account.",
            [
              {
                text: "Proceed",
                onPress: () => {
                  let install = new Parse.Installation();
                  install.set("deviceType", Platform.OS);
                  install.save().then(
                    resp => {
                      console.log("Created install object", resp);
                    },
                    err => {
                      console.log("Error creating install object", err);
                    }
                  );
                  this.props.navigation.navigate("LoginScreen");
                }
              }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        Alert.alert("Sorry: " + error.message);
      });
  };

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
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
          <Text
            style={{
              color: "#fff",
              fontSize: 40,
              fontFamily: "SirinStencil"
            }}
          >
            Android Clique
          </Text>
          <Image
            style={{ width: 100, height: 150, marginBottom: 10 }}
            source={require("../assets/Applogo.png")}
          />
          <TextInput
            style={styles.input}
            type="email"
            placeholder="Email Address"
            underlineColorAndroid="white"
            autoFocus={false}
            onChangeText={email => this.setState({ email })}
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.input}
            type="username"
            placeholder="Username"
            underlineColorAndroid="white"
            autoFocus={false}
            onChangeText={username => this.setState({ username })}
            textContentType="username"
          />
          <TextInput
            style={styles.input}
            type="Password"
            placeholder="Password"
            underlineColorAndroid="white"
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            textContentType="password"
          />

          <View>
            <TouchableOpacity
              onPress={() => {
                this._handleSignup();
              }}
              style={styles.customBtnBG}
            >
              <Text style={{ fontSize: 17 }}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <Text style={{ fontSize: 17, color: "#fff", marginTop: 90 }}>
                Already have an Account?
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {" "}
                  LOG IN
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text>{this.state.result}</Text> */}
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
