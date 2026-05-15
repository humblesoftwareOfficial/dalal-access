import { Dimensions, Platform, StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";
import { FONTS } from "./polices";

const SIZE_GUEST_CARD = Math.ceil(Dimensions.get("window").width / 8);
const SIZE_OPTION = Math.ceil(Dimensions.get("window").width / 15);

export const GUESTS_STYLE = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 2,
    marginTop: Platform.OS === "android" ? 10 : 0,
    flexDirection: "row",
    alignItems: "center",
  },
  header_section: {
    flex: 1,
  },
  button: {
    padding: 2,
  },
  title: {
    fontFamily: FONTS.bold,
  },
});

export const GUEST_CARD_STYLE = StyleSheet.create({
  container: {
    // margin: 5,
    padding: 7,
    // backgroundColor: "#FAF3F6",
    flexDirection: "row",
    alignItems: "center",
    // borderRadius: 5,
  },
  qr_code_container: {
    width: SIZE_GUEST_CARD,
    height: SIZE_GUEST_CARD,
    borderRadius: SIZE_GUEST_CARD,
    // backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    alignItems: "center",
    justifyContent: "center",
  },
  guest_infos: {
    flex: 1,
    // backgroundColor: "#F0F0F0",
    padding: 5,
    marginLeft: 5,
    borderRadius: 7,
    // borderBottomWidth: 1,
    borderColor: "#F0F0FD",
    marginBottom: 10
  },
  guest_name: {
    fontFamily: FONTS.bold,
    // color: APP_COLORS.WHITE_COLOR.color,
  },
  guest_phone: {
    fontSize: 8
  },
  guest_info: {
    fontSize: 10,
    color: APP_COLORS.PRIMARY_COLOR.color
  },
  guest_access_type: {
    fontSize: 8,
    fontFamily: FONTS.bold,
    // color: APP_COLORS.SECONDARY_COLOR.color
  },
  option: {
    width: SIZE_OPTION,
    height: SIZE_OPTION,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  made_by: {
    color: APP_COLORS.WHITE_COLOR.color,
    fontSize: 12,
    textAlign: "center",
  },
  developer_infos: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    textAlign: "center",
  },
  left_flower: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  event_proprio_name: {
    fontSize: 36,
  },
  event_invitation_text: {
    fontSize: 18,
  },
  app_infos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
  },
  families: {
    fontFamily: FONTS.bold,
    color: "#F5F5F5"
  }
});
