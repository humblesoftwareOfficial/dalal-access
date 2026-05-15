import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_STYLE, SAFE_AREA_VIEW } from "../../styling/system";
import access_ease from "../../assets/images/custom_icon.png";

export default function Welcome() {
  return (
    <SafeAreaView style={[SAFE_AREA_VIEW.container, {}]} 
    // edges={['right', 'left', 'top']}
    >
      <View style={[SAFE_AREA_VIEW.container_waiting_load_finish, {
        padding: 75
      }]}>
        <ImageBackground
          ImageBackground
          source={access_ease}
          style={[APP_STYLE.local_image_background]}
          imageStyle={{ resizeMode: "contain" }}
        />
      </View>
    </SafeAreaView>
  );
}
