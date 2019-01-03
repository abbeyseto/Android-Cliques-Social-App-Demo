import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Modal,
  
} from "react-native";
import { LinearGradient, Font, AppLoading } from "expo";
import { AuthSession } from "expo";
import { Parse } from "parse/react-native";

// Initialize Parse SDK
//Parse.User.enableUnsafeCurrentUser();
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "APPLICATION_KEY_HERE", // This is your Application ID
  "JAVASCRIPT_KEY_HERE" // This is your Javascript key
);

const FB_APP_ID = "FACEBOOK_ID_HERE";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: "",
      password: "",
      loginState: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      SirinStencil: require("../assets/fonts/SirinStencil.ttf")
    });
    this.setState({ loading: false });
  }

  _handleLogin = () => {
    let getUsername = this.state.username;
    let getPassword = this.state.password;
    Parse.User.enableUnsafeCurrentUser();
    // Pass the username and password to logIn function
    Parse.User.logIn(getUsername, getPassword)
      .then(user => {
        // Do stuff after successful login
        var currentUser = Parse.User.current();
        this.setState({ loginState: true });
        if (this.state.loginState) {
          AsyncStorage.setItem("username", getUsername);
          this.props.navigation.navigate("mainDrawNav");
        }
      })
      .catch(error => {
        Alert.alert("Ooops! 🤭 ", "" + error.message);
      });
  };

  _facebookLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl: `https://www.facebook.com/v2.8/dialog/oauth?response_type=token&client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}`
    });
    this.setState({ result });
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
                this._handleLogin();
              }}
              style={styles.customBtnBG}
            >
              <Text style={{ fontSize: 17 }}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignupScreen")}
              style={styles.customBtnBG}
            >
              <Text style={{ fontSize: 13 }}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => this._facebookLogin()}
          >
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
          </TouchableOpacity>
          {this.state.result ? (
            <Text>{JSON.stringify(this.state.result)}</Text>
          ) : null}
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
//onPress={this._signInAsync}
