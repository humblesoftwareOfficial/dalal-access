import { Platform, StyleSheet } from "react-native";
import { FONTS } from "./polices";
import { APP_COLORS } from "./colors";

export const PHONE_INPUT_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 7,
    textAlign: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  shopNamePreview: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  country_container: {
    margin: 5,
    marginBottom: 10,
    // backgroundColor: APP_COLORS.WHITE_COLOR.color,
    padding: 10,
    borderRadius: 10,
  },
  country_text: {
    fontSize: 18,
    color: "#000",
  },
  error: {
    color: "#F44549",
    fontSize: 12,
    textAlign: "center",
  },
  line_input: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flag: {
    borderRadius: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: APP_COLORS.PRIMARY_COLOR.color,
    marginRight: 5,
  },
  isoCode: {
    backgroundColor: APP_COLORS.YELLOW_COLOR.color,
    borderRadius: 5,
    width: 40,
  },
  isoCode_text: {
    //fontSize: 14,
    fontWeight: "bold",
    color: APP_COLORS.YELLOW_COLOR.color,
    textAlign: "center",
  },
});

export const HEADER_SEARCH_PAGE_STYLE = StyleSheet.create({
  main_container: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: "center",
    flex: 1,
  },
  input: {
    borderColor: "#2E2E2E",
    backgroundColor: "#1B1B1B",
    flex: 1,
    borderRadius: 10,
    padding: Platform.OS === "android" ? 5 : 10,
    color: "#F5F5F5",
  },
  custom_input_search: {
    flex: 1,
    borderRadius: 50,
    padding: 15,
    color: "#000",
    fontWeight: "bold",
    paddingLeft: 40,
  },
  custom_input_search_prefix: {
    position: "absolute",
    top: 10,
  },
  items_container: {
    backgroundColor: "#F5F5F5",
  },
  default_view_container: {
    flex: 1,
    padding: 10,
  },
  default_view_image_container: {
    flex: 1,
    marginTop: 15,
  },
  default_view_text_container: {
    flex: 1,
    marginTop: 5,
  },
  icon_container: {
    marginLeft: 10,
    marginRight: 10,
  },
  item_search: {
    height: 150,
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
  },
  image_item_search: {
    // width: Math.floor(Dimensions.get("window").width / 3),
    flex: 1,
    height: 135,
    borderRadius: 5,
  },
  right_item_search: {
    flex: 2,
    padding: 10,
  },
  top_right_item_search: {
    flexDirection: "row",
  },
  middle_right_item_search: {
    flex: 1,
    justifyContent: "center",
  },
  bottom_right_item_search: {
    flexDirection: "row",
  },
  item_title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    lineHeight: 22,
    textAlign: "center",
  },
  bold_text: {
    fontFamily: FONTS.bold,
  },
  right_item_text: {
    flexDirection: "row-reverse",
    flex: 1,
  },
});
