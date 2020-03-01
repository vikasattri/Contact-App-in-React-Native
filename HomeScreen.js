import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";

import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  static navigationOptions = {
    title: "Contact App"
  };
  getAllContact = async () => {
    //collects All Data
    await AsyncStorage.getAllKeys()
      .then(keys => {
        // console.log(keys);
        return AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState({
              data: result.sort(function(a, b) {
                if (JSON.parse(a[1]).firstname < JSON.parse(b[1]).firstname) {
                  return -1;
                }
                if (JSON.parse(a[1]).firstname > JSON.parse(b[1]).firstname) {
                  return 1;
                }
                return 0;
              })
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentWillMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getAllContact();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            const contact = JSON.parse(item[1]);
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("View", {
                    key: item[0].toString()
                  });
                }}
              >
                <Card style={styles.listItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.contactIcon}>
                      {contact.firstname[0].toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                      {contact.firstname} {contact.lastname}
                    </Text>
                    <Text style={styles.infoText}> {contact.phone}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => {
            item[0].toString();
          }}
        ></FlatList>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => {
            this.props.navigation.navigate("Add");
          }}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
        <Text>Created By: Vikas Attri</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DAE0E2"
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#74B9FF"
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#586776",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});
