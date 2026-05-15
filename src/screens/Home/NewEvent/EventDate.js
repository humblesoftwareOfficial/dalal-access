import { View, Text } from "react-native";
import React, { useContext, useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import EventContext from "../../../config/contexts/event/Event";
import { NEW_EVENT_STYLE } from "../../../styling/event";
import CustomButton from "../../../components/buttons/CustomButton";
import { APP_COLORS } from "../../../styling/colors";
import { formatDateToYYYYMMDD, formatInterValDate, isFieldWithValue } from "../../../utils";
import { Calendar } from "react-native-calendars";

export default function EventDate({ onNext, onBack }) {
  const { setNewEvent, newEvent } = useContext(EventContext);
  const [selectedDates, setSelectedDates] = useState({});

  const onChangeDate = (day) => {
    try {
      setNewEvent({
        ...newEvent,
        startDate: day.dateString,
      });
      setSelectedDates(formatInterValDate(day.dateString, null));
    } catch (error) {
      console.log({ error })
    }
  };

  const renderCalendar = useMemo(
    () => (
      <Calendar
        onDayPress={onChangeDate}
        current={newEvent?.startDate || formatDateToYYYYMMDD(new Date())}
        minDate={formatDateToYYYYMMDD(new Date())}
        markedDates={selectedDates}
      />
    ),
    [selectedDates]
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={NEW_EVENT_STYLE.header}>
        <Text style={NEW_EVENT_STYLE.title}>Date évènement</Text>
      </View>

      <View style={{}}>{renderCalendar}</View>
      <CustomButton
        label={<AntDesign name="arrowright" size={16} color="white" />}
        bgColor={APP_COLORS.GREEN_COLOR.color}
        disable={!isFieldWithValue(newEvent?.startDate)}
        onClick={onNext}
      />
      <CustomButton
        label={
          <AntDesign
            name="arrowleft"
            size={16}
            color={APP_COLORS.PRIMARY_COLOR.color}
          />
        }
        bgColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onBack}
        textColor={APP_COLORS.PRIMARY_COLOR.color}
      />
    </View>
  );
}
