import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  Image,
  FlatList,
  Alert,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  DateItem
} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import Parse from "parse/react-native";
import styles from "../assets/stlysheet";

// Initialize Parse SDK
//Parse.User.enableUnsafeCurrentUser();
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "zUZhJDMVawRRqVsPe9VuVIJuBO7F2MubO9YhSIzw", // This is your Application ID
  "EVmHRiYvaKr8oD65oRX2kCgdcdPnZ9Cm7IplRwvn" // This is your Javascript key
);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersInfo: null,
      refreshing: false
    };
  }

  async componentWillMount() {
    const usernameGet = await AsyncStorage.getItem("username");
    var User = new Parse.User();
    var query = new Parse.Query(User);
    query = new Parse.Query(User);
    query.notEqualTo("username", usernameGet);
    var userData = await query.find();
    this.setState({ usersInfo: userData });
    for (let i = 0; i < userData.length; i++) {
      var object = userData[i];
      //console.log(userData);
      //var currentUser = object.get("username");
      //this.setState({ user: currentUser });
      //alert(currentUser);
      //alert(object.get('username'));
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentWillMount().then(() => {
      this.setState({ refreshing: false });
    });

    var currentUser = Parse.User.current();
    currentUser.set("lastActive", new Date());
    currentUser
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: "lightgrey" }}
        stickyHeaderIndices={[1]}
        style={styles.mainContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>Users</Text>

          <View style={styles.rightHeaderContainer}>
            <Ionicons
              name="md-search"
              color="#fff"
              size={30}
              style={{ padding: 10 }}
            />
            <Ionicons
              name="md-call"
              color="#fff"
              size={30}
              style={{ padding: 10 }}
            />
            <Ionicons
              name="md-more"
              color="#fff"
              size={30}
              style={{ padding: 10 }}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={this.state.usersInfo}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() =>
                  Alert.alert(
                    "Info:",
                    "This feature will be available soon!",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  )
                }
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={
                      item.get("profilePicture") === undefined
                        ? require("../assets/noimage.png")
                        : {
                            uri: `data:image/jpeg;base64,${item.get(
                              "profilePicture"
                            )}`
                          }
                    }
                    style={styles.initStyle}
                  />
                </View>
                <View style={styles.callerDetailsContainer}>
                  <View style={styles.callerDetailsContainerWrap}>
                    <View style={styles.nameContainer}>
                      <Text>{item.get("username")}</Text>
                      <View style={styles.dateContainer} />
                      <Ionicons
                        name="md-radio-button-on"
                        size={15}
                        color={
                          new Date() - item.get("lastActive") < 120000
                            ? "green"
                            : "red"
                        }
                      />
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "#666",
                          fontSize: 12
                        }}
                      >
                        {new Date() - item.get("lastActive") < 120000
                          ? "online"
                          : "offline"}
                      </Text>
                    </View>
                    <View style={styles.callIconContainer}>
                      <Ionicons
                        name="md-chatbubbles"
                        color="#4F6790"
                        size={30}
                        style={{ padding: 5 }}
                      />
                      <Ionicons
                        name="md-call"
                        color="#4F6790"
                        size={30}
                        style={{ padding: 5 }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item + index}
            //keyExtractor={({ id }, index) => id}
            //keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}
