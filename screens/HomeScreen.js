import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Ionic, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import Stories from "./Stories";
import Post from "./Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem("authToken");

        // Decode the token to extract userId
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        AsyncStorage.setItem("userId", userId);
        // Set the userId state
        setUserId(userId);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    getTokenAndDecode();
  }, []);
  console.log("ID", userId);

  const [isPressed, setIsPressed] = useState(false); // State để theo dõi trạng thái của icon

  // Hàm để xử lý sự kiện nhấn vào icon và điều hướng đến màn hình "Lời mời kết bạn"
  const handlePress = () => {
    navigation.navigate("Lời mời kết bạn");
    setIsPressed(!isPressed); // Đảo ngược trạng thái của biến isPressed
    // Thêm bất kỳ xử lý nào khác bạn muốn ở đây
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>ComLink</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginRight: 5 }}>
          <SimpleLineIcons onPress={() => navigation.navigate("Gợi ý kết bạn")} name="user" size={20} color="black" />
          <Ionicons onPress={() => navigation.navigate("Nhắn tin")} name="chatbox-ellipses-outline" size={24} color="black" />
          <Ionicons
            onPress={handlePress}
            name={isPressed ? 'notifications-outline' : 'notifications-outline'} // Thay đổi tên icon tùy thuộc vào trạng thái của biến isPressed 
            size={24} color="black"

          />

        </View>
      ),
    });
  }, []);
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>

      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',

        }}>
        {/* <FontAwesome name="plus-square-o" style={{fontSize: 24}} /> */}

        <View style={{ flexDirection: 'row', color: 'white' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            {/* <Ionic name="heart-outline" style={{ padding: 5, fontSize: 24, color: 'black', fontWeight: 600 }} /> */}

          </TouchableOpacity>


          {/* <Feather name="navigation" style={{ padding: 5, fontSize: 24, color: 'black' }} /> */}
        </View>

      </View>

      <ScrollView>
        <Stories />
        <Post />
        <View
          style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          {/* <Ionic
            name="ios-reload-circle-sharp"
            style={{ fontSize: 60, opacity: 0.2 }}
          /> */}

        </View>

      </ScrollView>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})