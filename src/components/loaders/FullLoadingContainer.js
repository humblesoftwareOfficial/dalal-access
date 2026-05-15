import { ActivityIndicator, View } from "react-native";
import React from "react";

import WeddingLoading from "./WeddingLoading";
import { APP_COLORS } from "../../styling/colors";

export default function FullLoadingContainer({
  text = "",
  flex = 1,
  backgroundColor = APP_COLORS.PRIMARY_COLOR.color,
  colorIcon = APP_COLORS.PRIMARY_COLOR.color,
  backgroundLoaderContainer = APP_COLORS.PRIMARY_COLOR.color,
  loaderColor = "#F5F5F5",
}) {
  return (
    <View
      style={{
        flex,
        justifyContent: "center",
        backgroundColor,
        alignItems: "center",
      }}
    >
      {/* <WeddingLoading
        text={text}
        colorIcon={colorIcon}
        backgroundLoaderContainer={backgroundLoaderContainer}
        loaderColor={loaderColor}
      /> */}
      <ActivityIndicator size="small" color={loaderColor} />
    </View>
  );
}
