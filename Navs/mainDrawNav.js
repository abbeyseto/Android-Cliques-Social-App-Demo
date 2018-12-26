import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Alert
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
import { DrawerActions } from "react-navigation-drawer";

export default class mainDrawNAv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MyApp />;
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
        backgroundColor: "#f50057",
        height: 200,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "white", fontSize: 30 }}>Header</Text>
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

const HomeScreenIcon = ({ tintColor }) => {
  return (
    <Ionicons
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
      size={30}
      color={tintColor}
    />
  );
};

const MyDrawerNavigator = createDrawerNavigator(
  {
    tabNav: {
      screen: tabNav,
      navigationOptions: () => ({
        title: "......"
      })
    },
    HomescreenNav: {
      screen: HomeScreenNav,
      navigationOptions: () => ({
        title: "DrawWithStack"
      })
    },
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
const MyApp = createAppContainer(MyDrawerNavigator);

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
