import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class Users extends Component {
  constructor(props) {
    super(props);
    //this._signOutAsync();
  }
  render() {
    return (
      <View 
      //style={styles.container}
      >
        <SectionList
          sections={[
            { title: "D", data: ["Devin"] },
            {
              title: "J",
              data: [
                "Jackson",
                "James",
                "Jillian",
                "Jimmy",
                "Joel",
                "John",
                "Julie"
              ]
            }
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
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
    backgroundColor: "#4F6790"
  }
});
