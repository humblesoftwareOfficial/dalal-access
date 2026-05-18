import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { HOME_HEADER_STYLE, PROFILE_SIZE } from "../../styling/system";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/colors";
import { truncateText } from "../../utils";

export default function HomeHeader({ user, onScan, onShowUser, isLoadingQrCode = false }) {

  return (
    <View style={HOME_HEADER_STYLE.main}>
      <View style={HOME_HEADER_STYLE.left}>
        <TouchableOpacity style={[HOME_HEADER_STYLE.item, {}]} onPress={() => onShowUser && onShowUser()}>
          <FontAwesome5
            name="user-alt"
            size={Math.ceil(PROFILE_SIZE / 3)}
            color={APP_COLORS.PRIMARY_COLOR.color}
          />
        </TouchableOpacity>
      </View>
      <View style={HOME_HEADER_STYLE.center}>
        <TouchableOpacity
          style={[
            HOME_HEADER_STYLE.item,
            { backgroundColor: APP_COLORS.PRIMARY_COLOR.color },
          ]}
          onPress={() => onScan && onScan()}
        >
          {isLoadingQrCode ? (
            <ActivityIndicator size="small" color={APP_COLORS.YELLOW_COLOR.color} />
          ): (
            <Ionicons
            name="qr-code"
            size={Math.ceil(PROFILE_SIZE / 2.5)}
            color="#FFF"
          />
          )}
        </TouchableOpacity>
      </View>
      <View style={HOME_HEADER_STYLE.right}>
        <View
          style={[
            HOME_HEADER_STYLE.item,
            {
              backgroundColor: APP_COLORS.YELLOW_COLOR.color,
            },
          ]}
        >
          <Entypo
            name="info"
            size={Math.ceil(PROFILE_SIZE / 3)}
            color={APP_COLORS.PRIMARY_COLOR.color}
          />
        </View>
      </View>
    </View>
  );
}
