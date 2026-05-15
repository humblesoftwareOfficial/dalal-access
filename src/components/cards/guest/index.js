import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import React, { Component } from "react";

import { GUEST_CARD_STYLE } from "../../../styling/guests";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { APP_COLORS } from "../../../styling/colors";
// import BottomModal from "../../modals/BottomModal";
// import QrCodeCard from "../qrCode";
// import CustomButton from "../../buttons/CustomButton";
import { isFieldWithValue } from "../../../utils";
// import { APP_STYLE } from "../../../styling/system";

// const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.15);

export default class GuestCard extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const guest = this.props.guest;
    const eventColor = APP_COLORS.PRIMARY_COLOR.color;
    return (
      <View
        style={[
          GUEST_CARD_STYLE.container,
          {
            backgroundColor: guest.isDeleted
              ? "rgba(244, 43, 58, 0.4)"
              : "transparent",
          },
        ]}
      >
        <View style={GUEST_CARD_STYLE.qr_code_container}>
          <Ionicons name="qr-code" size={24} color={eventColor} />
        </View>
        <View style={GUEST_CARD_STYLE.guest_infos}>
          <Text
            style={GUEST_CARD_STYLE.guest_name}
          >{`${guest?.user?.firstName|| ""} ${guest?.user?.lastName || ""}`}</Text>
          {Boolean(isFieldWithValue(guest.info)) && (
            <Text style={GUEST_CARD_STYLE.guest_info}>{`${
              guest?.info || ""
            }\n`}</Text>
          )}
          <Text
            style={GUEST_CARD_STYLE.guest_access_type}
          >{`Accés ${guest?.type}`}</Text>
        </View>
        <View style={{ flexDirection: "row" }}></View>
      </View>
    );
  }
}
