import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { APP_COLORS } from "../../styling/colors";

const defaultIcon = (
  <Ionicons
    name="arrow-back-circle"
    size={32}
    color={APP_COLORS.YELLOW_COLOR.color}
  />
);
export default function BackButton({
  navigation,
  onClick,
  icon = defaultIcon,
  backgroundColor = APP_COLORS.WHITE_COLOR.color,
  iconColor = APP_COLORS.PRIMARY_COLOR.color,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor,
        },
      ]}
      onPress={onClick}
    >
      <Ionicons name="chevron-back-outline" size={16} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  item: {
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: Math.ceil(Dimensions.get("window").height / 15),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
});
