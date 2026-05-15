import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PROFILE_IMAGE_SIZE, USER_PROFILE_CARD } from "../../../styling/cards";
import { AntDesign } from "@expo/vector-icons";
import { truncateText } from "../../../utils";
import { APP_COLORS } from "../../../styling/colors";
import CustomButton from "../../buttons/CustomButton";

export default function UserProfileCard({ user = null, onEdit, onRefresh }) {
  return (
    <View style={USER_PROFILE_CARD.container}>
      <View
        style={[
          USER_PROFILE_CARD.profile_image,
          {
            borderWidth: 2,
            borderColor: APP_COLORS.WHITE_COLOR.color,
          },
        ]}
      >
        <AntDesign
          name="user"
          size={Math.ceil(PROFILE_IMAGE_SIZE / 2)}
          color="white"
        />
      </View>
      <View style={USER_PROFILE_CARD.infos}>
        <Text style={USER_PROFILE_CARD.infos_text}>
          {truncateText(`${user?.firstName || ""} ${user?.lastName || ""}`)}
        </Text>
        <View style={USER_PROFILE_CARD.status}>
          <View
            style={{
              backgroundColor: user?.isVerified
                ? APP_COLORS.GREEN_COLOR.color
                : APP_COLORS.RED_COLOR.color,
              padding: 5,
              borderRadius: 25,
            }}
          >
            <Text
              style={{
                color: APP_COLORS.WHITE_COLOR.color,
              }}
            >
              Compte {`${user?.isVerified ? "vérifié" : "non vérifié"}`}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <View style={{ flexDirection: "row-reverse"}}>
        <CustomButton
          label={
            <Text>
              {/* {` Edit `} */}
              <AntDesign name="edit" size={14} color="white" />
            </Text>
          }
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          padding={8}
          onClick={onEdit}
        />
        <CustomButton
          label={
            <Text>
              <AntDesign name="sync" size={14} color="white" />
            </Text>
          }
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          padding={8}
          onClick={onRefresh}
        />
      </View>
    </View>
  );
}
