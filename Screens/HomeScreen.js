"use strict";

import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Button,
  Image,
  Alert,
  FlatList,
  AsyncStorage,
  Linking,
  TextInput,
  Keyboard,
  RefreshControl,
  Platform
} from "react-native";
import { Asset, AppLoading } from "expo";
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
      user: "",
      image: null,
      isReady: false,
      newsfeed: [],
      category: "",
      userinput: null,
      refreshing: false
    };
  }

  /*Function that loads immediately the screen renders */

  async componentWillMount() {
    /*Get username stored in AsyncStorahe on Login*/
    const usernameGet = await AsyncStorage.getItem("username");
    // Parse.Cloud.run("updateUser",
    //   { username: usernameGet },
    //   {
    //     success: function(successData) {
    //       console.log("username updated successfully.");
    //     },
    //     error: function(errorData) {
    //       console.log(errorData);
    //     }
    //   }
    // );
    console.log(usernameGet);

    /**
     * Send a query on the User's table in the database for user that is the current user.
     * When result is retrieved iterate over it and save it as "object1"
     * Get the username and profilePicture using the .get() method and save them in
     * "currentUser" and "userImage" respectively, then set currentUser in state as "user"
     * If userImage is from query result is undefined, keep the image state as null else
     * set userImage in state as "image".
     */
    var User = new Parse.User();
    var query = new Parse.Query(User);
    //query = new Parse.Query(User);
    query.equalTo("username", usernameGet);
    var userData = await query.find();
    for (let i = 0; i < userData.length; i++) {
      var object1 = userData[i];
      var currentUser = object1.get("username");
      var userImage = object1.get("profilePicture");
      this.setState({ user: currentUser });
      if (userImage === undefined) {
        this.setState({ image: null });
      } else {
        this.setState({ image: userImage });
      }
    }

    var url = this.state.userinput ? `https://newsapi.org/v2/top-headlines?q=${
          this.state.userinput
        }&limit=100&apiKey=816734caecd74eb08f84b8c38cf27f6c`
      : `https://newsapi.org/v2/top-headlines?country=ng&category=${
          this.state.category
        }&limit=100&apiKey=816734caecd74eb08f84b8c38cf27f6c`;
    var req = new Request(url);
    fetch(req)
      .then(response => response.json())
      .then(dataresponse => {
        this.setState({ newsfeed: dataresponse.articles, userinput: null });
        //console.log(dataresponse.articles);
        //console.log("refreshed");
      });
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
    const imageSource = this.state.image;
    const YesImage = () => {
      return (
        <Image
          source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
          style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }}
        />
      );
    };
    const NoImage = () => {
      return (
        <Image
          source={require("../assets/noimage.png")}
          style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }}
        />
      );
    };

    const DecideImage = () => {
      if (imageSource === null) {
        return <NoImage />;
      } else {
        return <YesImage />;
      }
    };
    const AvailableItem = () => {
      if (this.state.newsfeed.length === 0) {
        return <Text>Sorry No Articles Available</Text>;
      } else {
        return (
          <FlatList
            style={{ flex: 1, width: "auto" }}
            data={this.state.newsfeed}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  fontSize: 30,
                  elevation: 4,
                  //width:,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  margin: 5,
                  padding: 5
                }}
                onPress={() => Linking.openURL(item.url)}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 400,
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={{ uri: item.urlToImage }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      margin: 5
                    }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      padding: 5
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View />
                <View>
                  <Text>
                    {item.content}{" "}
                    <Text style={{ color: "green" }}>VIEW MORE</Text>
                  </Text>
                </View>
                <View
                  style={{ justifyContent: "space-between", marginTop: 15 }}
                >
                  <Text>Date: {new Date(item.publishedAt).toGMTString()}</Text>
                  <Text>Source: {item.source.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item + index}
          />
        );
      }
    };

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
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            elevation: 4
          }}
        >
          <DecideImage />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                justifyContent: "center",
                marginTop: 45
              }}
            >
              <Text>Hi {this.state.user}😎</Text>
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                justifyContent: "center",
                marginBottom: 15
              }}
            >
              <Text>Welcome to Android Clique!</Text>{" "}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              elevation: 4,
              backgroundColor: "#3b5908",
              borderRadius: 10,
              margin: 5,
              padding: 5
            }}
          >
            <TextInput
              style={{
                flex: 4,
                fontSize: 20,
                elevation: 4,
                width: "auto",
                backgroundColor: "#fff",
                borderRadius: 10,
                margin: 5,
                padding: 5,
                alignSelf: "flex-start"
              }}
              type="text"
              autoCorrect={true}
              placeholder="Search Headlines"
              //underlineColorAndroid="white"
              clearButtonMode="while-editing"
              autoFocus={true}
              keyboardType={"default"}
              onChangeText={userinput => this.setState({ userinput })}
              textContentType="none"
              value={this.state.userinput === "" ? null : this.state.userinput}
              onSubmitEditing={() => {
                this.setState({
                  userinput: ""
                });
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                width: "auto",
                height: 40,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "#3b5908",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end"
              }}
              onPress={() => {
                Keyboard.dismiss();
                this.componentWillMount();
              }}
            >
              <Text style={{ color: "white" }}>SEARCH</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              height: "auto",
              flexDirection: "row",
              flexWrap: "wrap",
              //backgroundColor: "#0089",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "aqua",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "general" });
                this.componentWillMount();
              }}
            >
              <Text style={{ color: "#000" }}>General</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "#f89",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "technology" });
                this.componentWillMount();
              }}
            >
              <Text style={{ color: "#000" }}>Technology</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "purple",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "entertainment" });
                this.componentWillMount();
              }}
            >
              <Text style={{ color: "#fff" }}>Entertainment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "green",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "sports" });
                this.componentWillMount();
              }}
            >
              <Text>Sports</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "health" });
                this.componentWillMount();
              }}
            >
              <Text>Health</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                //backgroundColor: "purple",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "science" });
                this.componentWillMount();
              }}
            >
              <Text>Science</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 50,
                borderRadius: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: "gold",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.setState({ category: "business" });
                this.componentWillMount();
              }}
            >
              <Text>Business</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgrey"
          }}
        >
          <AvailableItem />
        </ScrollView>
      </ScrollView>
    );
  }
}
