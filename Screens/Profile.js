import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  StatusBar,
  Container
} from "react-native";
import { ImagePicker } from "expo";
import Parse from "parse/react-native";
import styles from "../assets/stlysheet";

class ImagePickerExample extends React.Component {
  state = {
    image: null
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  };

  _saveImage = async () => {
    var user = Parse.User.current();
    user.set("profilePicture", this.state.image);
    await user.save();
    // // Find all posts by the current user
    // const query = new Parse.Query(Post);
    // query.equalTo("user", user);
    // const userPosts = await query.find();
    // // userPosts contains all of the posts by the current user.
  };

  render() {
    let userimage = this.state.image;
    const PickButton = () => {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Select an Image" onPress={this._pickImage} />

          {userimage && (
            <Image
              source={{ base64: userimage }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      );
    };

    const SaveButton = () => {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Upload" onPress={this._saveImage} />
        </View>
      );
    };
    const PickSaveButton = () => {
      const image = this.state.image;
      if (image === null) {
        return <PickButton />;
      } else {
        return <SaveButton />;
      }
    };
    return <PickSaveButton />;
  }
}

class Signout extends Component {
  static navigationOptions = () => {
    return {
      title: "Profile Settings",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
      },
      headerStyle: {
        backgroundColor: "#4F1A94"
      },
      headerTintColor: "#fff"
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <ImagePickerExample />
      </View>
    );
  }
}

export default Signout;

