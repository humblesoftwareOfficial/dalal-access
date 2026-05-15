import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { isFieldWithValue } from "../../utils";

const DEFAULT_WIDTH = Dimensions.get("window").width / 2 - 10;

export default function ImagePlacePicker({
  width = DEFAULT_WIDTH,
  height = DEFAULT_WIDTH,
  code,
  uri,
  onImagePick,
  managedPick = false,
  onClick,
  borderRadius = 15,
}) {
  const [defaultURI, setUri] = useState(
    "https://res.cloudinary.com/faceshop/image/upload/v1623670095/default_eadihe.jpg"
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
      base64: true,
    });
    if (!result.cancelled) {
      onImagePick(result, code);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        managedPick ? onClick() : pickImage();
      }}
    >
      <View
        style={[
          styles.container,
          {
            width,
            height,
            borderRadius,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            ...(!isFieldWithValue(uri) && {
              justifyContent: "center",
              alignItems: "center",
            }),
          }}
        >
          {Boolean(isFieldWithValue(uri)) ? (
            <Image
              style={[styles.backgroundImage, { borderRadius }]}
              source={{
                uri: uri || defaultURI,
              }}
            ></Image>
          ) : (
            <Ionicons
              name="ios-image-outline"
              size={width / 2}
              color="rgba(255, 195, 0, 0.8)"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    // borderWidth: 1,
    borderColor: "rgba(255, 195, 0, 0.3)",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottom: {
    padding: 5,
    backgroundColor: "#353535",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  }
});
