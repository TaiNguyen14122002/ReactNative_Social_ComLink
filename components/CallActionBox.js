import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

import { Ionicons, Ionic, Feather, SimpleLineIcons } from "@expo/vector-icons";

const CallActionBox = ({ switchCamera, toggleMute, toggleCamera, endCall }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onToggleCamera = () => {
    toggleCamera();
    setIsCameraOn(!isCameraOn);
  };
  const onToggleMicrophone = () => {
    toggleMute();
    setIsMicOn(!isMicOn);
  };

  return (
    <View className="border-2 border-gray-800 bg-gray-800 rounded-t-3xl p-5 pb-10 w-full flex-row justify-between">
      <Pressable
        onPress={switchCamera}
        className="bg-gray-600 p-3 rounded-full"
      >
        <Text>
          <Ionicons name={"flip-camera-ios"} size={35} color={"white"} />
        </Text>
      </Pressable>
      <Pressable
        onPress={onToggleCamera}
        className="bg-gray-600 p-3 rounded-full"
      >
        <Text>
          <Ionicons
            name={isCameraOn ? "videocam" : "videocam-off"}
            size={35}
            color={"white"}
          />
        </Text>
      </Pressable>
      <Pressable
        onPress={onToggleMicrophone}
        className="bg-gray-600 p-3 rounded-full"
      >
        <Text>
          <Ionicons name={isMicOn ? "mic" : "mic-off"} size={35} color={"white"} />
        </Text>
      </Pressable>
      <Pressable onPress={endCall} className="bg-red-600 p-3 rounded-full">
        <Text>
          <Ionicons name={"call"} size={35} color={"white"} />
        </Text>
      </Pressable>
    </View>
  );
};

export default CallActionBox;