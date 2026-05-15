import { View, Text } from "react-native";
import React from "react";
import { EVENTS_STATS_STYLE } from "../../styling/event";
import { EEventStatus } from "../../utils";

export default function EventsStats({ data = [] }) {
  const renderTitleStats = (title = "") => (
    <Text style={EVENTS_STATS_STYLE.title_stat}>{title}</Text>
  );

  const renderStatusStat = (status = "") => (
    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
      <Text style={{ color: "white" }}>{getStatsByStatus(status)}</Text>
    </View>
  );

  const getStatsByStatus = (status) => {
    try {
      const item = data?.find((o) => o.status === status);
      return `${item?.value || "0"}`;
    } catch (error) {
      return "";
    }
  };

  const getTotalEvents = () => {
    try {
      if (!data?.length) return "0";
      const sum = data.reduce((accumulator, object) => {
        return accumulator + object.value;
      }, 0);
      return sum;
    } catch (error) {
      console.log({ error });
      return "!";
    }
  };

  return (
    <View style={EVENTS_STATS_STYLE.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        {renderTitleStats("Évènements")}
      </View>
      <View style={{  flexDirection: "row"}}>
        <View
          style={[
            EVENTS_STATS_STYLE.card_stats,
            {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          ]}
        >
          {renderTitleStats("Créés")}
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <Text style={{ color: "white" }}>{getTotalEvents()}</Text>
          </View>
        </View>
        <View
          style={[
            EVENTS_STATS_STYLE.card_stats,
            {
              backgroundColor: "rgba(255, 177, 0, 0.3)",
            },
          ]}
        >
          {renderTitleStats("En attente de validation")}
          {renderStatusStat(EEventStatus.ON_REQUEST)}
        </View>
        <View
          style={[
            EVENTS_STATS_STYLE.card_stats,
            {
              backgroundColor: "rgba(5, 185, 84, 0.5)",
            },
          ]}
        >
          {renderTitleStats("Acceptés")}
          {renderStatusStat(EEventStatus.APPROVED)}
        </View>
        <View
          style={[
            EVENTS_STATS_STYLE.card_stats,
            {
              backgroundColor: "rgba(255, 54, 63, 1)",
            },
          ]}
        >
          {renderTitleStats("Annulés")}
          {renderStatusStat(EEventStatus.CANCELLED)}
        </View>
      </View>
    </View>
  );
}
