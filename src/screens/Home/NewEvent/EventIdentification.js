import { View, Text } from "react-native";
import React, { useContext } from "react";
import EventContext from "../../../config/contexts/event/Event";
import DefaultInput from "../../../components/inputs/DefaultInput";
import { FONTS } from "../../../styling/polices";
import { APP_COLORS } from "../../../styling/colors";
import { AntDesign } from "@expo/vector-icons";
import { isFieldWithValue } from "../../../utils";
import CustomButton from "../../../components/buttons/CustomButton";

export default function EventIdentification({ onNext, onBack }) {
  const { setNewEvent, newEvent } = useContext(EventContext);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: FONTS.bold,
          color: APP_COLORS.WHITE_COLOR.color,
        }}
      >
        Nouvel évènement
      </Text>
      <DefaultInput
        placeholder="Name"
        onValueChange={(value) =>
          setNewEvent({
            ...newEvent,
            name: value,
          })
        }
        value={newEvent?.name || ""}
        backgroundColor="#EEE8FF"
        borderColor="#EEE8FF"
      />
      <DefaultInput
        placeholder="Description"
        onValueChange={(value) =>
          setNewEvent({
            ...newEvent,
            description: value,
          })
        }
        value={newEvent?.description || ""}
        backgroundColor="#EEE8FF"
        borderColor="#EEE8FF"
        multiLine
      />
      <CustomButton
        label={<AntDesign name="arrowright" size={16} color="white" />}
        bgColor={APP_COLORS.GREEN_COLOR.color}
        disable={!isFieldWithValue(newEvent?.name)}
        onClick={onNext}
      />
      <CustomButton
        label={<AntDesign name="close" size={16} color="white" />}
        bgColor={APP_COLORS.RED_COLOR.color}
        onClick={onBack}
      />
    </View>
  );
}
