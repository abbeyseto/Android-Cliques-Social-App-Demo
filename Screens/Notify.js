import React, { Component } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default class Notification extends Component {
  navigationOptions = () => {
    return {
      title: "Settings",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
      },
      headerStyle: {
        backgroundColor: "#4F1A34"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="md-menu" size={20} color="#fff" />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson.movies);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text>UPDATES COMING SOON....</Text>
      </View>
    );
  }
}
