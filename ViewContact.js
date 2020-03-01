import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AsyncStorage
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";
export default class ViewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "Dummy",
      lastname: "Dummy",
      phone: "Dummy",
      email: "Dummy",
      address: "Dummy",
      key: "Dummy"
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        contact["key"] = key;
        this.setState(contact);
      })
      .catch(error => {
        console.log(error);
      });
  };
  static navigationOptons = {
    title: "View Contact"
  };

  callAction = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  smsAction = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  editContact = key => {
    this.props.navigation.navigate("Edit", { key: key });
  };
  deleteContact = key => {
    Alert.alert(
      "Delete Contact ?",
      `${this.state.firstname} ${this.state.lastname}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel tapped")
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem(key)
              .then(() => {
                this.props.navigation.goBack();
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      ]
    );
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.firstname[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {this.state.firstname}
              {this.state.lastname}
            </Text>
          </View>
        </View>
        <View>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phone}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>
          </Card>
        </View>

        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.smsAction(this.state.phone);
              }}
            >
              <Entypo name="message" size={50} color="#DFAF2B"></Entypo>
              <Text>SMS</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.callAction(this.state.phone);
              }}
            >
              <Entypo name="phone" size={50} color="green"></Entypo>
              <Text>Phone</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>

        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.editContact(this.state.key);
              }}
            >
              <Entypo name="edit" size={50} color="#2B2B52"></Entypo>
              <Text>Edit</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.deleteContact(this.state.key);
              }}
            >
              <Entypo name="trash" size={50} color="#B83227"></Entypo>
              <Text>Delete</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#2475B0",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});
