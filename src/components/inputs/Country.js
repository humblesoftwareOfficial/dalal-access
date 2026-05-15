import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { getFlagEmoji } from "../../utils";
import { PHONE_INPUT_STYLE } from "../../styling/inputs";

export default function Country({ item, onClick }) {
  return (
    <View key={item.country} style={PHONE_INPUT_STYLE.country_container}>
      <TouchableOpacity
        onPress={() => onClick && onClick(item)}
        style={PHONE_INPUT_STYLE.line_input}
      >
        <View style={PHONE_INPUT_STYLE.flag}>
          <Text>{`${getFlagEmoji(item.iso)}`}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={PHONE_INPUT_STYLE.country_text}
            adjustsFontSizeToFit
          >{`${item.country}  `}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
