import { Dimensions, StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";
import { FONTS } from "./polices";

const TAG_HELPER_BUTTONS_SIZE = Math.ceil(Dimensions.get("screen").width / 13);
const LEFT_CARD_SIZE = Math.ceil(Dimensions.get("screen").width / 12);

export const CONTACT_STYLE = StyleSheet.create({
  item_container: {
    borderColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  preview_name: {
    borderRadius: 50,
    margin: 5,
    padding: 10,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    width: LEFT_CARD_SIZE,
    height: LEFT_CARD_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});