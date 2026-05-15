import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { isFieldWithValue, truncateText } from "../../../utils";
import { EVENT_CARD_STYLE } from "../../../styling/cards";
import MediaCard from "../../medias/MediaCard";
import CustomButton from "../../buttons/CustomButton";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { APP_COLORS } from "../../../styling/colors";

export default class EventCard extends PureComponent {
  render() {
    const { item, onClick, itemWidth } = this.props;
    return (
      <TouchableOpacity
        style={[
          EVENT_CARD_STYLE.card,
          {
            // borderWidth: 1,
            width: itemWidth,
            height: itemWidth + 50,
          },
        ]}
        onPress={() => onClick && onClick(item)}
        activeOpacity={0.7}
      >
        <View style={[EVENT_CARD_STYLE.header]}>
          <View
            style={[
              EVENT_CARD_STYLE.media_card,
              {
                width: itemWidth - 10,
                ...(item?.isForNewEvent && {
                  justifyContent: "center",
                  alignItems: "center"
                })
              },
            ]}
          >
            {Boolean(isFieldWithValue(item?.imageUrl)) && <MediaCard url={item.imageUrl} imageKey={item?.code} radius={10} />}
            {Boolean(item?.isForNewEvent) && <MaterialCommunityIcons name="qrcode-plus" size={58} color="white" />}
          </View>
        </View>
        <View style={EVENT_CARD_STYLE.footer}>
          <View style={[EVENT_CARD_STYLE.placeInfos]}>
            <Text style={EVENT_CARD_STYLE.infos}>
              {truncateText(item?.name || "", 45)}
            </Text>
            <Text style={EVENT_CARD_STYLE.address}>
              {truncateText(item?.description || "", 45)}
            </Text>
            {/* <Text style={EVENT_CARD_STYLE.address}>
              {truncateText(item?.date || "", 45)}
            </Text> */}
            <CustomButton
              padding={1.5}
              bgColor={APP_COLORS.PRIMARY_COLOR.color}
              borderRadius={5}
              label={item?.isForNewEvent ? <Entypo name="plus" size={20} color="white" /> : <Ionicons name="qr-code" size={20} color="white" />}
              onClick={() => onClick && onClick(item)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
