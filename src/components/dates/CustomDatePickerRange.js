import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/system";
import { FONTS } from "../../styling/polices";
import { APP_COLORS } from "../../styling/colors";

const CustomDatePickerRange = ({ onClose, onBook }) => {
  


  return (
    <SafeAreaView style={[SAFE_AREA_VIEW.container]} 
    // edges={['right', 'left', 'top']}
    >
      <View style={{ flex: 1 }}>
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    // height: 400, // Adjust the height as needed
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 19,
  },
  header: {
    marginTop: 10,
    padding: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1,
    borderColor: APP_COLORS.WHITE_COLOR.color,
  },
  close: {
    position: "absolute",
    right: 20,
    bottom: 0,
    top: 0,
  },
  footer: {
    padding: 5,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: APP_COLORS.WHITE_COLOR.color,
  },
});

export default CustomDatePickerRange;
