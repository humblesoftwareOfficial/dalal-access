// TabBar.js

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { APP_COLORS } from "../../styling/colors";
import { ScrollView } from "react-native";
import { truncateText } from "../../utils";
import { GUEST_GROUP_CARD_STYLE } from "../../styling/cards";

const TabBar = ({ tabs = [], activeTab, onTabPress }) => {
  const renderTabLabel = (value) => {
    try {
      if (value.length < 4) {
        return ` ${value} `;
      }
      return truncateText(value, 15);
    } catch (error) {
      return `${value}`;
    }
  };

  const getFirstChar = (data) => {
    try {
      const parts = data.label.includes("_")
        ? data.label.split("_")
        : data.label.includes(" ")
        ? data.label.split(" ")
        : [];

      if (parts?.length) {
        let value = "";
        for (const part of parts) {
          value += part.charAt(0).toUpperCase();
        }
        return value;
      } else {
        return data.label.charAt(0).toUpperCase();
      }
    } catch (error) {
      return "";
    }
  };

  return (
    <ScrollView style={{}} horizontal showsHorizontalScrollIndicator={false}>
      {tabs.map((data, index) => (
        // <TouchableOpacity
        //   key={index}
        //   onPress={() => onTabPress(index)}
        //   style={{
        //     padding: 3,
        //     // marginLeft: 5,
        //     // marginRight: 5,
        //     margin: 4,
        //     borderRadius: 5,
        //     alignItems: "center",
        //     justifyContent: "center",
        //     backgroundColor:
        //       activeTab === index ? APP_COLORS.PRIMARY_COLOR.color : "#FFF",
        //     minWidth: 45,
        //     shadowOffset: {
        //       width: 0,
        //       height: 0.5,
        //     },
        //     shadowOpacity: 0.25,
        //     elevation: 5,
        //     shadowColor: "#BAB9BC",
        //     padding: 5
        //   }}
        // >
        //   <Text
        //     style={{
        //       color:
        //         activeTab === index ? APP_COLORS.WHITE_COLOR.color : "#000",
        //       fontSize: 13,
        //       textAlign: "center"
        //     }}
        //   >
        //     {tab.label}
        //   </Text>
        // </TouchableOpacity>
        <TouchableOpacity
          style={[GUEST_GROUP_CARD_STYLE.main, {}]}
          onPress={() => onTabPress(index)}
          key={index}
        >
          <View
            style={[
              GUEST_GROUP_CARD_STYLE.over_container,
              {
                borderColor: activeTab === index
                  ? APP_COLORS.PRIMARY_COLOR.color
                  : APP_COLORS.DARK_COLOR.color,
              },
            ]}
          >
            <View
              style={[
                GUEST_GROUP_CARD_STYLE.container,
                {
                  backgroundColor: activeTab === index
                    ? APP_COLORS.PRIMARY_COLOR.color
                    : APP_COLORS.WHITE_COLOR.color,
                },
              ]}
            >
              <Text
                style={[
                  GUEST_GROUP_CARD_STYLE.pseudo,
                  {
                    ...(activeTab === index && {
                      color: APP_COLORS.WHITE_COLOR.color,
                    }),
                  },
                ]}
              >
                {getFirstChar(data)}
              </Text>
            </View>
          </View>
          <Text
            style={[
              GUEST_GROUP_CARD_STYLE.service_name,
              {
                // color: isSelected ? APP_COLORS.SECONDARY_COLOR.color : APP_COLORS.BLACK_COLOR.color,
                // ...(isSelected && {
                //   fontFamily: FONTS.bold,
                // }),
              },
            ]}
          >
            {truncateText(data.label, 14)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TabBar;
