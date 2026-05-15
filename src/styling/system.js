import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";
import { FONTS } from "./polices";

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export const FRON_PROFILES_ITEM_SIZE = Math.ceil(
  Dimensions.get("screen").width / 10
);

export const PROFILE_SIZE = Math.ceil(
  Dimensions.get("screen").width / 10
);

export const SAFE_AREA_VIEW = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
  },
  container_waiting_load_finish: {
    justifyContent: "center",
    // marginTop: 50,
    flex: 1,
    // backgroundColor: APP_COLORS.WHITE_COLOR.color,
  },
});

export const STATUS_BAR_STYLE = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export const APP_STYLE = StyleSheet.create({
  container_waiting_load_finish: {
    justifyContent: "center",
    // marginTop: 50,
    flex: 1,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
  },
  app_name: {
    color: APP_COLORS.YELLOW_COLOR.color,
    // fontFamily: FONTS.pacificoRegular,
    fontSize: 24,
    textAlign: "center",
  },
  title: {
    color: "#F5F5F5",
    textAlign: "center",
  },
  header_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  local_image_background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section_title: {
    fontFamily: FONTS.bold,
    // fontSize: 22,
    color: APP_COLORS.PRIMARY_COLOR.color,
    textAlign: "center",
  },
  infos_connect: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: APP_COLORS.PRIMARY_COLOR.color,
    textAlign: "center",
  },
  infos_connect_label: {
    textAlign: "center",
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
});

export const FRON_PROFILES_STYLE = StyleSheet.create({
  item: {
    width: FRON_PROFILES_ITEM_SIZE,
    height: FRON_PROFILES_ITEM_SIZE,
    borderRadius: 150,
    backgroundColor: "#CFC0F6",
    marginLeft: -15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: APP_COLORS.WHITE_COLOR.color,
  },
});

export const HOME_HEADER_STYLE = StyleSheet.create({
  main: {
    margin: 5,
    flexDirection: "row",
    padding: 5,
    // backgroundColor: "#FFF"
  },
  left: {
    // padding: 10,
    // marginTop: 15,
    // // backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    // borderRadius: 50
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  right: {
    flexDirection: "row"
  },
  app_title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  item: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: PROFILE_SIZE,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    shadowColor: "#D0CFD3",
    
  },
});

export const PLATFORM_BOTTOM_MARGIN = Platform.OS === "ios" && Platform.Version >= 17 ? 15 : 0
