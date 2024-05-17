import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Ionic, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import Stories from "./Stories";
import Post from "./Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
const ActivityScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerLeft: () => (
  //       <Text style={{ fontSize: 16, fontWeight: "bold" }}>ComLink</Text>
  //     ),
  //     headerRight: () => (
  //       <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
  //         <Ionicons onPress={() => navigation.navigate("Nhắn tin")} name="chatbox-ellipses-outline" size={24} color="black" />
  //         <MaterialIcons
  //           onPress={() => navigation.navigate("Lời mời kết bạn")}
  //           name="people-outline"
  //           size={24}
  //           color="black"
  //         />
  //       </View>
  //     ),
  //   });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      setToken(token);

      axios
        .get(`http://192.168.137.57:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  console.log("token", token);
  console.log("ID", userId);

  console.log("users", users);
  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
    
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({});
