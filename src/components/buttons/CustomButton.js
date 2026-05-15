import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BUTTON_STYLE } from "../../styling/buttons";
import { APP_COLORS } from "../../styling/colors";

export default function CustomButton({
  label,
  customWidth,
  bgColor = APP_COLORS.WHITE_COLOR.color,
  onClick = null,
  textColor = "white",
  borderColor = "",
  borderWidth = 0,
  padding = 15,
  disable = false,
  borderRadius = 10,
  fontWeight = "normal",
}) {
  const onPress = () => {
    if (!disable) onClick && onClick();
  };
  return (
    <View style={BUTTON_STYLE.container_button}>
      <TouchableOpacity
        style={[
          BUTTON_STYLE.button,
          {
            padding,
            width: customWidth || "100%",
            backgroundColor: disable ? "#5A5A5A" : bgColor,
            borderColor,
            borderWidth: borderWidth,
            borderRadius,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onPress={onPress}
        activeOpacity={disable ? 1 : 0.5}
      >
        <Text
          style={[BUTTON_STYLE.textButton, { color: textColor, fontWeight }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
