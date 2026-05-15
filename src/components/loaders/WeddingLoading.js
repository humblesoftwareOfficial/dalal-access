import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { APP_COLORS } from "../../styling/colors";
import AnimatedCircleView from "../shared/AnimatedCircleView";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WeddingLoading = ({
  text = "",
  colorIcon = APP_COLORS.PRIMARY_COLOR.color,
  backgroundLoaderContainer = APP_COLORS.PRIMARY_COLOR.color,
  loaderColor = "#F5F5F5"
}) => {
  return (
    <AnimatedCircleView
      content={
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: backgroundLoaderContainer,
              },
            ]}
          >
            <ActivityIndicator
              size="small"
              color={loaderColor}
            />
          </View>
          <Text style={{ color: "#000" }}>
            <MaterialCommunityIcons
              name="dance-ballroom"
              size={50}
              color={colorIcon}
            />
          </Text>
          <Text style={{ color: "#000" }}>
            {text}
          </Text>
        </View>
      }
      duration={500}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: Math.ceil(Dimensions.get("window").width / 7),
    height: Math.ceil(Dimensions.get("window").width / 7),
  },
});

export default WeddingLoading;
