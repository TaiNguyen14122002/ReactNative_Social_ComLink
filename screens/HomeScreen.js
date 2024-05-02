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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>ComLink</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons onPress={() => navigation.navigate("Nhắn tin")} name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Lời mời kết bạn")}
            name="people-outline"
            size={24}
            color="black"
          />
          <SimpleLineIcons onPress={() => navigation.navigate("Profile")} name="user" size={20} color="black" />
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