import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import NavigationService from "./NavigationService";
import tabNav from "./tabNav";
import HomeScreenNav from "./HomeScreenNav";
import Users from "../Screens/Users";
import { DrawerActions } from "react-navigation-drawer";
import styles from "../assets/stlysheet";
import Parse from "parse/react-native";

// Initialize Parse SDK
//Parse.User.enableUnsafeCurrentUser();
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "APPLICATION_KEY_HERE", // This is your Application ID
  "JAVASCRIPT_KEY_HERE" // This is your Javascript key
);

class MainDrawNAv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      image: null,
      email: ""
    };
  }

  async componentWillMount() {
    const usernameGet = await AsyncStorage.getItem("username");
    var User = new Parse.User();
    var query = new Parse.Query(User);
    //query = new Parse.Query(User);
    query.equalTo("username", usernameGet);
    var userData = await query.find();
    for (let i = 0; i < userData.length; i++) {
      var object1 = userData[i];
      var currentUser = object1.get("username");
      var userImage = object1.get("profilePicture");
      var userEmail = object1.get("email");
      this.setState({ user: currentUser, email: userEmail });
      if (userImage === undefined) {
        this.setState({ image: null });
      } else {
        this.setState({ image: userImage });
      }
      //alert(userImage);
    }
  }

  render() {
    const imageSource = this.state.image;
    const YesImage = () => {
      return (
        <View>
        <TouchableOpacity style={{elevation: 90}}> 
          <Image
            source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
            style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }}
          />
          </TouchableOpacity>
          <Text style={{ color: "black", fontSize: 15 }}>
            {this.state.email}
          </Text>
        </View>
      );
    };
    const NoImage = () => {
      return (
        <View>
          <Image
            source={require("../assets/noimage.png")}
            style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }}
          />
          <Text style={{ color: "black", fontSize: 15 }}>
            {this.state.email}
          </Text>
        </View>
      );
    };

    const DecideImage = () => {
      if (imageSource === null) {
        return <NoImage />;
      } else {
        return <YesImage />;
      }
    };
    return <DecideImage />;
  }
}
// _signOutAsync = async () => {
//   await AsyncStorage.clear();
//   this.props.navigation.navigate("Auth");
// };

const DrawerContent = props => (
  <View>
    <View
      style={{
        backgroundColor: "transparent",
        height: 200,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <MainDrawNAv />
    </View>
    <DrawerItems {...props} />
    <View>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Log out",
            "Do you want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  return null;
                }
              },
              {
                text: "Confirm",
                onPress: () => {
                  Parse.User.logOut().then(() => {
                    var currentUser = Parse.User.current(); // this will now be null
                  });
                  AsyncStorage.clear();
                  NavigationService.navigate("LoginScreen");
                }
              }
            ],
            { cancelable: false }
          )
        }
      >
        <Text style={{ margin: 16, fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// const HomeScreenIcon = ({ tintColor }) => {
//   return (
//     <Ionicons
//       name={Platform.OS === "ios" ? "ios-home" : "md-home"}
//       size={30}
//       color={tintColor}
//     />
//   );
// };

const MyDrawerNavigator = createDrawerNavigator(
  {
    tabNav: {
      screen: tabNav,
      navigationOptions: () => ({
        title: "HOME"
      })
    },
    // HomescreenNav: {
    //   screen: HomeScreenNav,
    //   navigationOptions: () => ({
    //     title: "DrawWithStack"
    //   })
    // }
  },
  {
    initialRouteName: "tabNav",
    headerMode: "screen",
    //backBehavior: initialRouteName,
    contentComponent: DrawerContent,
    drawerPosition: "left",
    drawerType: "slide",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);
export default (MyApp = createAppContainer(MyDrawerNavigator));
