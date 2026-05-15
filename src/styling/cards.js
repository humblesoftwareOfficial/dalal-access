import { Dimensions, Platform, StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";
import { FONTS } from "./polices";

export const PROFILE_IMAGE_SIZE = Math.ceil(Dimensions.get("window").width / 7);

export const SERVICE_CARD_HEIGHT = Math.ceil(
  Dimensions.get("window").width / 8
);

export const USER_PROFILE_CARD = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 8 : 2,
    marginBottom: 8,
    // marginLeft: 5,
    // marginRight: 5,
    padding: 10,
    // borderRadius: 5,
    backgroundColor: "rgba(89, 50, 158,0.2)",
    flexDirection: "row",
    alignItems: "center",
  },
  profile_image: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    justifyContent: "center",
    alignItems: "center",
  },
  infos: {
    flex: 1,
    marginLeft: 5,
  },
  infos_text: {
    color: APP_COLORS.DARK_COLOR.color,
    fontFamily: FONTS.bold,
  },
  status: {
    marginTop: 5,
    flexDirection: "row",
  },
});

export const EVENT_CARD_STYLE = StyleSheet.create({
  card: {
    margin: 6,
    borderRadius: 15,
    backgroundColor: APP_COLORS.PRIMARY_COLOR_LIGHT.color,
    flexDirection: "column",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  header: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 2,
  },
  footer: {
    flex: 1,
    margin: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
  },
  placeInfos: {
    // marginTop: 5,
  },
  infos: {
    flexShrink: 1,
    fontWeight: "bold",
    color: "#F5F5F5", //APP_COLORS.WHITE_COLOR.color
    textAlign: "center",
  },
  address: {
    fontWeight: "normal",
    fontSize: 12,
    // color: APP_COLORS.WHITE_COLOR.color,
    textAlign: "center",
  },
  view_shop_button: {
    borderRadius: 5,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
  },
  text_view_shop_button: {
    color: "white",
    padding: 7,
  },
  media_card: {
    marginTop: 4,
    flex: 1,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: 10,
  },
});

export const CARD_ITEM_HOME = StyleSheet.create({
  main: {
    backgroundColor: "#FFF",
    margin: 10,
    // padding: 10,
    borderRadius: 10,
  },
  top: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottom: {
    padding: 10,
    alignItems: "center",
  },
});

export const GUEST_GROUP_CARD_STYLE = StyleSheet.create({
  main: {
    alignItems: "center",
    margin: 5,
  },
  over_container: {
    borderRadius: SERVICE_CARD_HEIGHT,
    borderWidth: 1,
    margin: 2,
  },
  container: {
    padding: 5,
    margin: 5,
    borderRadius: SERVICE_CARD_HEIGHT,
    width: SERVICE_CARD_HEIGHT,
    height: SERVICE_CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    shadowColor: "#000",
  },
  pseudo: {
    fontFamily: FONTS.bold,
    fontSize: 14,
  },
  service_name: {
    marginTop: 3,
    fontSize: 9,
  },
});
