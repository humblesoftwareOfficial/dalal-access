import { StyleSheet, Dimensions } from "react-native";
import { FONTS } from "./polices";
import { APP_COLORS } from "./colors";

export const NEW_EVENT_STYLE = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: APP_COLORS.WHITE_COLOR.color,
  },
  property_item: {
    padding: 20,
    borderRadius: 5,
    margin: 5,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
  },
  property_label: {
    fontFamily: FONTS.bold,
  },
  price_item: {
    padding: 20,
    margin: 10,
    minHeight: Math.ceil(Dimensions.get("screen").height / 10),
    backgroundColor: APP_COLORS.DARK_COLOR.color,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  price_label: {
    color: APP_COLORS.YELLOW_COLOR.color,
    fontFamily: FONTS.bold,
  },
  delete: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  ranking: {
    flex: 1,
    justifyContent: "center",
    marginTop: 25,
    flexDirection: "row",
  },
});

export const EVENTS_STATS_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(202, 92, 202, 0.2)",
    borderRadius: 5,
    margin: 5,
  },
  card_stats: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  title_stat: {
    fontFamily: FONTS.bold,
  },
});

export const EVENT_STYLE = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
  },
  left_header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  right_header: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  title: {
    // fontFamily: FONTS.bold,
  },
  type_container: {
    margin: 5,
    padding: 5,
    backgroundColor: "#CFC0F6",
    borderRadius: 50,
  },
  card_infos: {
    margin: 7,
    padding: 7,
    borderRadius: 5,
    backgroundColor: "#FFF",
    // borderColor: APP_COLORS.WHITE_COLOR.color,
    // borderWidth: 1,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // elevation: 5,
    // backgroundColor: "#D8BFD8",
  },
  title_card_recap: {},
  description_card_recap: {
    color: "#AFAFB0",
    fontSize: 12,
  },
  value_card_recap: {
    fontWeight: "bold",
  },
  details_event_header: {
    flexDirection: "row",
    padding: 12,
  },
});
