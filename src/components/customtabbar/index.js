// App.js

import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import TabBar from "./TabBar";
import GuestsList from "../lists/GuestsList";

const CustomTabBar = ({ tabs = [], onGotLength, navigation, account, eventCode }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = useCallback(
    () => (
      <GuestsList
        navigation={navigation}
        onGotGuestLength={(value) => onGotLength(`${value}`)}
        account={account}
        searchTerm={tabs[activeTab].value}
        eventCode={eventCode}
      />
    ),
    [activeTab]
  );
  return (
    <View style={{ flex: 1, paddingTop: 4 }}>
      <View style={{  marginBottom: 10 }}>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(index) => setActiveTab(index)}
        />
      </View>
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );
};

export default CustomTabBar;
