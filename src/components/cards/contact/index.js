import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { APP_COLORS } from "../../../styling/colors";
import { FONTS } from "../../../styling/polices";
import { CONTACT_STYLE } from "../../../styling/contact";

const ContactCard = ({ contact, onClick, isChecked = false }) => {
  return (
    <TouchableOpacity
      style={[
        CONTACT_STYLE.item_container,
        {
          backgroundColor: isChecked
            ? APP_COLORS.YELLOW_COLOR.color
            : "#FFF",
        },
      ]}
      onPress={() => onClick(contact)}
    >
      <View style={[CONTACT_STYLE.preview_name]}>
        <Text style={{ fontFamily: FONTS.bold, color: "#000", fontSize: 11 }}>
          {contact?.name?.charAt(0).toUpperCase() || ""}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONTS.bold }}>{contact?.name}</Text>
        </View>
        <View>
          {/* {Boolean(isChecked) && (
            <AntDesign
              name="checkcircle"
              size={24}
              color={APP_COLORS.PRIMARY_COLOR.color}
            />
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ContactCard);
