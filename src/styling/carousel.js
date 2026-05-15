import { StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";


export const CAROUSEL_STYLE = StyleSheet.create({
  top: {
    flexDirection: "row-reverse",
    marginLeft: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0,
  },
  item: {
    borderRadius: 5,
    height: 400,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
