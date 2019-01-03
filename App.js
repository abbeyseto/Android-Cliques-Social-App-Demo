import React from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View, 
  AsyncStorage
} from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import NavigationService from "./Navs/NavigationService";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import mainDrawNav from "./Navs/mainDrawNav";

class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  //Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("username");
    // // This will switch to the App screen or Auth screen and this loading
    // // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AppStack = createStackNavigator(
  {
    mainDrawNav: { screen: mainDrawNav }
  },
  {
    headerMode: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SignupScreen: { screen: SignupScreen }
  },
  {
    headerMode: "none"
  }
);
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading",
      headerMode: "none"
      //  defaultNavigationOptions: {
      //    gesturesEnabled: true
      // }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#000",
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
