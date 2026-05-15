import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "./polices";
import { APP_COLORS } from "./colors";

const SIZE = Math.ceil(Dimensions.get("window").width / 1.5);
const FLOAT_BUTTON_SIZE = Math.ceil(Dimensions.get("window").width / 8.5);

export const HOME_STYLE = StyleSheet.create({
  section: {
    justifyContent: "center",
    alignItems: "center",
  },
  container_title: {
    width: SIZE,
    height: SIZE,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    borderRadius: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FONTS.bold,
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontSize: 30
  },
  sub_title: {
    fontFamily: FONTS.alexBrush,
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontSize: 30
  },
  float_date: {
    position: "absolute",
  },
  date: {
    fontFamily: FONTS.regular,
    fontSize: 20,
    color: "rgba(0,0,0,0.1)"
  },
  float_button: {
    width: FLOAT_BUTTON_SIZE,
    height: FLOAT_BUTTON_SIZE,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    justifyContent: "center",
    alignItems: "center"
  },
  float_button_text: {
    fontFamily: FONTS.bold,
    color: APP_COLORS.YELLOW_COLOR.color
  }
});

export const AUTHENTICATION_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5,
    // margin: 5
  },
  header: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    flexDirection: "column-reverse",
    marginBottom: 25
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  title_text: {
    fontFamily: FONTS.bold
  }
});

export const MARRIED_STYLE = StyleSheet.create({
  initial: {
    fontSize: 50,
    fontFamily: FONTS.arizoniaRegular,  
    color: APP_COLORS.SECONDARY_COLOR.color,
  },
  date: {
    color: "#F5F5F5",
    fontFamily: FONTS.bold
  }
})
