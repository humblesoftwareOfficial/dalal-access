import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useContext } from "react";
import { EEventType, EEventTypeTraduction, isFieldWithValue } from "../../../utils";
import { NEW_EVENT_STYLE } from "../../../styling/event";
import { APP_COLORS } from "../../../styling/colors";
import EventContext from "../../../config/contexts/event/Event";
import CustomButton from "../../../components/buttons/CustomButton";
import { AntDesign } from "@expo/vector-icons";

export default function EventType({ onNext, onBack }) {
  const { setNewEvent, newEvent } = useContext(EventContext);

  const renderEventTypes = useCallback(
    () =>
      Object.keys(EEventType).map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[
            NEW_EVENT_STYLE.property_item,
            {
              backgroundColor:
                value === newEvent?.type
                  ? APP_COLORS.YELLOW_COLOR.color
                  : "rgba(238, 232, 255, 0.2)",
            },
          ]}
          onPress={() => onSelectEventType(value)}
        >
          <Text
            style={[
              NEW_EVENT_STYLE.property_label,
              {
                color:
                  value === newEvent?.type
                    ? APP_COLORS.PRIMARY_COLOR.color
                    : APP_COLORS.WHITE_COLOR.color,
              },
            ]}
          >
            {`${EEventType[value]} (${EEventTypeTraduction[value]})`}
          </Text>
        </TouchableOpacity>
      )),
    [newEvent?.type]
  );

  const onSelectEventType = (type) => {
    try {
      setNewEvent({
        ...newEvent,
        type,
      });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <ScrollView style={NEW_EVENT_STYLE.container}>
      <View style={NEW_EVENT_STYLE.header}>
        <Text style={NEW_EVENT_STYLE.title}>Type d'évènement</Text>
      </View>
      <View>{renderEventTypes()}</View>
      <CustomButton
        label={<AntDesign name="arrowright" size={16} color="white" />}
        bgColor={APP_COLORS.GREEN_COLOR.color}
        disable={!isFieldWithValue(newEvent?.type)}
        onClick={onNext}
      />
      <CustomButton
        label={<AntDesign name="arrowleft" size={16} color={APP_COLORS.PRIMARY_COLOR.color} />}
        bgColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onBack}
        textColor={APP_COLORS.PRIMARY_COLOR.color}
      />
    </ScrollView>
  );
}
