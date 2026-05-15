import { View, Text } from "react-native";
import React from "react";
import { FRON_PROFILES_STYLE } from "../../styling/system";
import { generateKey } from "../../utils";
import { AntDesign } from "@expo/vector-icons";

export default function FronProfiles({ data = [1, 2, 3] }) {
  const renderData = () =>
    data?.map((item, _) => <View style={FRON_PROFILES_STYLE.item} key={generateKey()} nativeID={generateKey()}><AntDesign name="user" size={12} color="black" /></View>);
  return <View style={{ margin: 5, padding: 5, flexDirection: "row" }} >{renderData()}</View>;
}
